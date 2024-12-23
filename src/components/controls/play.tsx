"use client"
import { Play, Pause } from 'lucide-react'


type PlayProps = {
    isPlaying: boolean;
    onTogglePlay: () => void;
    sizeIcon: number;
    classNamePause?: string;
    classNamePlay?: string;
  };

export function PlayPause({ isPlaying, onTogglePlay, sizeIcon, classNamePause, classNamePlay }: PlayProps) {

  return (
    <button onClick={onTogglePlay}> {isPlaying ? <Pause className={classNamePause} size={sizeIcon} /> : <Play className={classNamePlay} size={sizeIcon}/>} </button>
  );
}