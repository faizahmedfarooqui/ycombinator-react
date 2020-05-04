# HackerNews Clone

## Demo

https://faizahmed-ycombinator.herokuapp.com

## Local SetUp:

```sh
# Clone the Repository
git clone https://github.com/faizahmedfarooqui/ycombinator-react.git;

# Install dependencies using NPM or Yarn
yarn install;

# Create the Client Build
yarn build;

# Start the Server
yarn start;
```

## Docker SetUp:

```sh
# Cloning the Repository
git clone https://github.com/faizahmedfarooqui/ycombinator-react.git;

# Create the Build 
docker build -t <your-username>/<repository-name> .

# Run the Image
docker run -p 49160:4000 -d <your-username>/<repository-name>

# Get the Container ID
docker ps

# Check the log output
docker logs <container-id>

# Go inside the Container
docker exec -it <container-id> /bin/bash

# Test the Application
curl -i localhost:49160
```
