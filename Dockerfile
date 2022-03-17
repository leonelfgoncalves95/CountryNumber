FROM openjdk:11
LABEL maintainer="CountryNumber API"
ADD target/CountryNumber-0.0.1-SNAPSHOT.jar CountryNumber.jar
ENTRYPOINT ["java","-jar","CountryNumber.jar"]