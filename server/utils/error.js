export const erroMessage = (error) => {
    if (error.name === 'ValidationError') {
        return error.errors;
    }
    return error.message
}