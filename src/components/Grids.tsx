import { useGameContext } from "../context/GameContext";
import CoinGrids from "./CoinGrids";

const Grids = () => {
  const { gridUnit } = useGameContext()!;
  const grids = Array.from({ length: gridUnit + gridUnit * gridUnit });

  return (
    <div
      className="w-full grid relative"
      style={{
        gridTemplateColumns: `repeat(${gridUnit}, 1fr)`,
        gridTemplateRows: `repeat(${gridUnit}, 1fr)`,
      }}
    >
      {grids.map((_, index) => (
        <div className="w-full aspect-square" key={index} />
      ))}
      <CoinGrids />
    </div>
  );
};

export default Grids;
