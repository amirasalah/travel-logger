import React from 'react'
import { Popup } from 'react-map-gl'
import { deleteLogEntry } from '../apis'

const MapPopup = ({ entry, setShowPopup }) => {
    const deleteEntry = entry => {
        deleteLogEntry(entry)
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
                <button className='flex-1 bg-red-300'>Edit</button>
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
