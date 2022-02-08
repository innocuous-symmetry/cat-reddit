import { useState, useRef } from 'react';

export default function VideoPlayer({data}) {
    let playerVideo = useRef();
    let playerAudio = useRef();
    const [playing, setPlaying] = useState(false);

    let url = data.url ? data.url : null;

    const handlePlay = () => {
        setPlaying(true);

        if (playing) {
            playerAudio.current.currentTime = playerVideo.current.currentTime;
            setPlaying(false);
        }
    }

    const handlePause = () => {
        playerAudio.current.pause();
        setPlaying(false);
    }

    return (
        <div className="video-player">
            <video ref={playerVideo.current} src={`${url}/DASH_1080.mp4`} onPlay={handlePlay} onPause={handlePause}></video>
            <audio ref={playerAudio.current} className="audio-hidden" src={`${url}/DASH_audio.mp4`} type="audio/mp4"></audio>
        </div>
    );
}