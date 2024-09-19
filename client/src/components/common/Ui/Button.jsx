import React from 'react'
import { FaSpinner } from 'react-icons/fa6';
import "./styles/Button.css"

const Button = ({ className, children, loading, ...res }) => {
    return (
        <button
            className={`custom-button ${className}`}
            {...res}
            disabled={loading}
        >
            {!loading ? children : <FaSpinner className='spin' />}
        </button>
    );
};

export default Button