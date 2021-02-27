exports.handler = async function test(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello devpaper!' })
    }
}