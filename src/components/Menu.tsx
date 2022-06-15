import React, { FC } from "react"
import './styles.css'

const Menu: FC<MenuProps> = ({ setPage }) => {
  return (
    <div className="menu">
      <div className="menu-item" onClick={() => setPage(1)}>Rates</div>
      <div className="menu-item" onClick={() => setPage(2)}>Exchange</div>
      <div className="menu-item" onClick={() => setPage(3)}>History</div>
    </div>
  )
}

interface MenuProps {
  setPage: (page: number) => void
}

export default Menu