
  import React from 'react'
  import { Plus } from 'lucide-react';
  function Addprofile() {
    return (
        <div className="card" style={{ height:'300px', width:'400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px'
          }}>
            <Plus size={24} color="#64748b" />
          </div>
          <div style={{ color: '#64748b' }}>Add Profile</div>
        </div>
      </div>
    )
  }
  
  export default Addprofile
  