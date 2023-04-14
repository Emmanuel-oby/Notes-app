import React from 'react'
import { Link } from 'react-router-dom'
import './land.scss'

function Land() {
  return (
    <div className='land'>
        <button><Link to="/Signup">Sign up</Link></button>
        <button><Link to="/login">Log in</Link></button>
    </div>
  )
}

export default Land