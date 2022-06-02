import React, { FC } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import MessagesStack from './MessagesStack'




const Layout: FC = () => {
  return (
    <div className='layout wrapper'>
      <Header/>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout