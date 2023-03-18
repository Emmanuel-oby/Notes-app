import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <button><Link to="/Signup">Sign up</Link></button>
        <button><Link to="/login">Log in</Link></button>
    </div>
  )
}

export default Home