const initialState = {
    score: 0
  }

function scoreReducer(state = initialState, action) {
    if (action.type === 'score/update') {
        return {
            ...state,
            score: action.payload,
        }
    }
    return state;
}

export default scoreReducer;
