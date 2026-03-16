import "./styles/App.css";
import { useCalculator } from "./functions/calculator";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Check if the tag already exists to avoid duplicates
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "viewport";
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    // This is the magic line that stops mobile from "breaking" your PC layout
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  }, []);

  const {
    displayNumber,
    operator,
    handleInputNumber,
    handleClearButton,
    handleDelete,
    handleDecimal,
    handleInputOperator,
    handleNegative,
    handlePercentage,
    submitResult,
  } = useCalculator();   

  const formatDisplay = (num) => {
    return num.replace(/\./g, ",");
  };

  return (
    <>
      <div className="calculator-container">
        <div className="panel-container">
          <div className="display-container">
            {formatDisplay(displayNumber)}
          </div>
        </div>
        <div className="buttons-container">
          <div className="row-container">
            <button className="operator" onClick={handleClearButton}>
              {displayNumber === "0" ? "AC" : "C"}
            </button>
            <button className="operator" onClick={handleDelete}>
              DEL
            </button>
            <button className="operator" onClick={handlePercentage}>
              %
            </button>
            <button
              className={`operator ${operator === "/" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("/")}
            >
              /
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handleInputNumber("7")}>7</button>
            <button onClick={() => handleInputNumber("8")}>8</button>
            <button onClick={() => handleInputNumber("9")}>9</button>
            <button
              className={`operator ${operator === "x" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("x")}
            >
              x
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handleInputNumber("4")}>4</button>
            <button onClick={() => handleInputNumber("5")}>5</button>
            <button onClick={() => handleInputNumber("6")}>6</button>
            <button
              className={`operator ${operator === "-" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("-")}
            >
              -
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handleInputNumber("1")}>1</button>
            <button onClick={() => handleInputNumber("2")}>2</button>
            <button onClick={() => handleInputNumber("3")}>3</button>
            <button
              className={`operator ${operator === "+" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("+")}
            >
              +
            </button>
          </div>
          <div className="row-container">
            <button onClick={handleNegative}>+/-</button>
            <button onClick={() => handleInputNumber("0")}>0</button>
            <button onClick={handleDecimal}>,</button>
            <button className="operator" onClick={submitResult}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;