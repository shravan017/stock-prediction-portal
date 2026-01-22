import React from 'react'
import Button from './Button'


const Main = () => {
  return (
    <>
          
        <div className="container">
            <div className='p-5 text-light text-center bg-light-dark rounded'>
                <h1>Stock Prediction Portal</h1>
                <p className='lead'>Welcome to <strong>Stock Prediction Portal</strong>, your comprehensive platform for data-driven stock market prediction and analysis. We utilize cutting-edge machine learning and deep learning models to analyze historical data, market trends, and even social media sentiment, providing you with sophisticated stock forecasts. 
                 Our portal transforms complex market data into easy-to-understand, interactive visualizations and actionable insights. Whether you're a beginner investor or an experienced trader, our tools are designed to help you diversify risk, identify high-potential opportunities, and make more informed decisions to grow your wealth</p>
                <Button class="btn-info" text="Explore Now" url='dashboard'/>
            </div>
        </div>
        
    </>
  )
}

export default Main