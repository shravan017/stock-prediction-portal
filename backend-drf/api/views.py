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
            plot_image_path = f"{ticker}_plot.png" #plotted image path
            plot_img = os.path.join(settings.MEDIA_ROOT, plot_image_path) #server full path
            plt.savefig(plot_img)
            plt.close()
            plot_img = settings.MEDIA_URL + plot_image_path
            
            
            return Response({'status':'Success'})
            
