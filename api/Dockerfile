FROM node:6.9.1-wheezy

RUN mkdir /var/www
RUN mkdir /var/www/src

WORKDIR /var/www/src
ADD package.json /var/www/src/package.json
ADD yarn.lock /var/www/src/yarn.lock

RUN npm install -g yarn

RUN yarn install

# Expose port
EXPOSE  8080

VOLUME ["/var/www/src/app"]

# Run app using nodemon
CMD ["npm", "start"]