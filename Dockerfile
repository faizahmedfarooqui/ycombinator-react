FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm run build --only=production

# Bundle app source
COPY . .

# Expose the port for incoming/outgoing traffic
EXPOSE 4000

# Start the server
CMD [ "npm", "start" ]