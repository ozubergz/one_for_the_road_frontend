import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner'


const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div className="loading-indicator">
            { 
                promiseInProgress ? 
                    <Loader className="spinner" type="TailSpin" color="#f67280" height={100} width={100} />
                        :
                    null
            }
        </div>
    )
}

export default LoadingIndicator;