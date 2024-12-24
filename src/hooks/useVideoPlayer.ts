import {format} from '@/utils/format';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import screefull from 'screenfull'


type PlayerRef = React.RefObject<ReactPlayer | null>;

export function useVideoPlayer() {

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: 0.5,
        seeking: false,
        playbackRate: 1.0,
        fullscreen: false,
        played: 0,
        hasSeenHalf: false
      });

      const togglePlay = () =>
        setVideoState(prevState => ({
          ...prevState,
          playing: !prevState.playing, 
        }));

      const handleRewind = (playerRef: PlayerRef, seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - seconds);
        }
      }

      const handleForward = (playerRef: PlayerRef, seconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
        }
      }

      const handleMute = () => {
        setVideoState(prevState => ({
          ...prevState,
          muted: !prevState.muted,
        }));
      }

      const handleVolumeSeekDown = (value: number[]) => {
        const newValue = value[0]; 
        setVideoState(prevState => ({
          ...prevState,
          seeking: false,
          volume: newValue, 
        }));
      };
      const handleVolumeChange = (value: number[]) => {
          const newValue = value[0]; 
        setVideoState(prevState => ({
          ...prevState,
          volume: newValue, 
          muted: newValue === 0 ? true : false, 
        }));
      };

      const handlePlayBackRate = (rate: number) => {
        setVideoState(prevState => ({
            ...prevState,
            playbackRate: rate
          }));
      }

      const toggleFullScreen = (
        playerContainerRef: React.RefObject<HTMLDivElement | null>
      ) => {
        if (screefull.isEnabled && playerContainerRef.current) {
            screefull.toggle(playerContainerRef.current)
            setVideoState(prevState => ({ ...prevState, fullscreen: !prevState.fullscreen }))
        }
      }

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

      const handleSeekChange = (value: number[]) => {
        const newValue = value[0] / 100;
        setVideoState(prevState => ({
            ...prevState,
            played: newValue
          }));
      };
    
      const handleSeekMouseDown = () => {
        setVideoState(prevState => ({
            ...prevState,
            seeking: true
          }));
      };
    
      const handleSeekMouseUp = (playerRef: PlayerRef, value: number[]) => {
        const newValue = value[0] / 100;
        console.log("mouseup", newValue)
        setVideoState(prevState => ({
            ...prevState,
            seeking: false
          }));
        if (playerRef.current) {
            playerRef.current.seekTo(newValue);
        }
      };


      const currentTime = (playerRef: PlayerRef): string => {
        const current = playerRef.current ? playerRef.current.getCurrentTime() : 0;
        return format(current);
      };
    
      const duration = (playerRef: PlayerRef): string => {
        const time = playerRef.current ? playerRef.current.getDuration() : 0;
        return format(time);
      }

      const handleEnded = () => {
        setVideoState(prevState => ({
          ...prevState,
          hasSeenHalf: false,
          played: 0,
        }));
        togglePlay()
      };

      

      return {
        videoState,
        togglePlay,
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
        handleEnded
        };
    }