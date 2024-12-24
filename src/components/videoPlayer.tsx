"use client";
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoControls } from './videoControls';

type VideoPlayerProps = {
    url: string;
    title: string;
    id: string;
    onView: (id: string) => void;
  }

export function VideoPlayer({url, title, id, onView}: VideoPlayerProps) {
    const playerRef = useRef<ReactPlayer | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const controlsRef = useRef<HTMLDivElement | null>(null);
    const {
        videoState,
        togglePlay,
        handleRewind,
        handleForward,
        handleMute,
        handleVolumeChange,
        handleVolumeSeekDown,
        handlePlayBackRate,
        toggleFullScreen,
        handleSeekChange,
        handleSeekMouseDown,
        handleSeekMouseUp,
        currentTime,
        duration,
        handleProgress,
        handleEnded
      } = useVideoPlayer();

      const handleMouseMove = () => {
        if (controlsRef.current) {
          controlsRef.current.style.display = "block";
        }
      };
    
      const handleMouseLeave = () => {
        if (controlsRef.current && videoState.playing) {
          controlsRef.current.style.display = "none";
        }
      };

      



    return (
        <div ref={playerContainerRef} className="relative cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                ref={playerRef}
                playing={videoState.playing}
                muted={videoState.muted}
                volume={videoState.volume}
                playbackRate={videoState.playbackRate}
                onProgress={(state) => handleProgress(state, onView, id)}
                onEnded={handleEnded}
            />
            <div className="absolute inset-0 w-full h-full"> 
                <VideoControls 
                    controlsRef={controlsRef}
                    title={title}
                    onPlayPause={togglePlay} 
                    play={videoState.playing} 
                    onRewind={() => handleRewind(playerRef, 10)}
                    onForward={() => handleForward(playerRef, 10)}
                    onMute={handleMute}
                    muted={videoState.muted}
                    volume={videoState.volume}
                    onVolumeChange={(value: number[]) => handleVolumeChange(value)}
                    onVolumeSeekDown={(value: number[]) => handleVolumeSeekDown(value)}
                    playbackRate={videoState.playbackRate}
                    onPlaybackRateChange={handlePlayBackRate}
                    fullscreen={videoState.fullscreen}
                    onToggleFullScreen={() => toggleFullScreen(playerContainerRef)}
                    onSeek={(value: number[]) => handleSeekChange(value)}
                    onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={(value: number[]) => handleSeekMouseUp(playerRef, value)}
                    played={videoState.played}
                    currentTime={currentTime(playerRef)}
                    duration={duration(playerRef)}
                    />
            </div>
        </div>
    )

}