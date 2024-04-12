import Graph from "./GraphHeader";
import "./App.css";

function App() {
  /* ------ Cria um grafo vazio para usar como base ------ */
  const baseGraph = new Graph();

  /* ------ Cria um grafo para representar o labirinto ------ */
  let mazeGraph = new Graph();

  /* ------ Cria arrays auxiliares para contar os elementos do array ------ */
  const auxElementArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const auxRowArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];


  /* ------ Adiciona os nós ao grafo, sendo representados por números de [0 a 99] ------ */
  for (let i = 0; i < 100; i++) {
    baseGraph.addNode(i);
  }

  
  /* ------ Realiza as conexões com os nós vizinhos no labirinto ------ */
  for (let i = 0; i < 100; i++) {
    /* ------------------ Conexão com o nó de baixo ------------------ */
    // Verifica se não está na última linha do labirinto
    // Conecta o nó com o de baixo
    if (i + 10 < 100) {
      baseGraph.addConnection(i, i + 10);
    }
    /* --------------------------------------------------------------- */

    /* ------------------ Conexão com o nó da esquerda ------------------ */
    // 1. Verifica se não é o primeiro elemento
    // 2. Verifica se não está na borda direita do labirinto
    // 3. Verifica se não há uma conexão existente entre os nós
    // 4. Conecta o nó com o da esquerda
    if (i !== 0) {
      if ((i - 1) % 10 !== 9) {
        if (!baseGraph.searchConnection(i, i - 1)) {
          baseGraph.addConnection(i, i - 1);
        }
      }
    }
    /* ------------------------------------------------------------------ */

    /* ------------------ Conexão com o nó da direita ------------------ */
    // Verifica se não é o último elemento
    // Verifica se não está na borda esquerda do labirinto
    // Verifica se não há uma conexão existente entre os nós
    // Conecta o nó com o da direita
    if (i !== 99) {
      if ((i + 1) % 10 !== 0) {
        if (!baseGraph.searchConnection(i, i + 1)) {
          baseGraph.addConnection(i, i + 1);
        }
      }
    }
    /* ----------------------------------------------------------------- */
  }

  /* -------------- Cria o labirinto utilizando uma DFS randomizada -------------- */
  const handleCreateMaze = () => {
    mazeGraph = baseGraph;
  };
  /* ----------------------------------------------------------------------------- */

  return (
    <div className="pageContainer">
      <h1>Maze Creator</h1>
      <div className="maze">
        {auxRowArray.map((rowNumber) => {
          return (
            <div className="mazeRow" key={rowNumber - 200}>
              {auxElementArray.map((elementNumber) => {
                let upConnection = false;
                let rigthConnection = false;
                let leftConnection = false;
                let downConnection = false;

                if (rowNumber !== 0) {
                  if (
                    baseGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber - 10
                    )
                  ) {
                    upConnection = true;
                  }
                }

                if (elementNumber !== 0) {
                  if (
                    baseGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber - 1
                    )
                  ) {
                    leftConnection = true;
                  }
                }

                if (elementNumber !== 9) {
                  if (
                    baseGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber + 1
                    )
                  ) {
                    rigthConnection = true;
                  }
                }

                if (rowNumber !== 90) {
                  if (
                    baseGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber + 10
                    )
                  ) {
                    downConnection = true;
                  }
                }

                return (
                  <div
                    className="mazeElement"
                    key={rowNumber + elementNumber}
                    style={
                      upConnection &&
                      leftConnection &&
                      rigthConnection &&
                      downConnection
                        ? {
                            borderStyle: "hidden",
                          }
                        : upConnection && leftConnection && rigthConnection
                        ? {
                            borderTopStyle: "hidden",
                            borderLeftStyle: "hidden",
                            borderRightStyle: "hidden",
                          }
                        : upConnection && leftConnection && downConnection
                        ? {
                            borderTopStyle: "hidden",
                            borderLeftStyle: "hidden",
                            borderBottomStyle: "hidden",
                          }
                        : leftConnection && downConnection && rigthConnection
                        ? {
                            borderLeftStyle: "hidden",
                            borderBottomStyle: "hidden",
                            borderRightStyle: "hidden",
                          }
                        : downConnection && rigthConnection && upConnection
                        ? {
                            borderBottomStyle: "hidden",
                            borderRightStyle: "hidden",
                            borderTopStyle: "hidden",
                          }
                        : upConnection && downConnection
                        ? {
                            borderTopStyle: "hidden",
                            borderBottomStyle: "hidden",
                          }
                        : upConnection && leftConnection
                        ? {
                            borderTopStyle: "hidden",
                            borderLeftStyle: "hidden",
                          }
                        : upConnection && rigthConnection
                        ? {
                            borderTopStyle: "hidden",
                            borderRightStyle: "hidden",
                          }
                        : leftConnection && rigthConnection
                        ? {
                            borderLeftStyle: "hidden",
                            borderRightStyle: "hidden",
                          }
                        : leftConnection && downConnection
                        ? {
                            borderLeftStyle: "hidden",
                            borderBottomStyle: "hidden",
                          }
                        : rigthConnection && downConnection
                        ? {
                            borderRightStyle: "hidden",
                            borderBottomStyle: "hidden",
                          }
                        : upConnection
                        ? {
                            borderTopStyle: "hidden",
                          }
                        : leftConnection
                        ? {
                            borderLeftStyle: "hidden",
                          }
                        : rigthConnection
                        ? {
                            borderRightStyle: "hidden",
                          }
                        : downConnection
                        ? {
                            borderBottomStyle: "hidden",
                          }
                        : {}
                    }
                  >
                    {rowNumber + elementNumber}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button className="createMazeButton" onClick={() => handleCreateMaze()}>
        Criar labirinto
      </button>
    </div>
  );
}

export default App;
