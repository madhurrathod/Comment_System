Tech stack used: 
Backend: Node.js, express, prisma 
Database: MongoDB (Atlas) 
FrontEnd: React (Vite + Axios) 

Features: 
1. Authentication using JWT and cookies. (Register and Login)
2. Adding Parent and Child level comments.
3. Like button.
4. Reply button.
5. Time stamp difference.
  

## Setup and Instructions for Local Hosting 
### 1. Clone the repository 

```bash
  git clone <your-repo-url>
```

### 2. Backend Setup 
```bash
  cd backend
  npm install
  npx prisma generate
```

Run the backend server: 
```bash
  npx nodemon``` 
or 
```bash
  npm start``` 
---
### 3. Frontend Setup 
Open a new terminal window and go into frontend directory: 
```bash
  cd frontend
  npm install
  npm run dev
```
---
### 4. Environment Variables 
#### 1. Frontend 
Create a .env file in the root of frontend. 
Add the following line: 
```VITE_BACKEND_URL="Your localhost backend url"``` 

---
#### 2. Backend
Once the React app is running, it will show a local URL (for example http://localhost:5173). 
Create a .env file in the root of backend. 
Add the following lines: 
```
  DATABASE_URL="url-that-you-get-from-mongodb-atlas/db_name"
  JWT_SECRET="your-secret-key-here"
  LOCAL_URL="your-frontend-url" (ex,. http://localhost:5173)
  PORT="3000" (enter the port your backend is running on ex,3000,3333 etc.)
```
---
### 5. Connection Order 
1. Start the backend and connect to the database.
2. Start the frontend and connect it to the backend.
3. Backend will then allow communication with the frontend.

---
