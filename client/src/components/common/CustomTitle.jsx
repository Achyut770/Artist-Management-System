import React from 'react'
import { Helmet } from 'react-helmet-async'

const CustomTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | Artist Management System</title>
        </Helmet>
    )
}

export default CustomTitle