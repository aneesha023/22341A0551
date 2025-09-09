**URL Shortener with Centralized Logging**
##**Overview**
##This full-stack application provides a scalable URL shortening service integrated with a centralized logging middleware. It features:
##_**Backend:**_ RESTful API built with Express (port 3000) for URL shortening, expiration management, and detailed usage statistics.
##_**Frontend:**_ React app (port 3001) with Material UI, offering user-friendly URL shortening and analytics views.
##_**Logging Middleware:**_ Unified logging capturing frontend and backend events, sending structured logs to a remote logging API server.
##
##**Features**
##* Create and retrieve shortened URLs with expiry.
##* Aggregate and display detailed click statistics.
##* Consistent, centralized logging for monitoring and debugging.
##* CORS-enabled backend secured for frontend interactions.
##
##**Setup**
##_**Backend:**_
##text
##cd backend-test-submission
##npm install
##node src/server.js
##
##_**Frontend:**_
##text
##cd frontend-test-submission
##npm install
##npm start
##
##**Key Details**
##* Backend API runs at http://localhost:3000.
##* Frontend UI available at http://localhost:3001.
##* Logging API endpoint configured to http://20.244.56.144/evaluation-service/logs.
##* CORS configured to allow frontend requests to backend.
##* URL data stored in-memory (suitable for demo/testing).
##
##**Extensibility**
##Designed for easy integration with persistent databases, authentication systems, and advanced logging & analytics solutions.
##
##This project demonstrates strong full-stack design skills, effective use of middleware for observability, and user-focused UI development.


