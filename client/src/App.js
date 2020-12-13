import * as React from 'react'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { getLogEntries } from './apis'
import Header from './components/header'
import MapPopup from './components/map-popup'
import LogEntryForm from './components/log-entry-form'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { EditContext } from './context/selectPointContext'

const Map = () => {
    const [logEntries, setLogEntries] = useState([])
    const [showPopup, setShowPopup] = useState({})
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: `calc(100vh - 50px)`,
        latitude: 30.0444,
        longitude: 31.2357,
        zoom: 8,
    })
    const getEntries = async () => {
        const entries = await getLogEntries()
        setLogEntries(entries)
    }
    const ShowPopup = entry => {
        setShowPopup({
            [entry._id]: false,
        })
    }
    useEffect(() => {
        getEntries()
    }, [])

    return (
        <>
            <Router>
                <Header />
                <Route exact path='/'>
                    <ReactMapGL
                        {...viewport}
                        mapStyle='mapbox://styles/amirasalah/ckia954ll4jgo19rykmdo9tuc'
                        mapboxApiAccessToken={
                            process.env.REACT_APP_MAPBOX_TOKEN
                        }
                        onViewportChange={nextViewport =>
                            setViewport(nextViewport)
                        }
                    >
                        {logEntries.map(entry => (
                            <div key={entry._id}>
                                <Marker
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
                                            stroke='yellow'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        >
                                            <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                                            <circle
                                                cx='12'
                                                cy='10'
                                                r='3'
                                            ></circle>
                                        </svg>
                                    </div>
                                </Marker>
                                {showPopup[entry._id] && (
                                    <MapPopup
                                        reloadMap={getEntries}
                                        entry={entry}
                                        setShowPopup={() => ShowPopup(entry)}
                                        setSelectedLocation={
                                            setSelectedLocation
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </ReactMapGL>
                </Route>
                <Route exact path='/new'>
                    <LogEntryForm reloadMap={getEntries} />
                </Route>
                <EditContext.Provider value={selectedLocation}>
                    <Route exact path='/edit'>
                        <LogEntryForm reloadMap={getEntries} />
                    </Route>
                </EditContext.Provider>
            </Router>
        </>
    )
}
export default Map
