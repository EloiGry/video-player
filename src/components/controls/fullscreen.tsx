import { Maximize, Minimize } from 'lucide-react';

type FullScreenProps = {
    fullscreen: boolean;
    onToggleFullScreen: () => void;
}

export function FullScreen({ fullscreen, onToggleFullScreen }: FullScreenProps) {
    return(
            <button onClick={onToggleFullScreen} className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                {fullscreen ? <Minimize size={24}/> : <Maximize size={24}/>}
            </button>
    )
}