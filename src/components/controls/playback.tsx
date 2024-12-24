import { useState } from 'react';
import { cn } from '@/lib/utils';

type PlaybackRateProps = {
    playbackRate: number;
    onPlayBackRate: (rate: number) => void;
}

export function PlayBackRate({ onPlayBackRate, playbackRate }: PlaybackRateProps) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="relative m-auto">
            <button onClick={toggleVisibility}>
                <span className='bold'>{playbackRate}x</span>
            </button>
            <div
                className={cn(
                    "z-50 absolute bottom-full -right-3 bg-background text-foreground rounded shadow-lg p-2",
                    {
                        block: isVisible,
                        hidden: !isVisible,
                    }
                )}
            >
                {[0.5, 1, 1.5, 2].map((rate) => (
                    <button
                        key={rate}
                        onClick={() => {
                            onPlayBackRate(rate);
                            toggleVisibility();
                        }}
                        className={cn(
                            "w-full opacity-60 hover:opacity-100 transition-opacity duration-100",
                            {
                                "opacity-60": rate !== playbackRate,
                                "opacity-100": rate === playbackRate,
                            }
                        )}
                    >
                        {rate}x
                    </button>
                ))}
            </div>
        </div>
    );
}
