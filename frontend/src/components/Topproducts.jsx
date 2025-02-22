import React from 'react'
import './Dashboard.css'
function Topproducts() {
  return (
    <div className="card">
    <div className="card-header">
      <h2>Top Products</h2>
      <span style={{ color: '#64748b' }}>May - June 2021</span>
    </div>
    <div style={{ display: 'flex', gap: '24px' }}>
      <div className="pie-chart"></div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#4ade80' }}></div>
          <div>
            <div>Basic Tees</div>
            <div style={{ color: '#64748b' }}>55%</div>
          </div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#fbbf24' }}></div>
          <div>
            <div>Custom Pants</div>
            <div style={{ color: '#64748b' }}>31%</div>
          </div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#f87171' }}></div>
          <div>
            <div>Super Hoodies</div>
            <div style={{ color: '#64748b' }}>14%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Topproducts
