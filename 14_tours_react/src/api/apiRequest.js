const apiRequest = async(url = '', paramsObj = null, result = null) => {

    try {
        const response = await fetch(url, paramsObj);
        if (!response.ok) {
            throw new Error((response.status).toString())
        }

        const responseJSON = await response.json()
        result = {'status':'ok', 'message': responseJSON}

    } catch(err) {
        result = {status: 'error', message: err.message};
    } finally {
        return result
    }
}

export default apiRequest