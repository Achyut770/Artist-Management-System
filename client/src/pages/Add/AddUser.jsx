import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import "../styles/addUser.css"
import PageLayout from '../../components/common/PageLayout'
import CustomTitle from '../../components/common/CustomTitle'

const AddUser = () => {
    return (
        <PageLayout title={"Add User"}>
            <CustomTitle title={"AddUser"} />
            <div className='form_container'>
                <RegisterForm />
            </div>
        </PageLayout>

    )
}

export default AddUser