import React from 'react'
import { NavLink } from 'react-router-dom'
// import './layout.styles.css'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <div>
        <div className={"w-100 flex justify-end"}>
            <NavLink to="/" className={"m-4 no-underline text-black hover:text-gray-600"}><p>Department overview sim</p></NavLink>
            <NavLink to="/ct" className={"m-4 no-underline text-black hover:text-gray-600"}><p>CT sim</p></NavLink>
        </div>
        <div className='layout-container'>
            {children}
        </div>
    </div>
  )
}

export default Layout