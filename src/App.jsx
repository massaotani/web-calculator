import "./styles/App.css";
import { calculator } from "./functions/calculator";

function App() {
  const {
    displayNumber,
    operator,
    handledisplayNumber,
    handleClearButton,
    handleDelete,
    handleDecimal,
    handleInputOperator,
    handleNegative,
    handlePercentage,
    submitResult,
  } = calculator();

  return (
    <>
      <div className="calculator-container">
        <div className="panel-container">
          <div className="display-container">
            {displayNumber.replace(/\./g, ",")}
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
            <button className="operator" onClick={() => handlePercentage()}>
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
            <button onClick={() => handledisplayNumber("7")}>7</button>
            <button onClick={() => handledisplayNumber("8")}>8</button>
            <button onClick={() => handledisplayNumber("9")}>9</button>
            <button
              className={`operator ${operator === "x" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("x")}
            >
              x
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handledisplayNumber("4")}>4</button>
            <button onClick={() => handledisplayNumber("5")}>5</button>
            <button onClick={() => handledisplayNumber("6")}>6</button>
            <button
              className={`operator ${operator === "-" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("-")}
            >
              -
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handledisplayNumber("1")}>1</button>
            <button onClick={() => handledisplayNumber("2")}>2</button>
            <button onClick={() => handledisplayNumber("3")}>3</button>
            <button
              className={`operator ${operator === "+" ? "active-operator" : ""}`}
              onClick={() => handleInputOperator("+")}
            >
              +
            </button>
          </div>
          <div className="row-container">
            <button onClick={() => handleNegative()}>+/-</button>
            <button onClick={() => handledisplayNumber("0")}>0</button>
            <button onClick={() => handleDecimal()}>,</button>
            <button className="operator" onClick={() => submitResult()}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;