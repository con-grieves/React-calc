import { ACTIONS } from './App'

export default function OperationButton({ dispatch, op}) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { op }})}>
            { op }
        </button>
    )
}