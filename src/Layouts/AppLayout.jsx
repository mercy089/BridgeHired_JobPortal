import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from "../components/theme-provider";

const AppLayout = () => {
  const {theme}=useTheme()
  return (
    <div>
      {theme==="dark" ? <div className='grid-backgroundDark '></div> : <div className='grid-backgroundLight '></div>}
       <Header/> 
      <main className='min-h-screen container mx-auto'>
        <Outlet />
      </main>
        <Footer/>
    </div>
  )
}

export default AppLayout
