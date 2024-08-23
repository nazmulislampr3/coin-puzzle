import { useGameContext } from "../context/GameContext";
import { Player as Pl } from "../type";
import cn from "../utils/lib/cn";

const Player = ({ player }: { player: Pl }) => {
  const { player: pl } = useGameContext()!;
  const currentPlayer = player === pl;
  return (
    <div
      className={cn(
        "px-4 md:px-6 py-1.5 md:py-3 text-lg md:text-2xl lg:3xl font-bold bg-slate-500 text-slate-300 disabled:opacity-70 flex items-center justify-center gap-1 transition-all duration-300 ease-in-out",
        {
          "shadow-lg": currentPlayer,
          "bg-green-600": pl === 1 && currentPlayer,
          "bg-sky-600": pl === 2 && currentPlayer,
          "opacity-80": !currentPlayer,
        }
      )}
    >
      <img
        className="size-4 md:size-5 invert"
        src="/images/user.png"
        alt="user"
      />
      <span>Player {player}</span>
    </div>
  );
};

export default Player;
