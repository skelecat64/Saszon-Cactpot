import { useState } from "react";
import GameSimulationWorker from "../gameSimulationWorker?worker";
import BoardState from "../boardState";
import VisualBoard from "./VisualBoard";
import MgpDisplay from "./MgpDisplay";

import "./TrustworthinessDisplay.scss";

const MAX_GAMES = 100;

const GameOverview = ({ gameData }) => {
  const best = gameData.prize === gameData.largestPossiblePrize;

  return (
    <div className="gameOverview">
      <VisualBoard
        boardState={gameData.boardState}
        allowEdits={false}
        highlightSquares={gameData.chosenLine}
        trueBoard={gameData.trueBoard}
      />
      <p>
        Prize won: <MgpDisplay amount={gameData.prize} />
      </p>
      {best ? (
        <p>(maximum possible)</p>
      ) : (
        <p>(max prize {gameData.largestPossiblePrize})</p>
      )}
    </div>
  );
};

const TrustworthinessDisplay = ({}) => {
  const [boardState, setBoardState] = useState(new BoardState());
  const [simulating, setSimulating] = useState(false);
  const [previousGames, setPreviousGames] = useState([]);
  const [winnings, setWinnings] = useState(0);
  const [largestPossibleWinnings, setLargestPossibleWinnings] = useState(0);
  const [numberOfGames, setNumberOfGames] = useState(0);

  function simulate() {
    if (simulating) {
      return;
    }

    setBoardState(new BoardState());
    setSimulating(true);
    setPreviousGames([]);
    setWinnings(0);
    setLargestPossibleWinnings(0);
    setNumberOfGames(0);

    const worker = new GameSimulationWorker();

    worker.onmessage = (e) => {
      if (
        e.data.messageType === "GAME_START" ||
        e.data.messageType === "GAME_UPDATE"
      ) {
        setBoardState(e.data.data.boardState);
      }

      if (e.data.messageType === "GAME_END") {
        setWinnings((prev) => prev + e.data.data.prize);
        setLargestPossibleWinnings(
          (prev) => prev + e.data.data.largestPossiblePrize
        );
        setNumberOfGames((prev) => prev + 1);
        setPreviousGames((prev) => [...prev, e.data.data]);
      }

      if (e.data.messageType === "END") {
        setSimulating(false);
      }
    };

    worker.postMessage({
      messageType: "START",
      data: { numberOfGames: MAX_GAMES },
    });
  }

  return (
    <div className="trustworthinessDisplay">
      <div className="trustBoardDisplay">
        <VisualBoard
          boardState={boardState}
          allowEdits={false}
          highlightSquares={[]}
        />
        <button onClick={() => simulate()} disabled={simulating}>
          Simulate!
        </button>
      </div>
      {numberOfGames >= 1 ? (
        <>
          <p>
            Winnings: <MgpDisplay amount={winnings} /> (
            {Math.round((winnings * 100) / largestPossibleWinnings)}%)
          </p>
          <p>
            Games played: {numberOfGames}/{MAX_GAMES}
          </p>
          <p>
            Average MGP per game:{" "}
            <MgpDisplay amount={winnings / numberOfGames} />
          </p>
          <p>Previous games:</p>
          <div className="previousGames">
            {previousGames.map((x) => (
              <GameOverview key={x.gameNumber} gameData={x} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TrustworthinessDisplay;
