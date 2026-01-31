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
            return Response({'status':'Success'})
            
