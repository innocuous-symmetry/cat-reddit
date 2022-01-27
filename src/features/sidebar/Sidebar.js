import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllSubs } from "../reddit/redditSlice";

export default function Sidebar({isCollapsed}) {
    const allSubs = useSelector(selectAllSubs);
    let arrayOfSubs = Object.keys(allSubs);
    const [subs, setSubs] = useState(arrayOfSubs);
    const [searchSubs, setSearchSubs] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.value) {
            setSearchSubs(e.target.value);
        }
    }

    return (
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
            <input type="text" onChange={()=>{}} placeholder="Search Subs to Add"></input>
        </div>
    );
}