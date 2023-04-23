FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .

COPY src/ src/
RUN mvn package -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/cms-0.0.1-SNAPSHOT.jar /app/cms.jar
CMD ["java", "-jar", "cms.jar"]