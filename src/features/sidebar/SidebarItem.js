import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSubVisibility, selectAllSubs } from "../reddit/redditSlice";

export default function SidebarItem({sub, isChecked}) {
    const [checked, setChecked] = useState(isChecked);
    const dispatch = useDispatch();
    const allSubs = useSelector(selectAllSubs);

    const handleClick = () => {
        setChecked(!checked);
        dispatch(updateSubVisibility(sub));
    }

    console.log(allSubs);

    return (
        <div className="individual-sub">
            <input type="checkbox" id={sub} htmlFor={sub} checked={checked} onChange={handleClick}></input>
            <label htmlFor={sub}>{sub}</label>
        </div>
    );
}