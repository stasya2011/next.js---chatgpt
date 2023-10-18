import { useRef, useEffect } from "react";
import MainWrapper from "@/components/MainWrapper";

const GameOfLifeCanvas = () => {
  const canvasRef = useRef(null);

  const generateMatrix = (rows, columns) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(Math.round(Math.random()));
      }
      matrix.push(row);
    }
    return matrix;
  };

  const drawMatrix = (ctx, matrix, cellSize) => {
    matrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fillRect(
          colIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        );
      });
    });
  };

  const generateIterations = () => {
    return Math.floor(Math.random() * 100000) + 1;
  };

  const runGameOfLife = (currentMatrix) => {
    const numRows = currentMatrix.length;
    const numCols = currentMatrix[0].length;

    const newMatrix = [];

    for (let i = 0; i < numRows; i++) {
      const newRow = [];

      for (let j = 0; j < numCols; j++) {
        const neighbors = countLiveNeighbors(currentMatrix, i, j);

        if (currentMatrix[i][j] === 1) {
          newRow.push(neighbors === 2 || neighbors === 3 ? 1 : 0);
        } else {
          newRow.push(neighbors === 3 ? 1 : 0);
        }
      }

      newMatrix.push(newRow);
    }

    return newMatrix;
  };

  const countLiveNeighbors = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < numRows &&
          newCol >= 0 &&
          newCol < numCols &&
          !(i === 0 && j === 0)
        ) {
          count += matrix[newRow][newCol];
        }
      }
    }

    return count;
  };

  useEffect(() => {
    const simulateGameOfLife = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const cellSize = 10;

      const rows = Math.floor(Math.random() * 81) + 20; 
      const columns = Math.floor(Math.random() * 81) + 20; 

      let matrix = generateMatrix(rows, columns);
      let iterations = generateIterations();

      const intervalId = setInterval(() => {
        const newMatrix = runGameOfLife(matrix);
        drawMatrix(ctx, newMatrix, cellSize);
        matrix = newMatrix;

        if (--iterations === 0) {
          clearInterval(intervalId);
        }
      }, 100);
    };

    simulateGameOfLife();

  }, []);

  return (
    <MainWrapper>
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
        }}
      ></canvas>
    </MainWrapper>
  );
};

export default GameOfLifeCanvas;
