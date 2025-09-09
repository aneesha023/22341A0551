**URL Shortener with Centralized Logging**
##
**Overview**
This full-stack application provides a scalable URL shortening service integrated with a centralized logging middleware. It features:<br>
_**Backend:**_ RESTful API built with Express (port 3000) for URL shortening, expiration management, and detailed usage statistics.<br>
_**Frontend:**_ React app (port 3001) with Material UI, offering user-friendly URL shortening and analytics views.<br>
_**Logging Middleware:**_ Unified logging capturing frontend and backend events, sending structured logs to a remote logging API server.<br>
##
**Features**<br>
* Create and retrieve shortened URLs with expiry.<br>
* Aggregate and display detailed click statistics.<br>
* Consistent, centralized logging for monitoring and debugging.<br>
* CORS-enabled backend secured for frontend interactions.<br>
##
**Setup**<br>
_**Backend:**_<br>
text<br>
cd backend-test-submission<br>
npm install<br>
node src/server.js<br>
##
_**Frontend:**_<br>
text<br>
cd frontend-test-submission<br>
npm install<br>
npm start<br>
##
**Key Details**<br>
* Backend API runs at http://localhost:3000.<br>
* Frontend UI available at http://localhost:3001.<br>
* Logging API endpoint configured to http://20.244.56.144/evaluation-service/logs.<br>
* CORS configured to allow frontend requests to backend.<br>
* URL data stored in-memory (suitable for demo/testing).<br>
##
**Extensibility**<br>
Designed for easy integration with persistent databases, authentication systems, and advanced logging & analytics solutions.<br>
##This project demonstrates strong full-stack design skills, effective use of middleware for observability, and user-focused UI development.




