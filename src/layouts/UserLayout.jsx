import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/homepage/header'
import Footer from '../components/homepage/footer'

function UserLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default UserLayout