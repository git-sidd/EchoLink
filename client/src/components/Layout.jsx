import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import React from 'react'

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="h-screen overflow-hidden"> {/* Full viewport height, no scroll */}
      <div className="flex h-full"> {/* Full height for flex layout */}
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col h-full">
          <Navbar showSidebar={true} />

          {/* Scrollable main content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
