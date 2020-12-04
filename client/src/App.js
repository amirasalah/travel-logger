import * as React from 'react'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getLogEntries } from './apis'
import LogEntryForm from './LogEntryForm'

const Map = () => {
    const [logEntries, setLogEntries] = useState([])
    const [showPopup, setShowPopup] = useState({})
    const [addEntryLocation, setAddEntryLocation] = useState(null)

    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 30.0444,
        longitude: 31.2357,
        zoom: 8,
    })

    useEffect(() => {
        ;(async () => {
            const entries = await getLogEntries()
            setLogEntries(entries)
        })()
        return () => {
            setLogEntries([])
        }
    }, [])
    const addNewMarker = event => {
        const [longitude, latitude] = event.lngLat
        setAddEntryLocation({
            longitude,
            latitude,
        })
    }
    const getEntries = () => {}
    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/amirasalah/ckia954ll4jgo19rykmdo9tuc'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onDblClick={addNewMarker}
        >
            {logEntries.map(entry => (
                <>
                    <Marker
                        key={entry._id}
                        latitude={entry.latitude}
                        longitude={entry.longitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <div
                            onClick={() =>
                                setShowPopup({
                                    [entry._id]: true,
                                })
                            }
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                                <circle cx='12' cy='10' r='3'></circle>
                            </svg>
                        </div>
                    </Marker>
                    {showPopup[entry._id] && (
                        <Popup
                            latitude={entry.latitude}
                            longitude={entry.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            dynamicPosition={true}
                            onClose={() =>
                                setShowPopup({
                                    [entry._id]: false,
                                })
                            }
                            anchor='top'
                        >
                            <div>
                                <h3>{entry.title}</h3>
                                {entry.description && (
                                    <p>{entry.description}</p>
                                )}
                                <img src={entry.image} alt={entry.title} />
                                <div>
                                    <small>
                                        Visit Date:
                                        {new Date(
                                            entry.visitDate,
                                        ).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                        </Popup>
                    )}
                </>
            ))}
            {addEntryLocation ? (
                <>
                    <Marker
                        latitude={addEntryLocation.latitude}
                        longitude={addEntryLocation.longitude}
                    >
                        <div>
                            <svg
                                className='marker red'
                                style={{
                                    height: `${6 * viewport.zoom}px`,
                                    width: `${6 * viewport.zoom}px`,
                                }}
                                version='1.1'
                                id='Layer_1'
                                x='0px'
                                y='0px'
                                viewBox='0 0 512 512'
                            >
                                <g>
                                    <g>
                                        <path
                                            d='M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z'
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </Marker>
                    <Popup
                        latitude={addEntryLocation.latitude}
                        longitude={addEntryLocation.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        dynamicPosition={true}
                        onClose={() => setAddEntryLocation(null)}
                        anchor='top'
                    >
                        <div className='popup'>
                            <LogEntryForm
                                onClose={() => {
                                    setAddEntryLocation(null)
                                    getEntries()
                                }}
                                location={addEntryLocation}
                            />
                        </div>
                    </Popup>
                </>
            ) : null}
        </ReactMapGL>
    )
}
export default Map
