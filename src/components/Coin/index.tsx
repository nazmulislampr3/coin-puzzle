import { useGameContext } from "../../context/GameContext";
import { Coin as CoinType } from "../../type";
import cn from "../../utils/lib/cn";

const Coin = ({ index, player: coinPlayer, xIndex }: CoinType) => {
  const {
    gridUnit,
    throwCoin,
    player: currentPlayer,
    solvedGrids,
    gameOver,
    draw,
  } = useGameContext()!;

  const size = 100 / gridUnit;
  const left = `${size * (xIndex >= 0 ? xIndex : index % gridUnit)}%`;
  const top = `${index === -1 ? -size : Math.floor(index / gridUnit) * size}%`;

  const player = coinPlayer || currentPlayer;
  const green = player === 1;
  const sky = player === 2;

  const solvedGrid = solvedGrids?.some((item) => item === index);

  const throwableCoin = xIndex >= 0 && index === -1;
  const handleMouseUp = () => {
    if (throwableCoin) {
      throwCoin(xIndex);
    }
  };
  return (
    <div
      className={cn(
        "aspect-square absolute flex items-center justify-center z-0 transition-all duration-200 ease-in",
        {
          "bg-teal-500": solvedGrid,
          "bg-red-500": draw,
        }
      )}
      style={{ width: `${size}%`, left, top: top }}
    >
      <div
        className={cn(
          "size-3/4  rounded-full border-4 border-slate-500 flex items-center justify-center",
          {
            "bg-green-300": green,
            "bg-sky-300": sky,
            "opacity-80": !coinPlayer,
            "hover:opacity-100 cursor-pointer": !gameOver && !coinPlayer,
          }
        )}
        onMouseUp={handleMouseUp}
      >
        <div
          className={cn(
            "size-4/5 rounded-full flex items-center justify-center",
            {
              "bg-green-400": green,
              "bg-sky-400": sky,
            }
          )}
          style={{
            boxShadow: "black 0px 0px 10px 0px",
          }}
        >
          <div
            className={cn("size-2/3 rounded-full", {
              "bg-green-500": green,
              "bg-sky-500": sky,
            })}
            style={{
              boxShadow: "black 0px 0px 10px 0px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
