#base image is a dependency that is needed to build a docker image to the project
FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4000

#to run the application
CMD [ "node" , "index.js" ]