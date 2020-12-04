import * as React from 'react'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { getLogEntries } from './apis'

const Map = () => {
    const [logEntries, setLogEntries] = useState([])
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
    }, [])
    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/amirasalah/ckia954ll4jgo19rykmdo9tuc'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >
            {logEntries.map(entry => (
                <Marker
                    key={entry._id}
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='feather feather-map-pin'
                    >
                        <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                        <circle cx='12' cy='10' r='3'></circle>
                    </svg>
                </Marker>
            ))}
        </ReactMapGL>
    )
}
export default Map
