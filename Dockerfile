FROM node:10.8.0-jessie

# Create app directory
WORKDIR /usr/src/app

# Install Agular CLI
RUN npm install -g @angular/cli

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Run ng build
RUN ng build


EXPOSE 4200
CMD ng serve --host=0.0.0.0 --disable-host-check