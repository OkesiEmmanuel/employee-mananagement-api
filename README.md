# 🚀 Project Setup, Dockerization, and Deployment Guide
## Employee Management System-Backend API

## 📌 **Prerequisites**
Before proceeding, ensure you have the following installed:

- **Git**: [Install Git](https://git-scm.com/downloads)
- **Node.js & npm**: [Install Node.js](https://nodejs.org/)
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## 👥 **1. Clone the Repository**
```sh
git clone https://github.com/OkesiEmmanuel/employee-mananagement-api.git
cd employee-mananament-api
```

---

## 📦 **2. Install Dependencies**
Ensure all required dependencies are installed.
```sh
npm install
```

---

## 🛠 **3. Environment Variables Configuration**
Create a `.env` file in the root directory and define the required environment variables:
```ini
# Application Config
PORT=3000

# Database Config
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=nestjs_db
POSTGRES_HOST=db
POSTGRES_PORT=5432

# JWT Secret
JWT_SECRET=mysecretkey
```

---

## 📌 **4. Create `Dockerfile`**
Create a `Dockerfile` in the project root to define how the application runs inside a container.
```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the entire project
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
```

---

## 🏠 **5. Create `docker-compose.yml`**
Define a `docker-compose.yml` file to orchestrate multiple services, such as the application and PostgreSQL database.

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
    environment:
      - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}
    restart: always

  db:
    image: postgres:13
    restart: always
    ports:
      - "5432:5432"
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 💪 **6. Build and Run with Docker Compose**
To build and run the project with Docker Compose, execute:

```sh
docker-compose up --build
```

To run it in **detached mode** (background):

```sh
docker-compose up -d
```

To stop the services:

```sh
docker-compose down
```

---

## 💄 **7. Push Docker Image to DockerHub**
### 🔹 **Step 1: Login to DockerHub**
```sh
docker login
```
Enter your **DockerHub username** and **password** when prompted.

### 🔹 **Step 2: Build the Docker Image**
Replace `devwizard074` and `employee-mananagement-api` accordingly.
```sh
docker build -t devwizard074/employee-mananagement-api .
```

### 🔹 **Step 3: Tag the Image**
Tag the image before pushing:
```sh
docker tag devwizard074/employee-mananagement-api devwizard074/employee-mananagement-api:latest
```

### 🔹 **Step 4: Push to DockerHub**
```sh
docker push devwizard074/employee-mananagement-api:latest
```

---

## 🚀 **8. Deploy on a Server**
### 🔹 **Step 1: Pull the Docker Image**
On the server, pull the image from DockerHub:
```sh
docker pull devwizard074/employee-mananagement-api:latest
```

### 🔹 **Step 2: Run the Container**
```sh
docker run -d -p 3000:3000 --env-file .env devwizard074/employee-mananagement-api
```

Or run using **Docker Compose**:
```sh
docker-compose up -d
```

---

## 📓 **9. Verify Deployment**
Check running containers:
```sh
docker ps
```

View application logs:
```sh
docker logs -f <container_id>
```

Test the API:
```sh
curl http://localhost:3000
```

---

## 🔧 **10. Managing the Deployment**
### **Stop the Running Container**
```sh
docker stop <container_id>
```

### **Remove the Container**
```sh
docker rm <container_id>
```


## 🎭 **Final Notes**
- Ensure your **`.env` file** is **not committed** to Git.
- Use **secrets management** (like AWS Secrets Manager) for production.
- Automate deployment with **CI/CD pipelines** (GitHub Actions, GitLab CI, etc.).
- Use **Docker Swarm** or **Kubernetes** for **scalable deployments**.
