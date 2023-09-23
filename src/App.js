import { useReducer } from 'react';
import Digit from './Digit';
import './App.css'
import Operation from './Operation';

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT:"delete-digit",
  CHOOSE_OPERATION:"choose-operation",
  EVALUATE:"evaluate",
}

function reducer(state, {type, payload }){
  switch(type) {
    case ACTION.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state

      if(payload.digit === "." && state.currentOperand.includes(".")) return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTION.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.prevOperand == null) return state

      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }

      if(state.prevOperand == null ){
        return {
          ...state,
          prevOperand: state.currentOperand,
          currentOperand: [],
          operation: payload.operation,
        }
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTION.CLEAR:
    return{
      state: [],
    }

    case ACTION.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }

      if(state.currentOperand == null) return state

      if(state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand: null,
        }
      }

      return{
        ...state,
        currentOperand: state.currentOperand.slice(0,-1),
      }

    case ACTION.EVALUATE: 
    if(state.currentOperand == null || 
      state.prevOperand == null) {
      return state
    }

    return{
      ...state,
      overwrite: true,
      currentOperand: evaluate(state),
      prevOperand: null,
      operation: null,
    }
  }
}


function evaluate({currentOperand, prevOperand, operation}){
  const prev = parseFloat(prevOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation  = ""
  switch(operation){
    case "+": 
      computation = prev + current
      break
    case "-": 
      computation = prev - current
      break
    case "*": 
      computation = prev * current
      break
    case "/": 
      computation = prev / current
      break
  }

  return computation.toString() 
}


function App() {
  const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="result">
        <div className="prev_output">{(prevOperand)}{operation}</div>
        <div className="curr_output">{(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({type: ACTION.CLEAR})} className="span_two">AC</button>
      <button onClick={() => dispatch({type: ACTION.DELETE_DIGIT})}>DEL</button>
      <Operation operation='/' dispatch={dispatch}/>
      <Digit digit='1' dispatch={dispatch}/>
      <Digit digit='2' dispatch={dispatch}/>
      <Digit digit='3' dispatch={dispatch}/>
      <Operation operation='*' dispatch={dispatch}/>
      <Digit digit='4' dispatch={dispatch}/>
      <Digit digit='5' dispatch={dispatch}/>
      <Digit digit='6' dispatch={dispatch}/>
      <Operation operation='+' dispatch={dispatch}/>
      <Digit digit='7' dispatch={dispatch}/>
      <Digit digit='8' dispatch={dispatch}/>
      <Digit digit='9' dispatch={dispatch}/>
      <Operation operation='-' dispatch={dispatch}/>
      <Digit digit='.' dispatch={dispatch}/>
      <Digit digit='0' dispatch={dispatch}/>
      <button onClick={() => dispatch({type: ACTION.EVALUATE})} className="span_two">=</button>
    </div>
  );
}

export default App;
