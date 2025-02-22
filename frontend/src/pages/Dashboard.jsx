import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios"; 
import Sidebar from "../components/Sideboard";
import Stats from "../components/Stats";
import Activities from "../components/Activites";
import TopProducts from "../components/Topproducts";
import AddProfile from "../components/Addprofile";
import { Menu, Search, Bell } from "lucide-react"; // 🔔 Added Notification Bell Icon
import { useLocation, useNavigate } from "react-router-dom";
import Addnewprofile from "../components/Addnewprofile";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // 🔔 Notification state
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);

  const auth = getAuth();

  useEffect(() => {
    if (!user) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate("/signin"); 
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Logout function (Handles Firebase & Backend Logout)
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });

      if (user) {
        const isFirebaseUser = user.providerData?.some((provider) => provider.providerId.includes("google.com") || provider.providerId.includes("firebase"));
        if (isFirebaseUser) {
          await signOut(auth);
        }
      }

      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get avatar letter from displayName or email
  const getAvatarLetter = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.split("@")[0].charAt(0).toUpperCase();
    } else {
      return "?";
    }
  };

  return (
    <div className="dashboard">
      {isSidebarOpen && <Sidebar />}
      <main className="main-content">
        <div className="header">
          <button className="menu-button" onClick={() => setIsSidebarOpen((prev) => !prev)}>
            <Menu />
          </button>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Dashboard</h1>

          {/* 🔍 Search Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <Search className="search-icon" style={{}}/>
          </div>
          {/* 🔔 Notification Icon */}
          <div className="notification-container">
            <Bell className="notification-icon" onClick={() => setIsNotificationOpen((prev) => !prev)} />
            {isNotificationOpen && (
              <div className="notification-dropdown">
                <p>No new notifications</p>
              </div>
            )}
          </div>
          {/* 👤 Avatar */}
          <div className="avatar-container">
            <div className="avatar" onClick={() => setIsDropdownOpen((prev) => !prev)}>
              {getAvatarLetter()}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          </div>


        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <Stats title="Total Revenue" value="$2,129,430" change="+2.5%" />
          <Stats title="Total Transactions" value="1,520" change="+1.7%" />
          <Stats title="Total Units" value="9,721" change="+3.1%" />
          <Stats title="Total Users" value="9,721" change="+4.2%" />
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <Activities />
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <TopProducts />
          {/* "Add Profile" Button - Opens Modal */}
          <button className="add-profile-btn" onClick={() => setIsModalOpen(true)} style={{ width: "fit-content", backgroundColor: "white", outline: "none", border: "none" }}>
            <AddProfile />
          </button>
        </div>
      </main>

      {/* Modal Component */}
      {isModalOpen && <Addnewprofile onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Dashboard;
