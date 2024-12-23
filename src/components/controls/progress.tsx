import { Slider } from "../ui/slider"

type ProgressProps = {
    played: number;
    onSeek: (value: number[]) => void;
    onSeekMouseUp: (value: number[]) => void;
    onSeekMouseDown: () => void;
    currentTime: string;
    duration: string;
}

export default function Progress({played, onSeek, onSeekMouseUp, onSeekMouseDown, currentTime, duration}: ProgressProps) {

    return (
        <div className="flex gap-2 w-full">
            <span> {currentTime} </span>
            <Slider
                min={0}
                value={[played * 100]}
                max={100}
                step={1}
                onValueChange={onSeek}
                onValueCommit={onSeekMouseUp}
                onMouseDown={onSeekMouseDown}
                aria-label="progress-bar"
                className="w-full cursor-pointer"
            />
            <span> {duration} </span>
        </div>
    )
}