import React from "react";
import { useSelector } from "react-redux";
import { selectAllSubs } from "../reddit/redditSlice";
import { v4 } from 'uuid';
import SidebarItem from "./SidebarItem";
import './Sidebar.css';

export default function Sidebar({isCollapsed}) {
    const allSubs = useSelector(selectAllSubs);
    let arrayOfSubs = Object.keys(allSubs);

    return (
        // isCollapsed is passed from the parent component, and is mutable within the navbar

        <div className={isCollapsed ? 'sidebar-hidden' : 'sidebar'}>
            {
                arrayOfSubs.map((sub) => {
                    return (
                        <SidebarItem sub={sub} key={v4()}/>
                    )
                })
            }
        </div>
    );
}