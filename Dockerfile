FROM node:10

RUN mkdir /usr/src/app


ADD yarn.lock /yarn.lock
ADD package.json /package.json
ADD public /public
ADD . /app
ADD src /src



ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN yarn

CMD ["npm","start"]
