const API_URL = 'http://localhost:1337'

export const getLogEntries = async () => {
    const response = await fetch(`${API_URL}/api/logs`)
    return response.json()
}
