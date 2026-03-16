import { useState, useEffect } from "react";

export const useCalculator = () => {
  const [displayNumber, setDisplayNumber] = useState("0");
  const [tempNum, setTempNum] = useState("");
  const [operator, setOperator] = useState("");
  const [clearState, setClearState] = useState(true);

  const operators = ["+", "-", "x", "/"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handleInputNumber(e.key);
      if (e.key === "." || e.key === ",") handleDecimal();
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

  const handleInputNumber = (num) => {
    setDisplayNumber((prev) => {
      if (prev === "0" || clearState) {
        setClearState(false);
        return num;
      }
      return prev + num;
    });
  };

  const handleInputOperator = (item) => {
    const lastChar = displayNumber.slice(-1);

    if (operators.includes(lastChar)) {
      setOperator(item);
      setDisplayNumber(displayNumber.slice(0, -1) + item);
      return;
    }

    if (operator && !operators.includes(lastChar)) {
      const result = calculate();
      if (result) {
        setTempNum(result);
        setOperator(item);
        setDisplayNumber(result + item);
        return;
      }
    }

    setTempNum(displayNumber);
    setOperator(item);
    setDisplayNumber(displayNumber + item);
    setClearState(false);
  };

  const calculate = () => {
    const parts = displayNumber.split(operator);
    const first = Number(tempNum);
    const second = Number(displayNumber.split(operator).pop());

    if (isNaN(first) || isNaN(second)) return null;

    let res = 0;
    switch (operator) {
      case "+": res = first + second; break;
      case "-": res = first - second; break;
      case "x": res = first * second; break;
      case "/": res = second !== 0 ? first / second : 0; break;
    }

    return Number(res.toPrecision(12)).toString();
  };

  const submitResult = () => {
    if (!operator) return;
    const result = calculate();
    if (result !== null) {
      setDisplayNumber(result);
      setOperator("");
      setTempNum("");
      setClearState(true);
    }
  };

  const handleDecimal = () => {
    const lastPart = operator ? displayNumber.split(operator).pop() : displayNumber;
    
    if (clearState) {
      setDisplayNumber("0.");
      setClearState(false);
      return;
    }

    if (lastPart?.includes(".")) return; 
    setDisplayNumber(displayNumber + ".");
  };

  const handleDelete = () => {
    setDisplayNumber((prev) => {
      if (prev.length === 1 || clearState) return "0";
      
      const lastChar = prev.slice(-1);
      if (operators.includes(lastChar)) {
        setOperator("");
        setTempNum("");
      }
      
      return prev.slice(0, -1);
    });
  };

  const handleClearButton = () => {
    setDisplayNumber("0");
    setTempNum("");
    setOperator("");
    setClearState(true);
  };

  const handlePercentage = () => {
    const current = Number(displayNumber);
    if (!isNaN(current)) {
      const res = (current / 100).toString();
      setDisplayNumber(res);
      setClearState(true);
    }
  };

  return {
    displayNumber,
    operator,
    handleInputNumber,
    handleClearButton,
    handleDelete,
    handleDecimal,
    handleInputOperator,
    handlePercentage,
    submitResult,
  };
};