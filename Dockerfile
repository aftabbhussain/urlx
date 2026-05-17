#start with a linux machine which has node 20 installed in it and uses the linux distro alpine
FROM node:20-alpine

#this is the working directory of our app, everthing will be stored in this folder if the linux machine
WORKDIR /usr/src/app 

#copy all the files that are package+anything+.json into the working directory defined earlier (./). do this first to optimize
COPY package*.json ./

#install the dependencies into our linux machine, we are placing RUN npm install after the COPY packages because if the package is not changed the node packages have also not changed so, docker uses the cached files to avoid slowing down(as docker uses caches)
RUN npm install

#copy all the ts code files to the working directory of the linux machine
COPY . .

#now compile the typescript source codes and create a dist folder containing the js equilvaelnt source code, so production can use those files for faster execution
RUN npm run build

#open up the port 4000 of the container(linux machine) so that traffic can get in
EXPOSE 4000

#this will not run when we do docker build, but only when we do docker run, this defines the starting command for our app's server
CMD [ "node", "dist/server.js" ]