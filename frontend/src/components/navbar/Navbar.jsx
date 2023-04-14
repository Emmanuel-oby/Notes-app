import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import logo from '../../assets/note-logo.png'

function Navbar() {

    const [value, setValue] = useState(null)

  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={logo} alt="logo" />
            <p><span>dot</span>Notes</p>
        </div>
        <div className='search'>
            <Icon icon="material-symbols:search-rounded" className='icon'/>
            <input type="text" placeholder='Search Notes' />
            <Icon icon="material-symbols:close" className='icon'/>
        </div>
        <div>
            <nav className='nav'> 
                <div className='nav-inner'>
                <Link to="/home"><Icon icon="ion:home-outline" className="icon"/></Link>
                <Link to="/notes"><Icon icon="mdi:note-text-outline" className="icon"/></Link>
                <Link to="/categories"><Icon icon="tabler:category-2" className="icon"/></Link>
                <Link to="/settings"><Icon icon="ant-design:setting-outlined" className="icon"/></Link>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar