import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data, src}) {
    const vidControls = useRef();
    const vid = useRef();
    const aud = useRef();        // identifies location of video/audio in DOM
    
    const [playing, setPlaying] = useState(false);      // handles play/pause logic
    const [audio, setAudio] = useState(null);
    
    const crossPostSrc = src;

    let url = crossPostSrc ? crossPostSrc :             // sets video source according to applicable
        (data.url ? data.url : null);                   // location within reddit response


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

        if (playing) {
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
                <video id="post-video-no-audio" ref={vidControls} controls src={`${url}/DASH_1080.mp4` || `${url}/DASH_1080.mp4?source=fallback`}>
                    This video is not supported by your browser.
                </video>
                </>

                :

                <>
                <video id="post-video" ref={vid} autoPlay={playing ? true : false} src={`${url}/DASH_1080.mp4`}>
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