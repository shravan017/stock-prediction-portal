# --- Stage 1: Build the React Frontend ---
    FROM node:18 AS build-stage
    WORKDIR /frontend
    COPY frontend-react/package*.json ./
    RUN npm install
    COPY frontend-react/ ./
    RUN npm run build
    
    # --- Stage 2: Build the Django Backend ---
    FROM python:3.11-slim
    WORKDIR /app
    
    # Install Python dependencies
    COPY backend-drf/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    # Copy the backend code
    COPY backend-drf/ .
    
    # Take the 'dist' folder from Stage 1 and put it into Django's static folder
    COPY --from=build-stage /frontend/dist /app/staticfiles
    
    # Hugging Face uses port 7860
    EXPOSE 7860
    ENV TF_USE_LEGACY_KERAS=1
    # Start the server using Gunicorn
    CMD ["gunicorn", "--bind", "0.0.0.0:7860", "stock_prediction_main.wsgi:application"]