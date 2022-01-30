import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchComments, isPending } from '../posts/postsSlice';

export default function Discussion({permalink, isVisible}) {
    const [thread, setThread] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const isLoading = useSelector(isPending);

    const formattedLink = permalink.substring(0,(permalink.length-1));

    useEffect(() => {
        let isActive = true;
        if (isActive) {
            if (isVisible === 'hide ') {
                dispatch(fetchComments(formattedLink))
                .then(unwrapResult)
                .then((result) => setData(result));
            }
        }
        return () => {
            isActive = false;
        }
    }, [isVisible, thread, formattedLink, dispatch]);

    useEffect(() => {
        if (data) {
            let commentData = data[1];
            console.log(commentData);

            let commentArray = commentData.data.children;
            console.log(commentArray);

            let toExport = [];
            for (let comment of commentArray) {
                toExport.push(
                    <>
                    <p>{'u/' + comment.data.author}</p>
                    <p>{comment.data.body}</p>
                    </>
                );
            }

            setThread(toExport);
        }
    }, [data, thread]);

    return (
        <div className="discussion-thread">
            {thread}
        </div>
    )
}