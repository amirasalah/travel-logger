import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <Link to='/'>
                <img
                    className='header-logo'
                    src='https://www.svgrepo.com/show/83777/plane.svg'
                    intrinsicsize='512 x 512'
                    srcset='https://www.svgrepo.com/show/83777/plane.svg 4x'
                    alt='Plane SVG Vector'
                    title='Plane SVG Vector'
                ></img>
            </Link>
            <Link to='/new'>Add new Location</Link>
        </header>
    )
}
export default Header
