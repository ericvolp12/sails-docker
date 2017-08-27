FROM node:6-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY sails_app .
RUN rm -rf node_modules
RUN npm cache clear
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]
