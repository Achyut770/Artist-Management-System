import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import "./styles/addUser.css"
import PageLayout from '../components/dashboard/PageLayout'

const AddUser = () => {
    return (
        <PageLayout title={"Add User"}>
            <div className='form_container'>
                <RegisterForm />
            </div>
        </PageLayout>

    )
}

export default AddUser