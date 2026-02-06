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
    const [ma100, setMa100] = useState()
    const [ma200, setMa200] = useState()
    const [finalPlot, setFinalPlot] = useState()
    //const [last100Plot, setLast100Plot] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()

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
            const ma100URL = `${backendRoot}${response.data.ma100_plot_img}`
            const ma200URL = `${backendRoot}${response.data.ma200_plot_img}`
            const finalPlotURL = `${backendRoot}${response.data.plot_final_prediction}`
            //const last100PlotURL = `${backendRoot}${response.data.plot_final_prediction_last_100_days}`
            console.log('Plot URL:', plotURL)
            setPlot(plotURL)
            setMa100(ma100URL)
            setMa200(ma200URL)
            setFinalPlot(finalPlotURL)
            //setLast100Plot(last100PlotURL)
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)
            

            if(response.data.error){
                setError(response.data.error)
            } else{
                setError(false)
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
            <div className="col-md-6 mx-auto bg-light-dark px-5 py-5 rounded">
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

            // Prediction Plot Display
            {!error && finalPlot && (
                
                <div className="prediction mt-5">
                    <div className="p-3">
                        { plot && (
                            <img src={plot} style={{maxWidth:'100%'}} />
                            
                        )}
                    </div>
                    <div className="p-3 mt-4">
                        { ma100 && (
                            <img src={ma100} style={{maxWidth:'100%'}} />
                        )}
                    </div>
                    <div className="p-3 mt-4">
                        { ma200 && (
                            <img src={ma200} style={{maxWidth:'100%'}} />
                        )}
                    </div>
                    <div className="p-3 mt-4">
                        { finalPlot && (
                            <img src={finalPlot} style={{maxWidth:'100%'}} />
                        )}
                    </div>
                    {/* <div className="p-3 mt-4 mb-5">
                        { last100Plot && (
                            <img src={last100Plot} style={{maxWidth:'100%'}} />
                        )}
                    </div> */}
                    <div className='p-3 mt-3 text-light'>
                        <h3>MODEL EVALUATION</h3>
                        <p>Mean Squared Error (MSE) : {mse}</p>
                        <p>Root Mean Squared Error (RMSE) : {rmse}</p>
                        <p>R Squared Error (R2-Score) : {r2}</p>
                    </div>
                </div>

            )}
            
        
        </div>
    </div>
  )
} 

export default Dashboard