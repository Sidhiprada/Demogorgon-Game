# 🧠 [ Demogorgon](https://github.com/Sidhiprada/Demorgan-Game/tree/main/Advita%20Project/demogorgon_radar "This path skips through empty directories") Game

A **real-time emergency synchronization platform** that instantly connects multiple users during critical situations using **Node.js, Express, and Socket.io**.

This backend powers a system where users can **broadcast alerts, share live updates, and coordinate actions in real-time**.

---

# 🚀 Features

* ⚡ **Real-time communication** using Socket.io
* 📡 **Instant alert broadcasting**
* 📂 **File upload support**
* 🔐 **Environment variable configuration**
* 🌐 **Cross-origin support (CORS enabled)**
* 🧩 **Modular Node.js backend architecture**

---

# 🛠 Tech Stack

| Technology         | Purpose                  |
| ------------------ | ------------------------ |
| Node.js            | Backend runtime          |
| Express.js         | API framework            |
| Socket.io          | Real-time communication  |
| dotenv             | Environment variables    |
| cors               | Cross-origin requests    |
| express-fileupload | File uploading           |
| nodemon            | Development auto restart |

---

# 📁 Project Structure

```
cerebro1-backend
│
├── node_modules
├── package.json
├── package-lock.json
├── server.js
├── .env
└── README.md
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/cerebro1-backend.git
```

### 2️⃣ Navigate to project directory

```
cd cerebro1-backend
```

### 3️⃣ Install dependencies

```
npm install
```

---

# ▶️ Running the Project

### Development Mode

```
nodemon server.js
```

### Normal Mode

```
node server.js
```

Server will start at:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=5000
```

Load variables using dotenv:

```javascript
require("dotenv").config()
```

---

# 🔌 API Example

### Basic Endpoint

```
GET /
```

Response:

```
Server Running
```

---

# 📡 Socket.io Events

Example real-time connection:

```javascript
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("alert", (data) => {
        io.emit("alert", data);
    });
});
```

This allows **live synchronization between multiple clients**.

---

# 🧪 Testing Locally

Start the server:

```
node server.js
```

Open browser:

```
http://localhost:5000
```

Or connect using frontend / Postman.

---

# 📦 Dependencies

Main packages used:

* express
* socket.io
* cors
* dotenv
* express-fileupload

Development dependency:

* nodemon

---

# 🔮 Future Improvements

* User authentication
* Emergency location tracking
* AI based threat detection
* Dashboard analytics
* Push notifications

---

# 🤝 Contributing

Contributions are welcome!

Steps:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **ISC License**.

---

# 👨‍💻 Author

**Sidhiprada Pradhan**

Computer Science Engineering Student
Interested in **AI, Systems, and Entrepreneurship**
