import { RotateCcw, RotateCw } from "lucide-react";
import { number } from "zod";

type RewindProps = {
  onRewind: () => void;
  number: number
};

type ForwardProps = {
    onForward: () => void;
    number: number
}

function Rewind({ onRewind, number }: RewindProps) {
  return (
    <button onClick={onRewind} className="relative hover:text-white transition-opacity duration-300">
      <RotateCcw size={36}/>
      <span className="absolute text-[10px] inset-0 text-center mt-2.5"> {number} </span>
    </button>
  );
}

function Forward({ onForward, number }: ForwardProps) {
  return (
    <button onClick={onForward} className="relative hover:text-white transition-opacity duration-300">
      <RotateCw size={36}/>
      <span className="absolute text-[10px] inset-0 text-center mt-2.5"> {number} </span>
    </button>
  );
}

export { Rewind, Forward };