import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageLayout from '../components/dashboard/PageLayout'
import useAxiosFetch from '../hooks/fetchs'
import useAxiosPrivate from '../hooks/usePrivateAxios'
import "./styles/addUser.css"
import ArtistForm from '../components/dashboard/Artist/ArtistForm'

const EditArtist = () => {
    const { artistId } = useParams();
    const axiosPrivate = useAxiosPrivate()
    const { data, error } = useAxiosFetch(`artist/${artistId}`)
    console.log("error", error)
    const initialValue = data ? {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : ''
    } : {};
    const edit = async (values) => {
        try {
            const res = await axiosPrivate.put(`artist/edit/${artistId}`, values)
            toast.success(res.data.message)
        } catch (error) {
            if (error?.response?.data?.error) { toast.error(error.response.data.error) }
            else {
                toast.error("Something Went Wrong")
            }
        }
    }
    console.log("Data", data)
    return (
        <PageLayout title={"Edit Artist"}>
            <div className='form_container'>
                <ArtistForm initialValue={initialValue} isEditMode={true} handleSubmit={edit} />
            </div>
        </PageLayout>

    )
}

export default EditArtist