import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner'


const LoadingPayment = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (     
        <div>
        {
            promiseInProgress ?
            <div className="payment-loader">
                <div className="payment-spinner">
                    <h1>Processing Payment...</h1>
                    <Loader type="TailSpin" color="#f67280" height={100} width={100} />
                </div>
            </div>
            : 
            null
            
        }
        </div>
    )
}

export default LoadingPayment;