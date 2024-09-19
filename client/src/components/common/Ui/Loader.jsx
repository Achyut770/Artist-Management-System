import React from 'react';
import './styles/Loader.css';
import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
    return (
        <div className="loader_user">
            <div className="spinner_user">
                <LuLoader2 />

            </div>
        </div>
    );
};

export default Loader;