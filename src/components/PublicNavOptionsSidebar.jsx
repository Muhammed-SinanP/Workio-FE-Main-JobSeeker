import React from 'react'
import { NavbarData } from './Data'
import { NavLink } from 'react-router-dom'

const PublicNavOptionsSidebar = () => {
  return (
    <>{NavbarData &&
                  NavbarData.map((element, index) => (
                    <NavLink
                      onClick={() => setSideBarOpen(false)}
                      key={index}
                      to={element.path}
                      className={({ isActive }) =>
                        `px-4 py-1.5 text-lg tracking-wide  mx-2 flex items-center gap-1.5 rounded-md ${
                          element.title == "Home" ? "font-medium" : "font-normal"
                        } ${
                          isActive
                            ? "bg-brand text-white"
                            : "bg-gray-300 hover:bg-gray-300 dark:bg-dark-text dark:hover:bg-gray-400"
                        }`
                      }
                    >
                      {element.icon} {element.title}
                    </NavLink>
                  ))}
      </>
  )
}

export default PublicNavOptionsSidebar