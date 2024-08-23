import { useGameContext } from "../context/GameContext";

const Result = () => {
  const { draw, player } = useGameContext()!;

  return (
    <div
      className={"fixed w-full h-full z-50 flex items-center justify-center"}
      style={{
        background: "rgba(0, 0,0,0.75)",
      }}
    >
      <div className="flex items-center justify-center flex-col">
        {!draw ? (
          <>
            <h2 className="text-5xl font-bold text-pink-500">Congrats!</h2>
            <span className="mt-4 font-semibold text-2xl text-slate-300">
              Player {player} won!
            </span>
          </>
        ) : (
          <h2 className="text-5xl font-bold text-red-500">Draw!</h2>
        )}
      </div>
    </div>
  );
};

export default Result;
