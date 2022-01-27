import React from "react";
import SearchBar from "../searchBar/searchBar";
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <h1>Reddit but it's all cats</h1>
            <SearchBar />
            <p>Expand sidebar here</p>
        </div>
    )
}