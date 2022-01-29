import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments } from '../posts/postsSlice';

export default function Discussion({permalink, isVisible}) {
    const [thread, setThread] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const formattedLink = permalink.substring(0,(permalink.length-1));

    useEffect(() => {
        let isActive = true;
        if (isActive) {
            if (isVisible === 'hide ') {
                setData(dispatch(fetchComments(formattedLink)));
            }
        }
        return () => {
            isActive = false;
        }
    }, [isVisible, thread, formattedLink, dispatch]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data, thread]);

    return (
        <div className="discussion-thread">
            {thread}
        </div>
    )
}