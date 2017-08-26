docker stop sails_app

docker rm sails_app

docker build -t ericvolp12/sails-docker .

docker run --name sails_app -d -p 1337:1337 ericvolp12/sails-docker

docker ps
