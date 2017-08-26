FROM node:6

# Create app directory
WORKDIR /usr/src/app

RUN npm -g install sails

# Install app dependencies
COPY sails_app .
RUN rm -rf node_modules
RUN npm cache clear
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]
