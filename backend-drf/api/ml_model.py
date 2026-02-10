# import os
# #from keras.models import load_model
# import tensorflow as tf
# from keras.models import load_model
# from django.conf import settings

# MODEL_PATH = os.path.join(settings.BASE_DIR, 'stock_predictor_model.keras')

# model = load_model(MODEL_PATH)
import os
import tf_keras as keras  # <--- Change this
from tf_keras.models import load_model # <--- Change this
from django.conf import settings

# Point to your model file
MODEL_PATH = os.path.join(settings.BASE_DIR, 'stock_predictor_model.keras')

# Load using the legacy engine
model = load_model(MODEL_PATH)