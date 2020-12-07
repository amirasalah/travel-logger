import React from 'react'
import { Popup } from 'react-map-gl'

const MapPopup = ({ entry, setShowPopup }) => {
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
            <h3>{entry.title}</h3>
            {entry.description && <p>{entry.description}</p>}
            <img src={entry.image} alt={entry.title} />
            <div>
                <small>
                    Visit Date:
                    {new Date(entry.visitDate).toLocaleDateString()}
                </small>
            </div>
        </Popup>
    )
}
export default MapPopup
