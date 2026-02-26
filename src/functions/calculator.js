import { useState, useEffect } from "react";

export const calculator = () => {
  const [displayNumber, setdisplayNumber] = useState("0");
  const [tempNum, setTempNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [clearState, setClearState] = useState(true);

  const operators = ["+", "-", "x", "/"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handledisplayNumber(e.key);
      if (e.key === ".") handleDecimal();
      if (e.key === ",") handleDecimal();
      if (e.key === "+") handleInputOperator("+");
      if (e.key === "-") handleInputOperator("-");
      if (e.key === "*") handleInputOperator("x");
      if (e.key === "/") handleInputOperator("/");
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        submitResult();
      }
      if (e.key === "Backspace") handleDelete();
      if (e.key === "Escape") handleClearButton();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayNumber, operator, tempNum, clearState]);

  const handleDelete = () => {
    if (clearState) {
      setClearState(false);
    }

    setdisplayNumber((prev) => {
      if (prev === "0") return "0";

      const lastChar = prev.slice(-1);

      if (operators.includes(lastChar)) {
        setOperator("");
        setTempNumber("");
      }

      const displayedNum = prev.slice(0, -1);
      return displayedNum === "" ? "0" : displayedNum;
    });
  };

  const handleClearButton = () => {
    if (displayNumber === "0" || clearState) {
      setdisplayNumber("0");
      setTempNumber("");
      setOperator("");
      setClearState(true);
    } else {
      setdisplayNumber("0");
    }
  };

  const handlePercentage = () => {
    setdisplayNumber((prev) => {
      if (operator) {
        const parts = prev.split(operator);
        const first = Number(tempNum);
        const second = Number(parts[1]);

        if (!isNaN(second)) {
          const percentValue = (first * second) / 100;
          return parts[0] + operator + percentValue;
        }
      }

      const result = Number(prev) / 100;
      return String(result);
    });

    if (!operator) setClearState(true);
  };

  const handleInputOperator = (item) => {
    if (displayNumber === "0" && item !== "-") return;

    if (item === operator && displayNumber.endsWith(operator)) {
      setOperator("");
      setTempNumber("");
      setdisplayNumber((prev) => prev.slice(0, -1));
      return;
    }

    let currentCalcBase = displayNumber;
    const operatorIndex = displayNumber.indexOf(operator, 1);

    if (operatorIndex !== -1 && displayNumber.slice(operatorIndex + 1) !== "") {
      currentCalcBase = submitResult();
    }

    setTempNumber(currentCalcBase);
    setOperator(item);
    setdisplayNumber(currentCalcBase + item);
    setClearState(false);
  };

  const handleNegative = () => {
    setdisplayNumber((prev) => {
      if (clearState) {
        setClearState(false);
      }

      const operatorIndex = prev.indexOf(operator, 1);

      if (operator && operatorIndex !== -1) {
        let firstPart = prev.slice(0, operatorIndex + 1);
        let secondPart = prev.slice(operatorIndex + 1);

        if (secondPart.startsWith("-")) {
          secondPart = secondPart.slice(1);
        } else {
          secondPart = "-" + secondPart;
        }
        return firstPart + secondPart;
      } else {
        if (prev.startsWith("-")) {
          return prev.slice(1);
        } else {
          return prev === "0" ? "0" : "-" + prev;
        }
      }
    });
  };

  const handleDecimal = () => {
    setdisplayNumber((prev) => {
      if (clearState) {
        setClearState(false);
        return "0.";
      }

      const lastChar = prev.slice(-1);

      if (lastChar === ".") {
        return prev.slice(0, -1);
      }

      const parts = prev.split(operator);
      const currentNumber = operator ? parts[1] : parts[0];

      if (currentNumber && currentNumber.includes(".")) {
        return prev;
      }

      if (operators.includes(lastChar)) {
        return prev + "0.";
      }

      return prev + ".";
    });
  };

  const handledisplayNumber = (num) => {
    setdisplayNumber((prev) => {
      if (prev === "0" || clearState) {
        setClearState(false);
        return String(num);
      }
      return prev + num;
    });
  };

  const submitResult = () => {
    const operatorIndex = displayNumber.indexOf(operator, 1);
    if (operatorIndex === -1) return;

    const first = Number(tempNum);
    const secondNumString = displayNumber.slice(operatorIndex + 1);

    if (secondNumString === "") {
      const resetVal = String(first);
      setdisplayNumber(resetVal);
      setTempNumber("");
      setOperator("");
      setClearState(true);
      
      return resetVal;
    }

    const second = Number(secondNumString);
    let computedResult = 0;

    switch (operator) {
      case "+":
        computedResult = first + second;
        break;
      case "-":
        computedResult = first - second;
        break;
      case "x":
        computedResult = first * second;
        break;
      case "/":
        computedResult = first / second;
        break;
      default:
        return;
    }

    const finalResult = Number(computedResult.toPrecision(12)).toString();

    setdisplayNumber(finalResult);
    setTempNumber("");
    setOperator("");
    setClearState(true);

    return finalResult;
  };

  return {
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
  };
};
