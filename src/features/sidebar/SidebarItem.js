import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSubVisibility } from "../reddit/redditSlice";

export default function SidebarItem({sub}) {
    const [visible, setVisible] = useState('hide');
    const dispatch = useDispatch();

    const handleClick = () => {
        if (visible === 'hide') {
            setVisible('show');
        } else if (visible === 'show') {
            setVisible('hide');
        }
    }

    return (
        <div className="individual-sub">
            {/* <input type="checkbox" id={sub} checked={checked} onChange={handleClick}></input> */}
            <button id={sub} onClick={handleClick}>{visible}</button>
            <label id={sub}>{sub}</label>
        </div>
    );
}