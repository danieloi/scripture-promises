# Define custom function directory
ARG FUNCTION_DIR="/function"

FROM node:18-buster as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Create function directory
RUN mkdir -p ${FUNCTION_DIR}

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

COPY bundle/files/package*.json ./

# Install dependencies including devDependencies
RUN npm install

# If the dependency is not in package.json uncomment the following line
# RUN npm install aws-lambda-ric
# RUN npm install @xenova/transformers
# RUN npm install -D typescript
# RUN npm install -D ts-node
# RUN npm install -D @types/node

# After npm install, copy the rest of your application code
COPY bundle/files/* ./

# copy model cache to /node_modules/@xenova/transformers
COPY bundle/model/.cache ./node_modules/@xenova/transformers/.cache

# Grab a fresh slim copy of the image to reduce the final size
FROM node:18-buster-slim

# Required for Node runtimes which use npm@8.6.0+ because
# by default npm writes logs under /home/.npm and Lambda fs is read-only
ENV NPM_CONFIG_CACHE=/tmp/.npm

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["search.handler"]