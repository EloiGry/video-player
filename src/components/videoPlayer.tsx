"use client";
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoControls } from './videoControls';
import { LoadingSpinner } from './loader/loadingSpinner';

type VideoPlayerProps = {
  url: string;
  title: string;
  id: string;
  onView: (id: string) => void;
}

export function VideoPlayer({ url, title, id, onView }: VideoPlayerProps) {
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
    handleEnded,
    handleBuffer,
    handleBufferEnd,
    togglePause
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
    <div
      ref={playerContainerRef}
      className="relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        onPause={togglePause}
      />
      <div className="absolute inset-0 w-full h-full">
        <VideoControls
          controlsRef={controlsRef}
          title={title}
          onPlayPause={togglePlay}
          play={videoState.playing}
          fullscreen={videoState.fullscreen}
          onRewind={() => handleRewind(playerRef, 10)}
          onForward={() => handleForward(playerRef, 10)}
          onMute={handleMute}
          muted={videoState.muted}
          volume={videoState.volume}
          onVolumeChange={(value: number[]) => handleVolumeChange(value)}
          onVolumeSeekDown={(value: number[]) => handleVolumeSeekDown(value)}
          playbackRate={videoState.playbackRate}
          onPlaybackRateChange={handlePlayBackRate}
          onToggleFullScreen={() => toggleFullScreen(playerContainerRef)}
          onSeek={(value: number[]) => handleSeekChange(value)}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={(value: number[]) => handleSeekMouseUp(playerRef, value)}
          played={videoState.played}
          currentTime={currentTime(playerRef)}
          duration={duration(playerRef)}
          isLoading={videoState.buffer && videoState.playing}
        />
        {(videoState.buffer && videoState.playing) && <LoadingSpinner className="absolute inset-0 z-50 m-auto w-16 h-16"/>}
      </div>
    </div>
  );
}
