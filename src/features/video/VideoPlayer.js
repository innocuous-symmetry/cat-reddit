import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data, src}) {
    const vid = useRef();
    const aud = useRef();        // identifies location of video/audio in DOM
    
    const [playing, setPlaying] = useState(false);      // handles play/pause logic
    const [audio, setAudio] = useState(null);
    
    const crossPostSrc = src;

    let url;        // contains video source, routed accordingly by logic below

    if (crossPostSrc) {
        url = crossPostSrc;
    } else if (data.media.reddit_video.fallback_url) {
        url = data.media.reddit_video.fallback_url;
    } else {                        
        url = null;
    }

    useEffect(() => {                                       // checks the endpoint where audio may be found
        let checking = true;                                // if the fetch request throws an error, audio is set to null;
        const checkForAudio = async() => {                  // otherwise, audio is set to the endpoint, which is evaluated
            try {                                           // below as truthy, and rendered in the page
                await fetch(`${data.url}/DASH_audio.mp4`)
                .then((response) => {
                    if (!response.ok) {
                        setAudio(null);
                    } else {
                        setAudio(`${data.url}/DASH_audio.mp4`);
                    }
                });
            } catch(e) {
                console.log(e);
            }
        }

        if (checking) {
            checkForAudio();
            checking = false;
        }

        return () => {
            checking = false;
        }
    }, [url, audio]);

    useEffect(() => {                    // this section handles simultaneous playback of audio and video
        if (!audio) {
            return;
        }

        if (audio && playing) {
            vid.current.play();                                         // synchronizes play/pause between two components
            vid.current.currentTime = aud.current.currentTime;          // according to section of state
        } else if (!playing) {
            vid.current.pause();
        }
    }, [playing, audio, aud, vid]);

    return (
        <div className="video-player">
            {
                !audio ? 

                <>
                <video id="post-video-no-audio" controls src={url}>
                    This video is not supported by your browser.
                </video>
                </>

                : 

                <>
                <video id="post-video" ref={vid} autoPlay={playing ? true : false} src={url ? url : null}>
                    This video is not supported by your browser.
                </video>
                <video id="post-audio" ref={aud} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} src={audio}>
                    This video is not supported by your browser.
                </video>
                </>
            }
        </div>
    );
}