import { Slider } from "../ui/slider";
import { Volume2, VolumeOff } from "lucide-react";
import { ChangeEvent } from "react";

type VolumeProps = {
    volume: number;
    onVolumeChange: (value: number[]) => void;
    onVolumeSeekDown: (value: number[]) => void;
    muted: boolean;
    onMute: () => void;
  };
  
  export function Volume({ onVolumeChange, volume, onVolumeSeekDown, muted, onMute }: VolumeProps) {
  const mute = muted || volume === 0;
    return (
      <div className="flex items-center">
        <button onClick={onMute}> {mute ? <VolumeOff size={24} className="mr-2" /> : <Volume2 size={24} className="mr-2" />}</button>
        <Slider
          min={0}
          max={1}
          step={0.01}
          onValueChange={onVolumeChange}
          onValueCommit={onVolumeSeekDown}
          value={[volume]}
          className="w-24 cursor-pointer"
        />
      </div>
    );
  }