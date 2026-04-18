# 📝 Notes App (MERN + Upstash)

A full-stack Notes application built with the **MERN stack** (MongoDB, Express, React, Node.js) with modern UI and production-ready features like **rate limiting**, **notifications**, and **deployment support**.

---

## 🚀 Features

- ✍️ Create, update, and delete notes
- 📄 View all notes with clean UI
- 🔒 Rate limiting using Upstash Redis
- 🔔 Toast notifications with react-hot-toast
- 🎨 Modern UI with Tailwind CSS + DaisyUI
- 🌙 Light/Dark theme support
- ⚡ Fast API calls using Axios
- ☁️ Deployment ready (Render)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Axios
- React Hot Toast
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Upstash Redis (Rate Limiting)

---

## 📂 Project Structure

```frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── lib/
│ └── App.jsx

backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── config/
```
---


---

## ⚙️ Environment Variables

Create a `.env` file in your backend:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5001

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token 
```


---

## 🧑‍💻 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/danishdynamic/FullStack-Mern.git

cd notes-app
```


---

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---


---

### 3. Run the app

#### Start backend
```bash
cd backend
npm run dev
```

#### Start frontend
```bash
cd frontend
npm run dev 
```

---


---

## 🌐 API Endpoints

| Method | Endpoint            | Description         |
|--------|--------------------|---------------------|
| GET    | /api/notes         | Get all notes       |
| GET    | /api/notes/:id     | Get note by ID      |
| POST   | /api/notes         | Create note         |
| PUT    | /api/notes/:id     | Update note         |
| DELETE | /api/notes/:id     | Delete note         |

---

## 🔐 Rate Limiting

Rate limiting is implemented using **Upstash Redis** to prevent abuse.

- Applied to write operations (POST, PUT, DELETE)
- Uses IP-based limiting

---

## 🎨 UI Preview

- Responsive layout
- Clean card-based design
- Theme switching (light/dark)

---

## 🚀 Deployment

This app is deployment-ready:

- Frontend → Render / Vercel
- Backend → Render
- Database → MongoDB Atlas
- Rate limiting → Upstash Redis
- For production we can also use Unified Monorepo such as moving both frontend and backend into a single repository with shared configuration.(optional as we have to update cors and server.js and add a file i.e package.json).
- In package.json and server.js we can add the following scripts to run both frontend and backend together in production.
```bash
- package.json

"scripts": {
  "start": "node server.js",
  "build": "npm install && cd frontend && npm install && npm run build",
  "test": "vitest run"
}

-server.js

// SERVE FRONTEND and import path module

if (process.env.NODE_ENV === 'production') {
  // Point to the frontend build folder
  app.use(express.static(path.join(__dirname, './frontend/dist'))); 

  // Handle SPA routing: send all non-API requests to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
```
- If you want to deploy both frontend and backend separately i.e Decoupled Architecture. We can deploy backend (render)first and then update the frontend (vercel )API calls to point to the deployed backend URL. 
 
```bash
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app', // Replace with your Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```
---

## 📌 Future Improvements

- User authentication (JWT)
- Per-user notes
- Search & filtering
- Rich text editor
- Tagging system

---

## 📚 Tests

This project includes both **unit tests** and **integration tests** to ensure reliability and correctness of the application. WE can also add end-to-end (E2E) tests in the future using tools like Cypress.

---

### 🧪 Unit Testing (Vitest)

Unit tests focus on testing individual parts of the application in isolation.

- Controllers are tested independently
- Database calls (Mongoose) are **mocked**
- Ensures business logic works correctly

#### 🔧 Tools Used
- Vitest
- Mocking with `vi.mock()`

#### ▶️ Run Unit Tests

```bash
npm run test
```

### 🌐 Integration Testing (Supertest)

Integration tests validate the complete request flow:

API routes
Middleware
Controllers
Database interaction

These tests simulate real HTTP requests to the backend.

### 🔧 Tools Used

- Supertest
- Vitest
- ▶️ Run Integration Tests

```bash
npm run test
```

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!