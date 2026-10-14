# NOVA — Interior Design Platform 🏡

NOVA is a full-stack interior design platform designed to showcase furniture collections, interior design projects, and professional design services. It combines a modern, responsive user interface with a backend API to manage application data and user interactions.

## ✨ Features

- **Modern UI:** Responsive interface with a clean and elegant design.
- **Furniture Catalog:** Browse furniture products, categories, prices, and details.
- **Interior Design Projects:** Explore interior design projects through an image gallery.
- **Design Services:** Discover interior design, furniture design, space planning, home styling, lighting design, and 3D visualization services.
- **User Authentication:** Registration and login functionality.
- **Wishlist:** Save and manage favorite furniture items.
- **Contact Form:** Submit project inquiries and contact requests.
- **Backend API:** RESTful API endpoints for application functionality.
- **Layered Architecture:** Organized backend structure for maintainability and separation of concerns.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

### Architecture & Tools
- Layered Architecture (API, BLL, DAL)
- Repository Pattern
- Unit of Work Pattern
- Git & GitHub

## 🏗️ Project Architecture

The backend is organized into three main layers:

- **NOVA.API:** Handles HTTP requests, API controllers, and responses.
- **NOVA.BLL:** Contains business logic and application services.
- **NOVA.DAL:** Manages data access, entities, repositories, and database operations.

The React frontend communicates with the ASP.NET Core Web API, while Entity Framework Core manages database interactions with SQL Server.

## 📂 Project Structure

```text
NOVA/
├── NOVA.API/
│   ├── Controllers/
│   ├── Data/
│   └── Program.cs
├── NOVA.BLL/
├── NOVA.DAL/
│   ├── Models/
│   └── Repositories/
└── NOVA.API.sln
```

The frontend is maintained in the `main` branch, while the backend is maintained in the `backend` branch of this repository.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- .NET SDK compatible with the backend project
- SQL Server
- Visual Studio or Visual Studio Code

### Run the Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/Nada-Alkomi/NOVA-Interior-Landing-Page.git
   ```

2. Switch to the backend branch:

   ```bash
   git checkout backend
   ```

3. Open `NOVA.API.sln` in Visual Studio.
4. Configure the database connection using your local configuration.
5. Apply the required Entity Framework Core migrations, if available.
6. Run the `NOVA.API` project.

### Run the Frontend

1. Switch to the frontend branch:

   ```bash
   git checkout main
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed in the terminal.

## 🔐 Configuration

Configure the backend database connection and frontend API base URL for your local environment.

**Security:** Do not commit database passwords, API keys, or other sensitive credentials to GitHub.

## 👩‍💻 Author

**Nada Mostafa**

GitHub: [Nada-Alkomi](https://github.com/Nada-Alkomi)

---

*Built with React, ASP.NET Core, and SQL Server.*
