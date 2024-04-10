import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function CreateRow() {
  return (
    <div className="mazeRow">
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement" />
      <div className="mazeElement"/>
    </div>
  );
}

function App() {

  return (
    <div className="pageContainer">
      <h1>Maze Creator</h1>
      <div className="maze">
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
        <CreateRow />
      </div>
    </div>
  );
}

export default App;
