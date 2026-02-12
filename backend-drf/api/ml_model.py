import os
#from keras.models import load_model
#import tensorflow as tf

from keras.models import load_model
from django.conf import settings

MODEL_PATH = os.path.join(settings.BASE_DIR, 'stock_predictor_model.keras')


#model = load_model(MODEL_PATH)
# import os
# import tf_keras as keras
# from tf_keras.models import load_model
# from tf_keras.layers import InputLayer
# from django.conf import settings

# # 1. Create a "Shim" class to catch the error
# class CompatInputLayer(InputLayer):
#     def __init__(self, *args, **kwargs):
#         # Remove the offending keyword if it exists
#         kwargs.pop('batch_shape', None)
#         super().__init__(*args, **kwargs)

# # 2. Path to your model
# MODEL_PATH = os.path.join(settings.BASE_DIR, 'stock_predictor_model.keras')

# # 3. Load the model, telling it to use our CompatInputLayer instead of the standard one
# try:
#     model = load_model(
#         MODEL_PATH, 
#         custom_objects={'InputLayer': CompatInputLayer}
#     )
#     print("✅ Model loaded successfully using compatibility shim!")
# except Exception as e:
#     print(f"❌ Still failed to load model: {e}")
#     # Fallback: Create a dummy model so the server doesn't crash
#     model = None

#model = load_model(MODEL_PATH)
_model = None

def get_model():
    """Load model only when first needed"""
    global _model
    if _model is None:
        try:
            _model = load_model(MODEL_PATH)
        except Exception as e:
            print(f"Error loading model: {e}")
            _model = None  # Set to None if loading fails
    return _model

