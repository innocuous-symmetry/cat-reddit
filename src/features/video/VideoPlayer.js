import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data, src}) {
    const vid = useRef();
    const aud = useRef();

    const crossPostSrc = src;

    let url = crossPostSrc ? crossPostSrc : 
        (data.url ? data.url : null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing) {
            vid.current.play();
            vid.current.currentTime = aud.current.currentTime;
        } else if (!playing) {
            vid.current.pause();
        }
    }, [playing, aud, vid]);

    return (
        <div className="video-player">
            <video id="post-video" ref={vid} autoPlay={() => playing ? true : false} src={`${url}/DASH_1080.mp4`}>
                This video is not supported by your browser.
            </video>
            <video id="post-audio" ref={aud} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} src={`${url}/DASH_audio.mp4`}>
                This video is not supported by your browser.
            </video>
        </div>
    );
}