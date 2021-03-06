import React, { useState } from "react";
// import SearchBar from "../searchBar/searchBar";
import Sidebar from "../sidebar/Sidebar";

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <>
        <div className="navbar">
            <h1 className="nav-title-desktop">Reddit, but it's all cats</h1>
            <h1 className="nav-title-mobile">Cat Reddit</h1>
            <button className="sidebar-button" onClick={handleCollapse}>Sidebar</button>
        </div>
        <div className="sidebar-container">
            <Sidebar isCollapsed={collapsed} />
        </div>
        </>
    )
}