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
            plt.legend()
            #save the plot to the file
            ma200_plot_img_path = f'{ticker}_ma200_plot.png'
            ma200_plot_img = save_plot(ma200_plot_img_path)
            
            return Response({
                'status':'Success',
                'plot_img':plot_img,
                'ma100_plot_img': ma100_plot_img,
                'ma200_plot_img': ma200_plot_img,
                })
            
