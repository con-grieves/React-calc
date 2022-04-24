import './App.css';

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
        return {
          ...state,
          currOp: 
        }
  }
}

function App() {
  const [{currOp, prevOp, op}, dispatch] = useReducer(reducer, {})
  return (
    <div className='calcGrid'>
      <div className='output'>
        <div className='prevOp'>{prevOp} {op}</div>
        <div className='currOp'>{currOp}</div>
      </div>
      <button className='span-two'>AC</button>
      <button>DEL</button>
      <button>/</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
