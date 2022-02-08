import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data, src}) {
    const vid = useRef();
    const aud = useRef();        // identifies location of video/audio in DOM
    
    const [playing, setPlaying] = useState(false);      // handles play/pause logic
    const [error, setError] = useState(null);
    
    const crossPostSrc = src;

    let url = crossPostSrc ? crossPostSrc :             // sets video source according to applicable
        (data.url ? data.url : null);                   // location within reddit response


    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('HEAD', `${url}/DASH_audio.mp4`, true);
        req.send();
        if (req.status === 404) {
            setError(true);
        }
        if (req.status === 403) {
            setError(true);
        }
    }, [url]);

    useEffect(() => {                         // synchronizes play/pause between two components
        if (playing) {                        // according to section of state
            vid.current.play();
            vid.current.currentTime = aud.current.currentTime;
        } else if (!playing) {
            vid.current.pause();
        }
    }, [playing, aud, vid]);

    return (
        <div className="video-player">

            {
                !error ? 

                <>
                <video id="post-video" ref={vid} autoPlay={playing ? true : false} src={`${url}/DASH_1080.mp4`}>
                    This video is not supported by your browser.
                </video>
                <video id="post-audio" ref={aud} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} src={`${url}/DASH_audio.mp4`}>
                    This video is not supported by your browser.
                </video>
                </>

                :

                <video id="post-video" ref={vid} controls src={`${url}/DASH_1080.mp4`}>
                    This video is not supported by your browser.
                </video>


            }
        </div>
    );
}