import React from 'react'
import './Dashboard.css'
function Board({ title, value, change,image }) {
  return (
    <div className="stat-card">
      <div>
    <div className="icon">{image}</div> 
    <div style={{ color: '#64748b' }}>{title}</div>
      </div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>{value}</div>
    <div style={{ color: '#22c55e' }}>{change}</div>
  </div>
  )
}

export default Board
