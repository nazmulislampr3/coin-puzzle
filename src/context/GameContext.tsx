import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Coin, Player } from "../type";

type SolvedGrids = number[] | null;
type GridUnit = 5 | 6 | 7;
type Func1 = () => void;
type SwitchLevel = (level: 1 | 2 | 2) => void;
type ThrowCoin = (xIndex: number) => void;
type Device = "pc" | "ph" | null;

const GameContext = createContext<{
  gridUnit: GridUnit;
  solvedGrids: SolvedGrids;
  coins: Coin[];
  throwCoin: ThrowCoin;
  result: boolean;
  gameOver: boolean;
  draw: boolean;
  player: Player;
  restart: Func1;
  device: Device;
  switchLevel: SwitchLevel;
} | null>(null);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [gridUnit, setGridUnit] = useState<GridUnit>(5);
  const [coins, setCoins] = useState<Coin[]>([
    // {
    //   index: 2,
    //   xIndex: -1,
    //   player: 1,
    // },
    // {
    //   index: 24,
    //   xIndex: -1,
    //   player: 2,
    // },
    // {
    //   index: 7,
    //   xIndex: -1,
    //   player: 1,
    // },
    // {
    //   index: 12,
    //   xIndex: -1,
    //   player: 1,
    // },
    // {
    //   index: 17,
    //   xIndex: -1,
    //   player: 1,
    // },
    // {
    //   index: 22,
    //   xIndex: -1,
    //   player: 1,
    // },
  ]);
  const [solvedGrids, setSolvedGrids] = useState<SolvedGrids>(null);
  const [player, setPlayer] = useState<Player>(1);
  const [device, setDevice] = useState<Device>(null);
  const [result, setResult] = useState<boolean>(false);
  const draw: boolean =
    !solvedGrids &&
    coins.length === gridUnit * gridUnit &&
    !coins.some(({ index }) => index === -1);
  const gameOver = draw || !!solvedGrids;

  const restart = () => {
    setCoins(
      Array.from({ length: gridUnit }).map((_, index) => ({
        index: -1,
        xIndex: index,
      }))
    );
    setSolvedGrids(null);
    setPlayer(1);
  };

  const generateNewCoin = (xIdx: number) => {
    setCoins((prev) => {
      const copy = [...prev];
      copy.push({
        index: -1,
        xIndex: xIdx,
      });
      return copy;
    });
  };

  const isSolved = (
    currentIdx: number,
    axis: "x" | "y" | "z1" | "z2"
  ): number[] | null => {
    const slvdGrids = [currentIdx];
    const x = axis === "x";
    const y = axis === "y";
    const z1 = axis === "z1"; // => "/"
    const z2 = axis === "z2"; // => "\";

    let left =
      x || z1 || z2 ? currentIdx % gridUnit : Math.floor(currentIdx / gridUnit);
    let right = gridUnit - 1 - left;
    let matched = true;

    while (matched && (left >= 1 || right >= 1)) {
      if (left >= 1) {
        let matchIndex = x
          ? currentIdx - left
          : y
          ? currentIdx - left * gridUnit
          : z1
          ? currentIdx + left * (gridUnit - 1)
          : currentIdx - left * (gridUnit + 1);

        if (left >= 1) {
          const coinIndex = coins.findIndex(
            ({ index, player: p }) => index === matchIndex && p === player
          );

          if (coinIndex < 0) {
            matched = false;
          }
          slvdGrids.push(matchIndex);
          left--;
        }
      }

      if (matched && right >= 1) {
        let matchIndex = x
          ? currentIdx + right
          : y
          ? currentIdx + right * gridUnit
          : z1
          ? currentIdx - right * (gridUnit - 1)
          : currentIdx + right * (gridUnit + 1);

        if (right >= 0) {
          const coinIndex = coins.findIndex(
            ({ index, player: p }) => index === matchIndex && p === player
          );
          if (coinIndex < 0) {
            matched = false;
          }

          slvdGrids.push(matchIndex);
          right--;
        }
      }
    }

    return matched ? slvdGrids : null;
  };

  const switchLevel: SwitchLevel = (level) => {
    setGridUnit(level === 1 ? 5 : level === 2 ? 6 : 7);
    restart();
  };

  const solved = (currentIdx: number): number[] | null => {
    return (
      (currentIdx < gridUnit && isSolved(currentIdx, "y")) ||
      isSolved(currentIdx, "x") ||
      isSolved(currentIdx, "z1") ||
      isSolved(currentIdx, "z2")
    );
  };

  const throwCoin: ThrowCoin = (xIdx) => {
    if (!gameOver) {
      let emptyGridIndex: number = -1;
      let generateCoin: boolean = false;
      for (let i = gridUnit - 1; i >= 0; i--) {
        const gridIdx = i * gridUnit + xIdx;
        const emptyGrid = !coins.find(({ index }) => index === gridIdx);
        if (emptyGrid) {
          emptyGridIndex = gridIdx;
          if (i > 0) {
            generateCoin = true;
          }
          break;
        }
      }

      if (emptyGridIndex >= 0) {
        setCoins((prev) => {
          const copy = [...prev];
          const coin = copy.find(({ xIndex }) => xIndex === xIdx);
          if (coin) {
            coin["index"] = emptyGridIndex;
            coin["player"] = player;
            coin["xIndex"] = -1;
          }
          return copy;
        });

        setTimeout(() => {
          if (generateCoin) {
            generateNewCoin(xIdx);
          }

          const slvd = solved(emptyGridIndex);
          setSolvedGrids(slvd);
          if (!slvd) {
            setPlayer((prev) => (prev === 1 ? 2 : 1));
          }
        }, 200);
      }
    }
  };

  const init = () => {
    setDevice(window.innerHeight > window.innerWidth ? "ph" : "pc");
  };

  useEffect(() => {
    setCoins(
      Array.from({ length: gridUnit }).map((_, index) => ({
        index: -1,
        xIndex: index,
      }))
    );
    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  useEffect(() => {
    setCoins(
      Array.from({ length: gridUnit }).map((_, index) => ({
        index: -1,
        xIndex: index,
      }))
    );
  }, [gridUnit]);

  useEffect(() => {
    if (!!solvedGrids) {
      setResult(true);

      setTimeout(() => {
        setResult(false);
      }, 2000);
    }
  }, [solvedGrids]);

  return (
    <GameContext.Provider
      value={{
        gridUnit,
        solvedGrids,
        throwCoin,
        result,
        draw,
        player,
        restart,
        coins,
        device,
        gameOver,
        switchLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameContext = () => useContext(GameContext);
