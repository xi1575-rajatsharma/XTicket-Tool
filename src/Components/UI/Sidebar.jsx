import React from 'react'
import closeWindow from '../../images/closewindow.png'

const Sidebar = ({ children, onClose, styles, title, classes }) => {
  let allClasses = ['sideBar', ...classes || '']
  return (
    <div className={`${allClasses.join(' ')}`} style={styles}>
      <div className="sideBar-heading-wrapper">

        <div className="sideBar-title">
          <p>{title}</p>
        </div>

        <div className="sideBar-close-btn">
          <img src={closeWindow} onClick={onClose} width="50px" height="50px" />
        </div>
      </div>
      <div className="sideBar-wrapper">
        {children}
      </div>
    </div>
  )
}

export default Sidebar