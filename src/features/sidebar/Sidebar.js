import React from "react";

export default function Sidebar({isCollapsed}) {
    return (
        <div className={isCollapsed ? 'sidebar-hidden' : 'sidebar'}>
            <p>Hard coded subreddit</p>
            <p>Hard coded subreddit</p>
            <p>Hard coded subreddit</p>
            <p>Hard coded subreddit</p>
        </div>
    );
}