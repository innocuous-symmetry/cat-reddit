import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllSubs } from "../reddit/redditSlice";
import './Sidebar.css';

export default function Sidebar({isCollapsed}) {
    const allSubs = useSelector(selectAllSubs);
    let arrayOfSubs = Object.keys(allSubs);
    const [subs, setSubs] = useState(arrayOfSubs);
    const [searchSubs, setSearchSubs] = useState('');

    const searchWindowStyle = useRef('search-inactive');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.value) {
            searchWindowStyle.current = 'search-active';
            setSearchSubs(e.target.value);
        } else if (e.target.value === '') {
            searchWindowStyle.current = 'search-inactive';
            setSearchSubs('');
        }
    }

    return (
        <>
        <div className={isCollapsed ? 'sidebar-hidden' : 'sidebar'}>
            {
                subs.map((sub) => {
                    return (
                        <div className="individual-sub">
                            <button className="toggle-sub-active">X</button>
                            <p>{sub}</p>
                        </div>
                    )
                })
            }
            <input className="search-sub-input" type="text" onChange={handleChange} placeholder="Search Subs to Add"></input>
        </div>
        <div className={searchWindowStyle.current}>
            <h2>Search Results for: {searchSubs}</h2>
            <p>(results here)</p>
        </div>
        </>
    );
}