import Graph from "./GraphHeader";
import "./App.css";

function App() {
  /* ------ Cria um grafo vazio para usar como base ------ */
  const baseGraph = new Graph();

  /* ------ Cria um grafo para representar o labirinto ------ */
  const mazeGraph = new Graph();

  /* ------ Cria arrays auxiliares para contar os elementos do array ------ */
  const auxElementArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const auxRowArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  /* ------ Adiciona os nós ao grafo, sendo representados por números de [0 a 99] ------ */
  for (let i = 0; i < 100; i++) {
    baseGraph.addNode(i);
    mazeGraph.addNode(i);
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
    // 1. Verifica se não é o último elemento
    // 2. Verifica se não está na borda esquerda do labirinto
    // 3. Verifica se não há uma conexão existente entre os nós
    // 4. Conecta o nó com o da direita
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
  // Função para pegar um nó aleatório da lista de adjacencia
  const randomNodeCreator = (max) => {
    let randomIndex = Math.floor(Math.random() * max);

    return randomIndex;
  };

  // Para todos os nós adjacentes ao nó recebido,
  // verifica se já foi visitado e, se não, adiciona
  // uma aresta entre ele e o nó visitado e chama a função recursivamente
  const depthFirstSearch = (node) => {
    let maxLength = baseGraph.adjacencyList[node].length;
    mazeGraph.visitNode(node);
    for (let i = 0; i < maxLength; i++) {
      let randomNode = randomNodeCreator(baseGraph.adjacencyList[node].length);

      // Define o próximo nó
      let nextNode = baseGraph.adjacencyList[node][randomNode];
      if (!mazeGraph.visited[nextNode]) {
        baseGraph.removeConnection(node, nextNode);
        mazeGraph.addConnection(node, nextNode);
        depthFirstSearch(nextNode);
      }
    }
  };

  const handleCreateMaze = () => {
    // Para todo nó do grafo,
    // verifica se já foi visitado e,
    // se não, chama a função recursivamente
    for (let i = 0; i < 100; i++) {
      if (!mazeGraph.visited[i]) {
        depthFirstSearch(i);
      }
    }
  };
  /* ----------------------------------------------------------------------------- */

  handleCreateMaze();

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
                    mazeGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber - 10
                    )
                  ) {
                    upConnection = true;
                  }
                }

                if (elementNumber !== 0) {
                  if (
                    mazeGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber - 1
                    )
                  ) {
                    leftConnection = true;
                  }
                }

                if (elementNumber !== 9) {
                  if (
                    mazeGraph.searchConnection(
                      rowNumber + elementNumber,
                      rowNumber + elementNumber + 1
                    )
                  ) {
                    rigthConnection = true;
                  }
                }

                if (rowNumber !== 90) {
                  if (
                    mazeGraph.searchConnection(
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
                            border: "2px solid white",
                          }
                        : upConnection && leftConnection && rigthConnection
                        ? {
                            borderTop: "2px solid white",
                            borderLeft: "2px solid white",
                            borderRight: "2px solid white",
                          }
                        : upConnection && leftConnection && downConnection
                        ? {
                            borderTop: "2px solid white",
                            borderLeft: "2px solid white",
                            borderBottom: "2px solid white",
                          }
                        : leftConnection && downConnection && rigthConnection
                        ? {
                            borderLeft: "2px solid white",
                            borderBottom: "2px solid white",
                            borderRight: "2px solid white",
                          }
                        : downConnection && rigthConnection && upConnection
                        ? {
                            borderBottom: "2px solid white",
                            borderRight: "2px solid white",
                            borderTop: "2px solid white",
                          }
                        : upConnection && downConnection
                        ? {
                            borderTop: "2px solid white",
                            borderBottom: "2px solid white",
                          }
                        : upConnection && leftConnection
                        ? {
                            borderTop: "2px solid white",
                            borderLeft: "2px solid white",
                          }
                        : upConnection && rigthConnection
                        ? {
                            borderTop: "2px solid white",
                            borderRight: "2px solid white",
                          }
                        : leftConnection && rigthConnection
                        ? {
                            borderLeft: "2px solid white",
                            borderRight: "2px solid white",
                          }
                        : leftConnection && downConnection
                        ? {
                            borderLeft: "2px solid white",
                            borderBottom: "2px solid white",
                          }
                        : rigthConnection && downConnection
                        ? {
                            borderRight: "2px solid white",
                            borderBottom: "2px solid white",
                          }
                        : upConnection
                        ? {
                            borderTop: "2px solid white",
                          }
                        : leftConnection
                        ? {
                            borderLeft: "2px solid white",
                          }
                        : rigthConnection
                        ? {
                            borderRight: "2px solid white",
                          }
                        : downConnection
                        ? {
                            borderBottom: "2px solid white",
                          }
                        : {}
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        className="createMazeButton"
        onClick={() => window.location.reload()}
      >
        Gerar novo labirinto
      </button>
    </div>
  );
}

export default App;
