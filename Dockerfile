# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install OpenSSL
# RUN apk add --update openssl
RUN apk add --update --no-cache openssl1.1-compat

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set an environment variable for the RabbitMQ server host and mysql server host
ENV RABBITMQ_HOST=host.docker.internal
ENV MYSQL_HOST=host.docker.internal

# Generate the Prisma client
RUN npm run prisma:generate

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start"]
