import React from 'react'
import { Popup } from 'react-map-gl'
import LogEntryForm from './log-entry-form'

const MapPopup = ({ entry, setShowPopup, addPopup }) => {
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
            {addPopup ? (
                <div className='popup'>
                    <LogEntryForm onClose={setShowPopup} location={entry} />
                </div>
            ) : (
                <div>
                    <h3>{entry.title}</h3>
                    {entry.description && <p>{entry.description}</p>}
                    <img src={entry.image} alt={entry.title} />
                    <div>
                        <small>
                            Visit Date:
                            {new Date(entry.visitDate).toLocaleDateString()}
                        </small>
                    </div>
                </div>
            )}
        </Popup>
    )
}
export default MapPopup
