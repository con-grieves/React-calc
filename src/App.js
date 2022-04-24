import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

//Action object to be used inside reducer

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}

//Reducer function to handle op states.

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOp: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currOp === "0") return state
      if (payload.digit === "." && state.currOp?.includes(".")) return state
      return {
        ...state,
        currOp: `${state.currOp || ""}${payload.digit}`,
      }


        
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOp == null && state.prevOp == null) {
        return state
      }

      if (state.currOp == null) {
        return {
          ...state,
          op: payload.op,
        }
      }

      if (state.prevOp == null ) {
        return {
          ...state,
          op: payload.op,
          prevOp: state.currOp,
          currOp: null
        }
      }

      return {
        ...state,
        prevOp: evaluate(state),
        op: payload.op,
        currOp: null,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE:
      if (state.overwrite) return {}
      if (state.currOp == null) return state
      if (state.currOp.length === 1) {
        return {
          ...state,
          currOp: null
        }
      }

      return {
        ...state,
        currOp: state.currOp.slice(0, -1)
      }

    case ACTIONS.EVALUATE: 
      if (state.op == null || state.currOp == null || state.prevOp == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        prevOp: null,
        op: null,
        currOp: evaluate(state),
      }
  }
}

//Eval function to compute values based on given operators and push to relevant op states

function evaluate ({ currOp, prevOp, op }) {
  const prev = parseFloat(prevOp)
  const curr = parseFloat(currOp)
  if (isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (op) {
    case "+":
      computation = prev + curr
      break
    case "-": 
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
  }

  return computation.toString()
}

//Formatting ops to include commas for larger integers

const format = new Intl.NumberFormat("en-uk", {
  maximumFractionDigits: 0,
})

function formatOp(op) {
  if (op == null) return
  const [integer, decimal] = op.split('.')
  if (decimal == null) return format.format(integer)
}

//App function

function App() {
  const [{ currOp, prevOp, op }, dispatch] = useReducer(reducer, {}) 
  return (
    <div className='calcGrid'>
      <div className='output'>
        <div className='prevOp'>{formatOp(prevOp)} {op}</div>
        <div className='currOp'>{formatOp(currOp)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton op="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton op="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton op="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton op="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
