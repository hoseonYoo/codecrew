# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Grant execute permission to gradlew
RUN chmod +x gradlew

# Build application using Gradle
RUN ./gradlew build

# Add bash to run entrypoint script
RUN apk add --no-cache bash

# Expose port 8080 for backend service
EXPOSE 8080

# Run java command to start backend service when container launches
ENTRYPOINT ["java", "-jar", "./build/libs/project2-0.0.1-SNAPSHOT.jar"]
