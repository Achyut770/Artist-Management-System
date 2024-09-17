export const errorMessage = (err) => {
    if (err?.response?.data?.error) return err.response.data.error
    return "Something Went Wrong"
}