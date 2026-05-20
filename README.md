
```md
# Dynamic Developer Portfolio & CMS

A premium, fully responsive developer portfolio built with the MERN stack. It features a modern, glassmorphic UI on the frontend and a secure, custom Content Management System (CMS) on the backend to dynamically manage projects, technical blogs, academic research, media, and profile details.

## 🚀 Features

### Public Facing (Frontend)
*   **Dynamic Data Rendering:** Fetches real-time profile details, skills, projects, and social links from the database.
*   **Thought Leadership Modules:** Dedicated, responsive sections for Technical Blogs and Academic Research papers (including PDF links).
*   **Modern UI/UX:** Built with Tailwind CSS, featuring subtle animations, glassmorphism, and responsive grid/carousel layouts.
*   **Contact System:** Fully functional contact form that sends messages directly to the backend database.
*   **Optimized Performance:** Implements React `Suspense` and `lazy` loading for heavy components to ensure lightning-fast initial load times.

### Admin Dashboard (Backend/CMS)
*   **Secure Authentication:** JWT-based authentication via HTTP-only cookies to protect admin routes.
*   **Global Error Handling:** Axios interceptors automatically redirect unauthorized or expired sessions to the `/admin/login` page.
*   **Media Management:** Cloudinary integration for seamless, optimized image uploads and storage.
*   **Full CRUD Operations:** Add, update, or delete blogs, research papers, projects, and profile data without touching the codebase.

---

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS
*   React Router DOM
*   Axios
*   Lucide React & React Icons
*   React Hot Toast

**Backend:**
*   Node.js
*   Express.js
*   JSON Web Tokens (JWT) for authentication
*   Cloudinary (Image Storage & Optimization)

**Database:**
*   MongoDB (Mongoose ODM)

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
*   A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

```

### 2. Backend Setup (Server)

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` directory and add your configuration:

```env
PORT=3000
DATABASE_URL="mongodb+srv://<your_db_user>:<your_password>@cluster0.8mresi6.mongodb.net/portfolio"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# CORS / Frontend Connection
FRONTEND_URL=http://localhost:5173

```

Start the backend server:

```bash
node src/index.js

```

### 3. Frontend Setup (Client)

Open a new terminal window/tab:

```bash
cd frontend
npm install

```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3000/api

```

Start the frontend development server:

```bash
npm run dev

```

---


## 🛡️ Security

* **Protected Routes:** Backend middleware verifies JWTs before granting access to CMS mutation endpoints.
* **Axios Interceptors:** The frontend globally monitors for `401 Unauthorized` responses and safely redirects unauthenticated users away from the dashboard.
* **CORS Protection:** Backend is configured to only accept requests from the designated `FRONTEND_URL`.

---


```

```