import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    useEffect(() =>{
        const fetchProtectedData = async () =>{
            try{
                const response = await axiosInstance.get('/protected-view/')
            } catch(error){
                console.error('Erron in fetching data', error)
            }
        } 
        fetchProtectedData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axiosInstance.post('/predict/', {
                ticker : ticker
            })
            console.log(response.data)
        } catch(error){
            console.error('Error in API request',error)
        }
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className="col-md-6 mx-auto bg-light-dark p-5 rounded">
                <h2 className='text-light mb-5'>Enter the Stock Ticker Here </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter the Stock Ticker Here' className='form-control'
                    onChange={(e) => setTicker(e.target.value)} required />
                    <button type='submit' className='btn btn-info mt-4'>See Prediction</button>
                </form>
            </div>
        </div>
    </div>
  )
} 

export default Dashboard