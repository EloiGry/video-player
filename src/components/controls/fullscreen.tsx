import { Maximize, Minimize } from 'lucide-react';

type FullScreenProps = {
    onToggleFullScreen: () => void;
    fullscreen: boolean;
}

export function FullScreen({ onToggleFullScreen, fullscreen }: FullScreenProps) {
    
    return(
            <button onClick={onToggleFullScreen} className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                {fullscreen ? <Minimize size={24}/> : <Maximize size={24}/>}
            </button>
    )
}