import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className='container'>
            <Link className='text-link' to='/home'><div id="home" className="page-btn">Home</div></Link>
            <Link className='text-link' to='/client'><div id="client" className="page-btn">client</div></Link>
            <Link className='text-link' to='/actions'><div id="actions" className="page-btn">actions</div></Link>
            <Link className='text-link' to='/analytics'><div id="dashboard" className="page-btn">analytics</div></Link>
        </div>
    )
}