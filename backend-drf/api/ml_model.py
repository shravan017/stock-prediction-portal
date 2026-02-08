import os
from keras.models import load_model
from django.conf import settings

MODEL_PATH = os.path.join(settings.BASE_DIR, 'stock_predictor_model.keras')

model = load_model(MODEL_PATH)