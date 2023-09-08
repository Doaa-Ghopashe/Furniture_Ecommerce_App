#base image is a dependency that is needed to build a docker image to the project
FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4000

#to run the application
CMD [ "npm" ,"run", "start-dev" ]