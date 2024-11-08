const apiRequest = async(url='', paramsObj=null, result=null) => {
    result = {
        status: 'error',
        message: ''
    }

    try {

        if (url === '') {
            throw new Error('no url')
        }

        const response = await fetch(url, paramsObj)

        if (!response.ok) {
            throw new Error((response.status).toString())
        }

        result['status'] = 'ok';
        result['message'] = await response.json()

    } catch (err) {
        result['status'] = err.message
    } finally {
        return result
    }
}

export default apiRequest