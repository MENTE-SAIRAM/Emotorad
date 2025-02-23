import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios"; 
import Sidebar from "../components/Sideboard";
import Stats from "../components/Stats";
import Activities from "../components/Activites";
import TopProducts from "../components/Topproducts";
import AddProfile from "../components/Addprofile";
import { Menu, Search, Bell } from "lucide-react"; 
import { useLocation, useNavigate } from "react-router-dom";
import Addnewprofile from "../components/Addnewprofile";
import { RefreshCcw, Layout, MessageCircle, Users } from 'lucide-react';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [profiles, setProfiles] = useState([]); 
  const [selectedProfile, setSelectedProfile] = useState(null); // Track selected profile
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

    fetchProfiles();
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("https://emotorad-3.onrender.comprofile/getprofiles");
      setProfiles(response.data.profiles); 
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile); 
    setIsModalOpen(true);
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`https://emotorad-3.onrender.com/profile/deleteprofile/${email}`);
      alert("Profile deleted successfully");
      fetchProfiles(); 
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://emotorad-3.onrender.com/user/logout", {}, { withCredentials: true });

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
      <main className="main-content" style={{ marginLeft: isSidebarOpen ? "280px" : "0px", width: isSidebarOpen ? "calc(100% - 280px)" : "100%" }}>

        <div className="header">
          <button className="menu-button" onClick={() => setIsSidebarOpen((prev) => !prev)}>
            <Menu />
          </button>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Dashboard</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <Search className="search-icon" />
            </div>

            <div className="notification-container">
              <Bell className="notification-icon" onClick={() => setIsNotificationOpen((prev) => !prev)} />
              {isNotificationOpen && (
                <div className="notification-dropdown">
                  <p>No new notifications</p>
                </div>
              )}
            </div>

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

        <div className="stats-grid">
          <Stats title="Total Revenue" value="$2,129,430" change="+2.5%" image={<RefreshCcw size={24} />} />
          <Stats title="Total Transactions" value="1,520" change="+1.7%" image={<Layout size={24} />} />
          <Stats title="Total Units" value="9,721" change="+3.1%" image={<MessageCircle size={24} />} />
          <Stats title="Total Users" value="9,721" change="+4.2%" image={<Users size={24} />} />
        </div>

        <div className="chart-section">
          <Activities />
        </div>

        <div className="bottom-section">
          <TopProducts />
          <button className="add-profile-btn" onClick={() => { setSelectedProfile(null); setIsModalOpen(true); }} style={{ width: "fit-content", backgroundColor: "white", outline: "none", border: "none" }}>
            <AddProfile />
          </button>
        </div>

        <div className="profiles-section">
          <h2>Added Profiles</h2>
          {profiles.length === 0 ? (
            <p>No profiles added yet.</p>
          ) : (
            <ul className="profiles-list">
              {profiles.map((profile) => (
                <li key={profile.id} className="profile-card">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone Number:</strong> {profile.phonenumber}</p>

                  <div className="profile-buttons">
                    <button className="profile-btn delete-btn" onClick={() => handleDelete(profile.email)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>

      {isModalOpen && <Addnewprofile profile={selectedProfile} onClose={() => { setIsModalOpen(false); fetchProfiles(); }} />}
    </div>
  );
}

export default Dashboard;
