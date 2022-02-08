import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({data}) {
    const vid = useRef();
    const aud = useRef();

    const vidPosition = useRef(0);
    const audPosition = useRef(0);

    let url = data.url ? data.url : null;
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing) {
            aud.current.play();
            vid.current.currentTime = aud.current.currentTime;
        } else if (!playing) {
            aud.current.pause();
        }
    }, [playing, aud, vid]);

    return (
        <div className="video-player">
            <video ref={vid} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} src={`${url}/DASH_1080.mp4`}>
                This video is not supported by your browser.
            </video>
            <video ref={aud} controls autoPlay={() => playing ? true : false} src={`${url}/DASH_audio.mp4`}>
                This video is not supported by your browser.
            </video>
            <h1 style={{'color': 'white'}}>{playing.toString()}</h1>
        </div>
    );
}