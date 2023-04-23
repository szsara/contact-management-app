FROM maven:3.8.1-jdk-17 as build
WORKDIR /app
COPY pom.xml .
RUN mvn clean package -DskipTests
COPY src/ /app/src/
RUN mvn package

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/cms-0.0.1-SNAPSHOT.jar /app/cms.jar
CMD ["java", "-jar", "cms.jar"]