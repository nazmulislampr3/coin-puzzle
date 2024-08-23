import Game from "./components/Game";
import Result from "./components/Result";
import { useGameContext } from "./context/GameContext";

const App = () => {
  const { result } = useGameContext()!;
  return (
    <main
      className="w-screen h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right bottom, #674188, #4158A6)",
      }}
    >
      <Game />
      {result ? <Result /> : null}
    </main>
  );
};

export default App;
