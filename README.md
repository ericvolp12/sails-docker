# Sails Docker Application [![Build Status](https://travis-ci.org/ericvolp12/sails-docker.svg?branch=master)](https://travis-ci.org/ericvolp12/sails-docker)
This is a sample application for running a sails instance inside of docker containers. I've provided an ecosystem using MongoDB, Redis, Google's Oauth2, and SailsJS.

## Installation
To run this application, you need to have `docker` and `docker-compose` installed on your local machine.

The `conf/nginx.conf` item is for running a reverse proxy on your machine so you may listen on port 80. My development environment uses local docker containers and a CloudFlare https route pointing to my dev machine.

The `.env` file has been ignored from here on out as it stores secrets, it should have the following fields:
``` 
# Set Sails environment
MONGO_HOST=db
REDIS_HOST=redis
NPM_CONFIG_LOGLEVEL=<Sails log level>
GOOGLE_CLIENT_ID=<OAuth2 Client ID>
GOOGLE_CLIENT_SECRET=<OAuth CLient Secret>
DOMAIN=<mysubdomain.mydomain.com>
SESSION_SECRET=<My Session Secret>
```

To get started, run `docker-compose build`, then run `docker-compose run -d` to create the machines and detach from the application container.


## License
This code has been developed under the MIT License as follows below:

MIT License

Copyright (c) 2017 Eric Volpert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.