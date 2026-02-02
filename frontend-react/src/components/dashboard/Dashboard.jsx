import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()

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
        setLoading(true)
        try{
            const response = await axiosInstance.post('/predict/', {
                ticker : ticker
            })
            console.log(response.data)
            // set plot
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotURL = `${backendRoot}${response.data.plot_img}`
            if(response.data.error){
                setError(response.data.error)
            }
        } catch(error){
            console.error('Error in API request',error)
        } finally{
            setLoading(false)
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
                    <small>{error && <div className='text-danger mt-2'>{ error }</div>}</small>
                    <button type='submit' className='btn btn-info mt-4'>
                        {loading ? (
                            <span><FontAwesomeIcon icon={faSpinner} spin />Please Wait...</span>
                        ) : 'See Prediction'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
} 

export default Dashboard