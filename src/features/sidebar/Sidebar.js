import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllSubs } from "../reddit/redditSlice";
import './Sidebar.css';

export default function Sidebar({isCollapsed}) {
    const dispatch = useDispatch();

    const allSubs = useSelector(selectAllSubs);
    let arrayOfSubs = Object.keys(allSubs);

    const [subs, setSubs] = useState(arrayOfSubs);
    const [searchSubs, setSearchSubs] = useState('');
    const [selected, setSelected] = useState('none selected');

    const searchWindowStyle = useRef('search-inactive');     // this ref allows us to access and modify the class of the search window container from another part of the render function

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.value) {                                       // this logic locally stores the search term in searchSubs,
            searchWindowStyle.current = 'search-active';            // and will dispatch a search action from the reddit slice
            setSearchSubs(e.target.value);                          // based on the provided term
        } else if (e.target.value === '') {
            searchWindowStyle.current = 'search-inactive';
            setSearchSubs('');
        }
    }

    const handleClick = (e) => {
        let selectedSub = e.target.id;
        setSelected(selectedSub);
    }

    return (
        <>
        <div className={isCollapsed ? 'sidebar-hidden' : 'sidebar'}>  {/* Is collapsed is passed from the parent component, and is mutable within the navbar */}
            {
                subs.map((sub) => {             // Maps each sub to its own line within the sidebar, along with a button that toggles its "isSelected" property
                    return (
                        <div className="individual-sub">
                            <input type="checkbox" id={sub} htmlFor={sub} onChange={()=>{}} checked></input>
                            <label htmlFor={sub}>{sub}</label>
                        </div>
                    )
                })
            }
            <input className="search-sub-input" type="text" onChange={handleClick} placeholder="Search Subs to Add"></input>
        </div>
        <div className={searchWindowStyle.current}>
            <h2>Search Results for: {searchSubs}</h2>
            <p>(results here)</p>
        </div>
        </>
    );
}