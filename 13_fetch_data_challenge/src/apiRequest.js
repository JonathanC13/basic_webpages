const apiRequest = async(url = '', optionsObj = null, result = null) => {
    try {
        const response = await fetch(url, optionsObj);

        if (!response.ok) {
            throw Error({'status':'Error', 'message': 'API error'})
        }

        const responseJSON = await response.json()
        result = {'status':'ok', 'message':responseJSON}
        
    } catch (err) {
        result = err.message;
    } finally {
        return result
    }
}

export default apiRequest