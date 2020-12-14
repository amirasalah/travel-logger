import React from 'react'
import { Popup } from 'react-map-gl'
import { deleteLogEntry } from '../apis'
import { useHistory } from 'react-router-dom'
import { SelectedLocation } from '../context/appState'

const MapPopup = ({ entry, setShowPopup, reloadMap }) => {
    const Location = SelectedLocation.useContainer()
    const history = useHistory()

    const deleteEntry = async entry => {
        await deleteLogEntry(entry)
        reloadMap()
    }
    const editEntry = entry => {
        Location.changeSelection(entry)
        history.push('/edit')
    }

    return (
        <Popup
            latitude={entry.latitude}
            longitude={entry.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={setShowPopup}
            anchor='top'
        >
            <h3 className='text-2xl'>{entry.title}</h3>
            <p className='text-lg'>{entry.description}</p>
            {entry.image && <img src={entry.image} alt={entry.title} />}

            <div>
                <small>
                    Visit Date:
                    {new Date(entry.visitDate).toLocaleDateString()}
                </small>
            </div>
            <section className='flex space-x-4 my-5'>
                <button
                    onClick={() => editEntry(entry)}
                    className='flex-1 bg-red-300'
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteEntry(entry)}
                    className='flex-1 bg-red-300'
                >
                    Delete
                </button>
            </section>
        </Popup>
    )
}
export default MapPopup
