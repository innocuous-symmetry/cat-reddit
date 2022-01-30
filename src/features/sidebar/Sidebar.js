import React, { useRef, useState } from "react";
import { useSelector, /* useDispatch */ } from "react-redux";
import { selectAllSubs } from "../reddit/redditSlice";
import { v4 } from 'uuid';
import SidebarItem from "./SidebarItem";
import './Sidebar.css';

export default function Sidebar({isCollapsed}) {
    const allSubs = useSelector(selectAllSubs);
    let arrayOfSubs = Object.keys(allSubs);

    // const [subs, setSubs] = useState(arrayOfSubs);    // this piece of state to be used to modify state based on a dispatched action
    const [searchSubs, setSearchSubs] = useState('');    // from  sidebaritems when the visibility of a sub is toggled on/off

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

    return (
        <>
                    {/* isCollapsed is passed from the parent component, and is mutable within the navbar */}
        <div className={isCollapsed ? 'sidebar-hidden' : 'sidebar'}>
            {       // arrayOfSubs will become subs from useState on implementation of useState
                arrayOfSubs.map((sub) => {             // Maps each sub to its own line within the sidebar, along with a button that toggles its "isSelected" property
                    return (
                        <SidebarItem sub={sub} key={v4()}/>
                    )
                })
            }
            <input className="search-sub-input" type="text" onChange={handleChange} placeholder="Search Subs to Add"></input>
        </div>

        {/* displays subreddit search results */}
        <div className={searchWindowStyle.current}>
            <h2>Search Results for: {searchSubs}</h2>
            <p>(results here)</p>
        </div>
        </>
    );
}