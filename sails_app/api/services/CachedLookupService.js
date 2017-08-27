const redis = require("redis");
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  db: 0
});

client.on('connect', function () {
  sails.log.debug('Successful connection to redis server');
});

client.on('error', function (err) {
  sails.log.error('Redis error encountered', err);
});

client.on('end', function () {
  sails.log.debug('Redis connection closed');
});

function populateUser(id) {
  return new Promise(function (resolve, reject) {
    sails.log.silly("Populating user cache...");
    Users.findOne(id).then(function (record) {
      record.cachedAt = Date.now();
      client.set(id, JSON.stringify(record), redis.print);
      resolve(record);
    }, function (err) {
      sails.log.error("Error populating the cache: %s", err);
      reject(err);
    });
  });
}

module.exports = {
  findUser: function (id) {
    return new Promise(function (resolve, reject) {
      client.getAsync(id).then(function (res) {
        if (res) {
          res = JSON.parse(res);
          if (Date.now() - res.cachedAt > 30000) {
            sails.log.silly("Cached record has expired");
            populateUser(id).then(function (record) {
              sails.log.silly("Serving freshly cached record...");
              resolve(record);
            }, function (err) {
              reject(err);
            });
          }else {
            sails.log.silly("Serving cached record...");
            resolve(res);
          }
        } else {
          populateUser(id).then(function (record) {
            resolve(record);
          }, function (err) {
            reject(err);
          });
        }
      }, function (err) {
        sails.log.error("Error looking up in cache: %s", err);
        reject(err);
      });
    });
  }
};

