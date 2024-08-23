import { useGameContext } from "../context/GameContext";
import cn from "../utils/lib/cn";
import Grids from "./Grids";
import Player from "./Player";

const Game = () => {
  const { device, restart, gridUnit, switchLevel } = useGameContext()!;
  const level = gridUnit === 5 ? 1 : gridUnit === 6 ? 2 : 3;
  const pc = device === "pc";

  const handleChange = (e: any) => {
    switchLevel(Number(e.target.value) as any);
  };

  console.log({ gridUnit });

  return (
    <div
      className={cn("w-full flex items-center justify-center gap-10", {
        "flex-col": device === "ph",
      })}
    >
      {device === "ph" ? (
        <div className="flex gap-5">
          <Player player={1} />
          <Player player={2} />
        </div>
      ) : null}
      {pc ? <Player player={1} /> : null}
      <div
        className={cn({
          "w-full": device === "ph",
          "w-2/5": pc,
        })}
      >
        <div className="w-full h-full">
          <Grids />
        </div>
        <div className="w-full flex items-center justify-center mt-8 gap-7">
          <select
            value={level}
            className="px-3 py-2 md:px-7 md:py-3 rounded-lg text-xl md:text-2xl font-bold bg-gray-500 text-slate-300 outline-none cursor-pointer"
            onChange={handleChange}
          >
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
          <button
            className="bg-purple-600 text-slate-200 px-6 md:px-7 py-2 md:py-3 shadow-lg font-bold text-xl md:text-2xl hover:opacity-80 rounded-lg"
            onClick={restart}
          >
            Restart
          </button>
        </div>
      </div>
      {pc ? <Player player={2} /> : null}
    </div>
  );
};

export default Game;
