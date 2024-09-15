import React from 'react'
import { useLocation } from 'react-router-dom'

const Song = () => {
    const { pathname } = useLocation()
    return (
        <div>Song {pathname} </div>
    )
}

export default Song