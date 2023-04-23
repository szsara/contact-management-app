# contact-management-application
Contact Management Application

To start the application:
- Clone project: https://github.com/szsara/contact-management-app.git
- Start the Docker engine
- From the root directory run: 'docker compose build' then 'docker compose up'
  the backend service should start on port 8080, the frontend on port 3000, and postgres on port 5432



Swagger UI available for API endpoint tests running on localhost at: http://localhost:8080/swagger-ui/index.html

<h3>Features:</h3>

:white_check_mark: React GUI

    - Form to submit new user information
    
    - Table view to list and edit user information 

:white_check_mark: Java Spring Boot backend

    - REST endpoints to create, list, get, update and depersonalize user
    
    - JPA Hibernate models, repositories, services, DTOs
    
    - Validation
    
    - Unit tests for UserService
    
 :white_check_mark: PostgreSQL database
 
 :white_check_mark: Docker containers for frontend, backend, postgres + docker compose
 
 
 
 <h3>Missing features:</h3>
 
 :negative_squared_cross_mark:	Addresses and phone numbers are not editable on the UI
 
 :negative_squared_cross_mark:	Form validation
 
 :negative_squared_cross_mark:	Unit tests for the frontend

 :negative_squared_cross_mark:	Database versioning

    
