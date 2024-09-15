import React from 'react';
const PageLayout = ({ children, title }) => {
    return (
        <div className='route_container'>
            <h2 className='header_route' >{title}</h2>

            {children}
        </div>
    );
};

export default PageLayout;
