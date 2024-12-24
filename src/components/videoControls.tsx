import { FullScreen } from "./controls/fullscreen";
import { PlayPause } from "./controls/play";
import { PlayBackRate } from "./controls/playback";
import Progress from "./controls/progress";
import { Forward, Rewind } from "./controls/seekTo";
import { Volume } from "./controls/volume";

type VideoControlsProps = {
    controlsRef: React.RefObject<HTMLDivElement | null>
    title: string;
    onPlayPause: () => void;
    play: boolean;
    onRewind: () => void;
    onForward: () => void;
    onVolumeChange: (value: number[]) => void;
    onVolumeSeekDown: (value: number[]) => void;
    onMute: () => void;
    volume: number; 
    muted: boolean;
    playbackRate: number; // Rate at which the video plays
    onPlaybackRateChange: (rate: number) => void;
    fullscreen: boolean;
    onToggleFullScreen: () => void;
    onSeek: (value: number[]) => void;
    onSeekMouseDown: () => void;
    onSeekMouseUp: (value: number[]) => void;
    played: number;
    currentTime: string;
    duration: string;
};

export function VideoControls({
    title,
    onPlayPause, 
    play, 
    onRewind, 
    onForward, 
    controlsRef, 
    onMute,
    onVolumeChange,
    onVolumeSeekDown,
    volume,
    muted,
    playbackRate,
    onPlaybackRateChange,
    fullscreen,
    onToggleFullScreen,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    played,
    currentTime,
    duration
}: VideoControlsProps) {
    return (
        <div ref={controlsRef}>
            <span className="absolute top-0 bg-black bg-opacity-60 py-2 px-4 rounded-br-lg"> {title} </span>
            <div className="absolute inset-0 flex justify-center items-center gap-2"> 
                <Rewind onRewind={onRewind} number={10}/>
                <PlayPause classNamePlay="hover:text-white transition-opacity duration-300" classNamePause="hover:text-white transition-opacity duration-300" sizeIcon={80} isPlaying={play} onTogglePlay={onPlayPause} />
                <Forward onForward={onForward} number={10}/>
            </div>
            <div className="absolute bottom-0 bg-black bg-opacity-60 p-2 space-x-4b w-full">
                <div className="flex space-x-4">
                    <PlayPause sizeIcon={24} isPlaying={play} onTogglePlay={onPlayPause} />
                    <Progress played={played} onSeek={onSeek} onSeekMouseDown={onSeekMouseDown} onSeekMouseUp={onSeekMouseUp} currentTime={currentTime} duration={duration}/>
                    <Volume onVolumeChange={onVolumeChange} onVolumeSeekDown={onVolumeSeekDown} volume={volume} muted={muted} onMute={onMute}/>
                    <PlayBackRate playbackRate={playbackRate} onPlayBackRate={onPlaybackRateChange}/>
                    <FullScreen fullscreen={fullscreen} onToggleFullScreen={onToggleFullScreen}/>
                </div>
            </div>
        </div>
    )
}
