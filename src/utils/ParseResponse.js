
const ParseResponse = (Response) => {
    if (!Response.data) {
        return {
            status: 'error',
            data: null,
            message: 'No Response from Server'
        };
    }


    if (Response.data && Response.data.status === 'success') {
        return Response.data.data
    }

    return Response.data;
}

module.exports = exports = ParseResponse;