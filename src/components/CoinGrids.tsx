import { useGameContext } from "../context/GameContext";
import Coin from "./Coin";

const CoinGrids = () => {
  const { gridUnit, coins } = useGameContext()!;
  const coinGrids = Array.from({ length: gridUnit * gridUnit });

  return (
    <div
      className="absolute w-full bottom-0 left-0 grid border-2 border-slate-300"
      style={{
        gridTemplateColumns: `repeat(${gridUnit}, 1fr)`,
        gridTemplateRows: `repeat(${gridUnit}, 1fr)`,
      }}
    >
      {coinGrids.map((_, index) => (
        <div
          className="border-2 border-slate-300  w-full aspect-square z-50"
          style={{ background: `rgba(0, 0, 0, 0.15)` }}
          key={index}
        ></div>
      ))}
      {coins.map((item, index) => (
        <Coin {...item} key={index} />
      ))}
    </div>
  );
};

export default CoinGrids;
