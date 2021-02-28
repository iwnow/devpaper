exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            time: new Date(),
            message: 'Hello from test fn'
        })
    }
}