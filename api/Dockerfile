#FROM openjdk:14-jdk-alpine
#VOLUME /tmp
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#EXPOSE 8080:9991
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

# docker build -t spring-in-docker:1.0 .

FROM adoptopenjdk/openjdk16:alpine-slim as build

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw package -DskipTests

FROM adoptopenjdk/openjdk16:alpine-jre

COPY --from=build target/*.jar dnd-tools-api.jar

EXPOSE 8080:9991
ENTRYPOINT ["java", "-jar", "dnd-tools-api.jar"]