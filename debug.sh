#!/usr/bin/env bash

# Clear up the Application Container

docker stop sails_app &&docker rm sails_app

# Build the Application Container

docker build -t ericvolp12/sails-docker .


# Run in debug mode

docker run --name sails_app -t -i -e MONGO_HOST=sails_mongo -e REDIS_HOST=sails_redis -p 1337:1337 --network=sails_net ericvolp12/sails-docker
