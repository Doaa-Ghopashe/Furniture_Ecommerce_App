#base image is a dependency that is needed to build a docker image to the project
FROM node as base
    WORKDIR /app
    COPY package.json /app
    COPY . /app
    EXPOSE 4000
    
FROM base as development
    RUN npm install
    CMD [ "npm" ,"run", "start-dev" ]

FROM base as production
    RUN npm install --only=production
    CMD [ "npm" , "start" ]

















# FROM node

# WORKDIR /app

# COPY package.json /app

# ARG NODE_ENV

# #this is a condition statement that check the type of environment that is run if it's production 
# # then the dependencies that are being installed will be the dependencies of production only else 
# # the all dependenices will be installed
# RUN if ["$NODE_ENV" == "production"];\
#     then npm install --only=production \
#     else npm install \
#     fi

# COPY . /app

# EXPOSE 4000

# #to run the application
# CMD [ "npm" ,"run", "start-dev" ]