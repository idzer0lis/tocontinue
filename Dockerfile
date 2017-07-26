FROM node

RUN npm install lite-server -g

VOLUME ./target/ /usr/src/app/

WORKDIR /usr/src/app/

EXPOSE 3000

CMD lite-server

#Usage

# Make sure you have docker installed
# Build the image: docker build -t tag-name .
# Run the container: docker run -d hostPort:3000  container-name
# Check the host ip with 'docker-machine ip' and check it in browser alongside hostPort defined above
