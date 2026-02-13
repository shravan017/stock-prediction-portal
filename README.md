# 🧠 Stock Prediction Web Portal

## 🚀 Overview
The Stock Prediction Web Portal is a full-stack web application built using Django, Django REST Framework, and React.  
It integrates an LSTM (Long Short-Term Memory) neural network model to predict stock prices and exposes predictions through secure REST APIs.

This project demonstrates backend API development, machine learning integration, authentication systems, and full-stack architecture.

---

## 🏗️ Tech Stack

### Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication

### Frontend
- React.js
- HTML5
- CSS3

### Database
- SQLite3

### Machine Learning
- TensorFlow
- Keras
- NumPy
- Pandas
- Scikit-learn

### Visualization
- Matplotlib
- Chart-based frontend graphs

---

## ⚙️ Key Features

- User authentication using JWT
- REST API-based architecture
- LSTM-based time-series stock prediction
- Data preprocessing and feature scaling
- Secure API validation and error handling
- Actual vs Predicted stock visualization
- Clean backend architecture following REST principles

---
## 🔐 API Endpoints

| Endpoint | Description |
|----------|------------|
| `/api/v1/register/` | User registration |
| `/api/v1/token/` | User authentication |
| `/api/v1/protected-view/` | Dashboard View |
| `/api/v1/predict/` | Stock prediction using LSTM model |

## 📊 Machine Learning Workflow

1. Data collection and preprocessing using Pandas & NumPy  
2. Feature scaling and sequence preparation  
3. LSTM model training using TensorFlow/Keras  
4. Model evaluation  
5. Serving predictions via Django REST API  

---

## 🏛️ Project Architecture

Frontend (React)  
⬇  
REST APIs (Django REST Framework)  
⬇  
ML Model (TensorFlow / Keras)  
⬇  
Database (SQLite)

---

## 🛠️ Installation (Local Setup)

```bash
# Clone repository
git clone https://github.com/shravan017/stock-prediction-portal

# Navigate into project
cd stock-prediction-portal

# Create virtual environment
python -m venv env

# Activate environment
env\Scripts\activate  # Windows
source env/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run server
python manage.py runserver

# Purpose
This project was built to strengthen backend API development skills and demonstrate integration of machine learning models into production-style web applications.

#Author
Shravan Naik
Python / Django Backend Developer
