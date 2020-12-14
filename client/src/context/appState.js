import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useSelectedLocation = (location = null) => {
    const [selectedLocation, setSelectedLocation] = useState(location)

    let changeSelection = location => setSelectedLocation(location)
    return { selectedLocation, changeSelection }
}
export const SelectedLocation = createContainer(useSelectedLocation)
