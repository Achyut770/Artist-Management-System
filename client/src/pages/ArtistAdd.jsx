import React from 'react'
import PageLayout from '../components/dashboard/PageLayout'
import ArtistForm from '../components/dashboard/Artist/ArtistForm'
import useAxiosPrivate from '../hooks/usePrivateAxios'
import { toast } from 'react-toastify'

const ArtistAdd = () => {
    const axiosPrivate = useAxiosPrivate()

    const addArtist = async (values) => {
        try {
            const res = await axiosPrivate.post("/artist/register", values)
            toast.success(res.data.message)
        } catch (error) {
            if (error?.response?.data?.error) { toast.error(error.response.data.error) } else {
                toast.error("Somrthing Went Wrong")
            }
            throw error
        }
    }
    return (
        <PageLayout title={"Add Artist"}>
            <ArtistForm handleSubmit={addArtist} />
        </PageLayout>
    )
}

export default ArtistAdd