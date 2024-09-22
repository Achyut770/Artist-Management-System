export const errorMessage = (error) => {
    if (error.name === 'ValidationError') {
        return error.errors;
    }
    return error.message
}