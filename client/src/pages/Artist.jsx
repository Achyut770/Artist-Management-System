import React from 'react'
import PageLayout from '../components/dashboard/PageLayout'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

const Artist = () => {
    return (
        <PageLayout title={"Artist"}>
            <Link to="/artist/add" className='addButton'> <MdAdd /> Add</Link>


        </PageLayout>)
}

export default Artist