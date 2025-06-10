# 🎙️ Podcast App

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Dependencies](https://img.shields.io/badge/dependencies-up_to_date-blue.svg)

> A full-stack podcast web application built for seamless audio streaming, user engagement, and robust admin control.

---

## ✨ Features

- 🎧 **Curated Podcast Library** – Browse a collection of quality podcast episodes.
- 🧩 **Modular Backend Architecture** – Middleware-powered Express.js server.
- 🛡️ **Role-Based Access Control** – Manage users and admins with secure permission levels.
- 🔔 **Real-Time Notifications** – Redis-powered system for real-time user alerts.
- ☁️ **Cloudinary Integration** – Audio files and images stored and managed in the cloud.
- ❤️ **User Subscriptions & Likes** – Logged-in users can subscribe to shows and like episodes.
- 🔍 **Dynamic Search** – Search for podcast shows or specific episodes with ease.
- 📱 **Fully Responsive** – Mobile-first design that adapts to all screen sizes.
- 🎵 **Audio Streaming** – Smooth playback with intuitive player controls.

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React-based framework for SSR & fast routing
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [Styled-Components](https://styled-components.com/) – For component-level styling

### Backend
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) – RESTful server
- [MongoDB](https://www.mongodb.com/) – NoSQL database for flexibility and scalability
- [Redis](https://redis.io/) – Real-time pub/sub system for notifications
- [Cloudinary](https://cloudinary.com/) – Cloud media management

---

## 🚀 Live Demo

[🌐 View Live Application](https://your-demo-link.com)

---

## 📦 Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Redis (optional for local notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/Slyyv17/podcast.git

# Navigate into the project directory
cd podcast

# Install dependencies for both frontend and backend
npm install

# Create environment variables
cp .env.example .env
# Then edit the .env file with your actual credentials

# Start the development server
npm run dev
