import os
from django.conf import settings
from django.shortcuts import render
from .serializers import StockPredictionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
#from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score
from .ml_model import model


class StockPredictionAPIView(APIView):
    
    def post(self, request):
        serializer = StockPredictionSerializer(data = request.data)
        if serializer.is_valid():
            ticker = serializer._validated_data['ticker']
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            print(df)
            if df.empty:
                return Response({ 'error' : 'No data found for the given ticker symbol.',
                                 'status': status.HTTP_404_NOT_FOUND
                                 })
            
            df = df.reset_index()
            
            # Generate Basic Plot
            plt.switch_backend('AGG') # Use a non-interactive backend (to save plots to files) AGG => Anti-Grain Geometry
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label = 'Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.grid(True)
            plt.legend()
            #save the plot to the file
            plot_img_path = f"{ticker}_plot.png" #plotted image path
            plot_img = save_plot(plot_img_path)
            
            # 100 days moving Average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label = 'Closing Price')
            plt.plot(ma100, 'r', label = 'Moving Average-100 days')
            plt.title(f'Closing Price of {ticker} with 100 days Moving Average')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.grid(True)
            plt.legend()
            #save the plot to the file
            ma100_plot_img_path = f'{ticker}_ma100_plot.png'
            ma100_plot_img = save_plot(ma100_plot_img_path)
            
            # 200 days moving average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label = 'Closing Price')
            plt.plot(ma100, 'r', label = 'Moving Average-100 days')
            plt.plot(ma200, 'g', label = 'Moving Average-200 days')
            plt.title(f'Closing Price of {ticker} with 100 and 200 days Moving Averages')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.grid(True)
            plt.legend()
            #save the plot to the file
            ma200_plot_img_path = f'{ticker}_ma200_plot.png'
            ma200_plot_img = save_plot(ma200_plot_img_path)
            
            #splitting the data into training and testing sets
            data_training = pd.DataFrame(df.Close[:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])
            
            #scaling data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0, 1))
            
            
            #preparing test data
            past_100_data = data_training.tail(100)
            final_df = pd.concat([past_100_data , data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df) # scaling btw 0 and 1
            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100 : i])
                y_test.append(input_data[i, 0])
            x_test, y_test = np.array(x_test), np.array(y_test)
            
            # making prediction
            # if model:
            y_predicted = model.predict(x_test)
            
            #Inverse Transform(revert the scaled data into original data to see the difference)
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
            
            #plot final prediction plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test, 'b', label = 'Original Price')
            plt.plot(y_predicted, 'r', label = 'Predicted price')
            plt.title(f"Final Prediction for the {ticker} ")
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.grid(True)
            plt.legend()
            plot_img_path = f"{ticker}_final_prediction.png"
            plot_final_prediction = save_plot(plot_img_path)
            
            # closer view of last 100 days
            # plt.switch_backend('AGG')
            # plt.figure(figsize=(12,6))
            # plt.plot(y_test, 'b', label = 'Original Price')
            # plt.plot(y_predicted, 'r', label = 'Predicted price')
            # plt.title('comparision')
            # plt.xlabel('Days')
            # plt.ylabel("Closing price")
            # plt.legend()
            # plt.grid(True)
            # plt.xlim(650, 800)
            # plt.ylim(160,260)
            # last100_plot_img_path = f"{ticker}_final_prediction_last_100_days.png"
            # last100_plot_img = save_plot(last100_plot_img_path)
            
            #Model Evaluation
            #Mean squared error(MSE)
            mse = mean_squared_error(y_test, y_predicted)
            
            # root mean squared error (rmse)
            rmse = np.sqrt(mse)
            
            # r squared (r2)
            r2 = r2_score(y_test, y_predicted)
            
            
            return Response({
                'status':'Success',
                'plot_img':plot_img,
                'ma100_plot_img': ma100_plot_img,
                'ma200_plot_img': ma200_plot_img,
                'plot_final_prediction': plot_final_prediction,
                #'plot_final_prediction_last_100_days': last100_plot_img,
                'mse':mse,
                'rmse':rmse,
                'r2':r2,
                })
            
