import React from 'react';

const SuccessModel = (props) => {
    return (
        <div className="success-model"style={{display: props.display ? "block" : "none"}} >
            
            <div className="model">
                <div className="btn-wrapper">
                    <button onClick={props.hideModel} className="close-model-btn">
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                <div className="mode-body text-center">
                    <div className="model-header">
                        <h3>Success!</h3>
                    </div>
                    <div className="check-mark text-center">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="model-footer">
                        <h4>Thank You!</h4>
                        <h4>Please wait as we prepare your food.</h4>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SuccessModel