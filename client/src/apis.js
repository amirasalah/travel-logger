const API_URL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:1337'
        : 'https://travel-log-green.vercel.app'

export const getLogEntries = async () => {
    const response = await fetch(`${API_URL}/api/logs`)
    return response.json()
}
export const createLogEntry = async entry => {
    const password = entry.password
    delete entry.password
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': password,
        },
        body: JSON.stringify(entry),
    })
    const json = await response.json()
    if (response.ok) {
        return json
    }
    const error = new Error(json.message)
    error.response = json
    throw error
}
