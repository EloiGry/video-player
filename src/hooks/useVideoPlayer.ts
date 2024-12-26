import { format } from '@/utils/format';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'

type PlayerRef = React.RefObject<ReactPlayer | null>;

export function useVideoPlayer() {

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    seeking: false,
    playbackRate: 1.0,
    played: 0,
    paused: false,
    hasSeenHalf: false,
    buffer: true,
    fullscreen: false,
  });

  // Toggle play/pause state
  const togglePlay = () =>
    setVideoState(prevState => ({
      ...prevState,
      playing: !prevState.playing,
    }));

    // Toggle play/pause state
  const togglePause = () =>
    setVideoState(prevState => ({
      ...prevState,
      paused: !prevState.paused,
    }));

  // Rewind the video by a given number of seconds
  const handleRewind = (playerRef: PlayerRef, seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - seconds);
    }
  }

  // Forward the video by a given number of seconds
  const handleForward = (playerRef: PlayerRef, seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  }

  // Toggle mute/unmute state
  const handleMute = () => {
    setVideoState(prevState => ({
      ...prevState,
      muted: !prevState.muted,
    }));
  }

  // Handle volume change when seeking
  const handleVolumeSeekDown = (value: number[]) => {
    const newValue = value[0];
    setVideoState(prevState => ({
      ...prevState,
      seeking: false,
      volume: newValue,
    }));
  };

  // Handle volume change while sliding
  const handleVolumeChange = (value: number[]) => {
    const newValue = value[0];
    setVideoState(prevState => ({
      ...prevState,
      volume: newValue,
      muted: newValue === 0 ? true : false,
    }));
  };

  // Handle playback speed change
  const handlePlayBackRate = (rate: number) => {
    setVideoState(prevState => ({
      ...prevState,
      playbackRate: rate
    }));
  }

  // Toggle fullscreen mode
  const toggleFullScreen = useCallback(
    (playerContainerRef: React.RefObject<HTMLDivElement | null>) => {
      if (screenfull.isEnabled && playerContainerRef.current) {
        screenfull.toggle(playerContainerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    const handleFullScreenChange = () => {
      setVideoState((prevState) => ({
        ...prevState,
        fullscreen: screenfull.isFullscreen,
      }));
    };

    screenfull.on('change', handleFullScreenChange);

    return () => {
      screenfull.off('change', handleFullScreenChange);
    };
  }, []);

  // Update progress and trigger view increment after 50% viewed
  const handleProgress = (state: any, incrementViews: (id: string) => void, id: string) => {
    if (state.played > 0.5 && !videoState.hasSeenHalf && state.played !== 1) {
      incrementViews(id);
      setVideoState(prevState => ({
        ...prevState,
        hasSeenHalf: true,
      }))
    };

    setVideoState(prevState => ({
      ...prevState,
      ...state
    }))
  }

  // Handle seek position change
  const handleSeekChange = (value: number[]) => {
    const newValue = value[0] / 100;
    setVideoState(prevState => ({
      ...prevState,
      played: newValue
    }));
  };

  // Set seeking state when mouse is down
  const handleSeekMouseDown = () => {
    setVideoState(prevState => ({
      ...prevState,
      seeking: true
    }));
  };

  // Handle mouse up during seek and update playback position
  const handleSeekMouseUp = (playerRef: PlayerRef, value: number[]) => {
    const newValue = value[0] / 100;
    setVideoState(prevState => ({
      ...prevState,
      seeking: false
    }));
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  // Get current time formatted
  const currentTime = (playerRef: PlayerRef): string => {
    const current = playerRef.current ? playerRef.current.getCurrentTime() : 0;
    return format(current);
  };

  // Get video duration formatted
  const duration = (playerRef: PlayerRef): string => {
    const time = playerRef.current ? playerRef.current.getDuration() : 0;
    return format(time);
  }

  // Reset video state when video ends
  const handleEnded = () => {
    setVideoState(prevState => ({
      ...prevState,
      hasSeenHalf: false,
      played: 0,
    }));
    togglePlay()
  };

  // Handle buffering video
  const handleBuffer = () => {
    setVideoState(prevState => ({
      ...prevState,
      buffer: true
    }));
  }

  const handleBufferEnd = () => {
      setVideoState(prevState => ({
        ...prevState,
        buffer: false
      }));
  }

  return {
    videoState,
    togglePlay,
    togglePause,
    handleRewind,
    handleForward,
    handleMute,
    handleVolumeSeekDown,
    handleVolumeChange,
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
    handleBufferEnd
  };
}
