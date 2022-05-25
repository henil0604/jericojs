const ResponseWrap = async (callback) => {
    try {
        return await callback();
    } catch (e) {
        if (e && e.response && e.response.status === 400) {
            return e.response.data
        }

        return {
            status: 'error',
            error: "Could not connect to server",
            originalError: e
        }
    }
}

module.exports = ResponseWrap;