import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchComments, isPending } from '../posts/postsSlice';
import { v4 } from 'uuid';

export default function Discussion({permalink, isVisible}) {
    const [thread, setThread] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const isLoading = useSelector(isPending);

    const formattedLink = permalink.substring(0,(permalink.length-1));

    let deps = [isVisible, data, setData, thread, setThread, formattedLink, dispatch];

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

    }, [dispatch, formattedLink, isVisible, setData]);

    // if (data) {
    //     let commentData = data[1];
    //     let commentArray = commentData.data.children;

    //     let toExport = [];
    //     for (let comment of commentArray) {
    //         toExport.push(
    //             <div className="indiv-comment" key={v4()}>
    //                 <p>{'u/' + comment.data.author}</p>
    //                 <p>{comment.data.body}</p>
    //             </div>
    //         );
    //     }

    //     setThread(toExport);
    // }

    useEffect(() => {
        if (data) {
            let commentData = data[1];
            let comments = commentData.data.children;

            setThread(comments.map((comment) => {
                return (
                    <div className="indiv-comment">
                        <p>{'u/' + comment.data.author}</p>
                        <p>{comment.data.body}</p>
                    </div>
                )
            }))
        }
    }, [data]);

    return (
        <div className="discussion-thread">
            {thread}
        </div>
    )
}