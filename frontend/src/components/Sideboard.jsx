import React, { useState } from 'react';
import './Sideboard.css';
import { LayoutDashboard, Receipt, Calendar, Users, Settings, HelpCircle, Contact, Plus, X, Menu } from 'lucide-react';

function Sideboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {!isSidebarOpen && (
        <button className="menu-button" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      )}

      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">Board</div>
          </div>

          <nav className="nav">
            <div className="nav-item" style={{backgroundColor: " rgba(255, 255, 255, 0.1)"}}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </div>
            <div className="nav-item">
              <Receipt size={20} />
              <span>Transactions</span>
            </div>
            <div className="nav-item">
              <Calendar size={20} />
              <span>Schedules</span>
            </div>
            <div className="nav-item">
              <Users size={20} />
              <span>Users</span>
            </div>
            <div className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </nav>

          <div className="bottom-nav">
            <div className="nav-item">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
            <div className="nav-item">
              <Contact size={20} />
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sideboard;
