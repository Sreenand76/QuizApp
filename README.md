# **Quizmo -Full Stack Quiz Application**

This project is a fully functional **Quiz Application** designed to offer an interactive and engaging platform for users to take quizzes while administrators manage quiz creation and updates. It includes features like quiz categorization, score tracking, and timer-based challenges for an enhanced user experience.

---

## **🛠️ Technologies Used**

### **Frontend**:
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling and responsiveness.

### **Backend**:
- **Spring Boot**: Framework for creating Java-based web applications and RESTful APIs.
- **PostgreSQL**: Relational database for storing quiz data, user progress, and scores.

### **Containerization**:
- **Docker**: Ensures seamless and consistent deployment across all environments.

### **Authentication & Security**:
- **JWT (JSON Web Tokens)**: Provides secure authentication and role-based access control for APIs.

---

## **🎯 Key Features**

- **Dynamic and Responsive Frontend**: Designed with React.js and Tailwind CSS to ensure a smooth and accessible user experience across devices.
- **Admin Privileges**: Only administrators can create, update, and manage quizzes, questions, and categories.
- **User Interactivity**: Regular users can take quizzes, track scores, and participate in timer-based challenges.
- **Quiz Categorization**: Quizzes are categorized for better organization and accessibility.
- **Dockerized Deployment**: Containerized application using Docker to streamline deployment and maintain consistency across environments.

---

## **🔮 Future Scope**

- Add user analytics to track quiz performance and trends.
- Integrate social media sharing options for quiz results.
- Enable quiz exports in formats like PDF or Excel.

---

## **🚀 Live Demo**

⚠️ The live demo link is currently unavailable. If deployment issues arise, consider checking:
- **Frontend build logs** for errors during deployment.
- **Docker container status** to verify successful builds and configurations.
- Ensure backend APIs are properly deployed and accessible to the frontend.

Once resolved, you can provide the live demo link here:  
[Live Demo](https://quizmo75.vercel.app/)

---

## **📂 Project Setup**

# 1. Clone the Repository
git clone https://github.com/sreenand76/QuizApp.git
cd QuizApp

# 2. Setup the Frontend
cd QuizApp-frontend
npm install
npm run dev

# 3. Setup the Backend
cd ../QuizApp-backend
mvn clean install
mvn spring-boot:run


