export const apiRequest = async(url='', paramsObj=null, result=null) => {
    result = {
        status:'error',
        message:''
    }

    try {
        if (url === '') {
            throw new Error('No url provided.')
        }

        const response = await fetch(url, paramsObj)

        if (!response.ok) {
            throw new Error((response.status).toString())
        }

        result['status'] = 'ok'
        result['message'] = await response.json()

    } catch (err) {
        result['status'] = 'error'
        result['message'] = err
    } finally {
        return result
    }

}