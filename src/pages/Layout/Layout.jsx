import React from 'react'
import Navbar from '../../Compontents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


export default function Layout() {
  return (
    <>
     <Navbar/>
     <Outlet/>

     <Footer></Footer>
    </>
  )
}
