#!/usr/bin/env bash

# Clear up the Application Container

docker stop sails_app &&docker rm sails_app

# Clear up the MongoDB Container

docker stop sails_mongo && docker rm sails_mongo

# Clear up the Redis Container

docker stop sails_redis && docker rm sails_redis

# Clear up the Network

docker network rm sails_net

# Create the Network

docker network create --driver bridge sails_net

# Create the MongoDB Container

docker run --name sails_mongo -d -p 27017:27017 --network=sails_net mongo

# Create the Redis Container

docker run --name sails_redis -d -p 6379:6379 --network=sails_net redis

# Build the Application Container

docker build -t ericvolp12/sails-docker .

# Start it UP!

docker run --name sails_app -d -e MONGO_HOST=sails_mongo -e REDIS_HOST=sails_redis -p 1337:1337 --network=sails_net ericvolp12/sails-docker

# Let's see those beautiful containers

docker ps
