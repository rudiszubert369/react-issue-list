export const initialState = {
    issues: [],
    currentIssue: null
};
  
export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ISSUE':
        return { ...state, issues: [...state.issues, action.payload] };
        case 'DELETE_ISSUE':
        return { ...state, issues: state.issues.filter(issue => issue.id !== action.payload) };
        case 'UPDATE_ISSUE':
        return {
            ...state,
            issues: state.issues.map(issue =>
            issue.id === action.payload.id ? action.payload : issue
            )
        };
        case 'SET_CURRENT_ISSUE':
        return { ...state, currentIssue: action.payload };
        default:
        return state;
    }
};

  