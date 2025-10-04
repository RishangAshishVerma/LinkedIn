# LinkedIn Backend 💼

This is the **backend** of a LinkedIn-like social networking platform.  
It is built using **Node.js**, **Express**, **MongoDB**, and includes real-time features using **Socket.io**.  
👉 **Note:** This repository contains **only the backend** (no frontend).

---

## 🚀 Features

✅ User Authentication (Signup, Login, Logout)  
✅ JWT-based Authorization  
✅ Profile Management (Update details, upload profile image using Cloudinary)  
✅ Posts CRUD operations (Create, Read, Like, Comment)  
✅ Connection System (Send / Accept requests)  
✅ Notification System (real-time notifications using Socket.io)  
✅ Secure Password Hashing using bcrypt  
✅ Multer for File Uploads  
✅ Cloudinary Integration for storing images  
✅ Protected Routes using Middleware  
✅ Environment Variables using dotenv  

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-Time** | Socket.io |
| **File Uploads** | Multer |
| **Cloud Storage** | Cloudinary |
| **Hashing** | bcryptjs |
| **Environment Management** | dotenv |
| **Cookies** | cookie-parser |

---

## 📁 Folder Structure

back-end/
┣ controllers/ # All business logic and route handlers
┣ middlewares/ # JWT auth, error handling, multer, etc.
┣ models/ # Mongoose schemas (User, Post, Notification, etc.)
┣ public/ # Static files (if any)
┣ routes/ # All routes (user, auth, post, notification)
┣ utils/ # Utility functions (Cloudinary config, helpers)
┣ .gitignore
┣ index.js # Entry point (starts server, DB connect, Socket.io setup)
┣ package.json
┣ package-lock.json

yaml
Copy code

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RishangAshishVerma/LinkedIn.git
   cd LinkedIn/back-end
Install dependencies

bash
Copy code
npm install
Create .env file in the root directory:

env
Copy code
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the development server

bash
Copy code
npm run dev
Server will start on:
👉 http://localhost:8000

🧩 Key Models
🧍 User
username

email

password

profileImage

headline

connections

createdAt, updatedAt

📝 Post
content

author (ref User)

likes

comments

createdAt

🔔 Notification
receiver (ref User)

type ("like", "comment", "connectionAccepted")

relatedUser (ref User)

relatedPost (ref Post)

timestamps

🔐 Authentication & Authorization
JWT Tokens for secure session management

Stored in cookies for authentication

Middleware validates token before accessing protected routes

bcryptjs used for password hashing

💬 Real-Time Notifications (Socket.io)
When a user likes, comments, or accepts a connection,
a notification is created and sent to the receiver in real-time using Socket.io.

Socket IDs are mapped per user to ensure private delivery.

📤 File Uploads (Multer + Cloudinary)
Multer handles multipart/form-data uploads

Images are uploaded to Cloudinary and URLs are saved in DB

🌐 Example Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/users/me	Get current user
PUT	/api/users/update	Update user profile
POST	/api/posts	Create post
GET	/api/posts	Get all posts
POST	/api/posts/:id/like	Like a post
POST	/api/posts/:id/comment	Add comment
POST	/api/connections/request	Send connection request
POST	/api/connections/accept	Accept connection request
GET	/api/notifications	Get all notifications

⚠️ Note: All protected routes require valid JWT token.

🧠 Utilities & Middleware
authMiddleware.js → Verifies JWT

multerMiddleware.js → Handles file uploads

errorHandler.js → Centralized error responses

cloudinary.js → Upload image helper

🧰 Scripts
Command	Description
npm run dev	Start development server with Nodemon
npm start	Start production server

🛠️ Future Enhancements
Real-time Chat using Socket.io

Post sharing & Reactions
