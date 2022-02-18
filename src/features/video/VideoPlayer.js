import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data, src}) {
    const vidControls = useRef();
    const vid = useRef();
    const aud = useRef();        // identifies location of video/audio in DOM
    
    const [playing, setPlaying] = useState(false);      // handles play/pause logic
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    
    const crossPostSrc = src;

    let url;        // contains video source, routed accordingly by logic below

    if (crossPostSrc) {
        url = crossPostSrc;         // ... for crossposts
    } else if (data.url) {
        url = data.url;             // ... for local posts, where the url
    } else {                        // can be accessed at data.url
        url = null;                 // otherwise, is null
    }

    useEffect(() => {                                       // checks the endpoint where audio may be found
        let checking = true;                                // if the fetch request throws an error, audio is set to null;
        const checkForAudio = async() => {                  // otherwise, audio is set to the endpoint, which is evaluated
            try {                                           // below as truthy, and rendered in the page
                await fetch(`${url}/DASH_audio.mp4`)
                .then((response) => {
                    let status = response.status;
                    if (status > 400) {
                        setAudio(null);
                    } else {
                        setAudio(`${url}/DASH_audio.mp4`);
                    }
                });
            } catch(e) {
                console.log(e);
            }
        }

        const checkForVideo = async(source) => {
            try {
                await fetch(source)
                .then((response) => {
                    if (response.status > 400) {
                        setVideo(null);
                    } else {
                        setVideo(source);
                    }
                });
            } catch(e) {
                console.log(e);
            }
        }

        if (checking) {
            checkForAudio();
            checkForVideo(data.media.reddit_video.fallback_url);
            checking = false;
        }

        return () => {
            checking = false;
        }
    }, [url, video, data, audio]);

    useEffect(() => {                    // this section handles simultaneous playback of audio and video
        if (!audio || !video) {
            return;
        }

        if (playing) {
            vid.current.play();                                         // synchronizes play/pause between two components
            vid.current.currentTime = aud.current.currentTime;          // according to section of state
        } else if (!playing) {
            vid.current.pause();
        }
    }, [playing, video, audio, aud, vid]);

    return (
        <>
        {!video ? null :
        <div className="video-player">

            {
                !audio ? 

                <>
                <video id="post-video-no-audio" ref={vidControls} controls src={video}>
                    This video is not supported by your browser.
                </video>
                </>

                :

                <>
                <video id="post-video" ref={vid} autoPlay={playing ? true : false} src={video}>
                    This video is not supported by your browser.
                </video>
                <video id="post-audio" ref={aud} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} src={audio}>
                    This video is not supported by your browser.
                </video>
                </>

            }
        </div>
        }
        </>
    );
}