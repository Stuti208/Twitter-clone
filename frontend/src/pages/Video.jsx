import React, { useState, useRef, useEffect } from 'react';
import video from '../video.mp4'
import videojs from 'video.js';
import './Video.css'

const Video = () => {

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const options = {
        controls: true,
        sources: [
            {
                src: video,
                type:'video/mp4'
            }
        ]
    }

    useEffect(() => {

        const player=playerRef.current;
        
        if (!player) {
           const videoElement=videoRef.current;
            if (!videoElement)
                return;
       
           playerRef.current = videojs(videoElement, options);
        };
        
        return () => {
        
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
       
        
    }, [options, videoRef, playerRef]);

    
    return (
        <div data-vjs-player>
            <video ref={videoRef} className={`video-js vjs-big-play-centered vjs-theme-sea`} />
        </div>
    );
  
}

export default Video
