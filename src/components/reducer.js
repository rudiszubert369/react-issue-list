export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ISSUE':
        return {
            ...state,
            issues: [...state.issues, { ...action.payload, id: state.nextId, status: 'open' }],
            nextId: state.nextId + 1
        }
        case 'DELETE_ISSUE':
        return { ...state, issues: state.issues.filter(issue => issue.id !== action.payload) };
        case 'UPDATE_ISSUE':
        return {
            ...state,
            issues: state.issues.map(issue =>
            issue.id === action.payload.id ? action.payload : issue
            )
        };
        case 'SET_STORED_STATE':
            if(action.payload && action.payload.issues && action.payload.nextId){
                return action.payload;
            }else{
                return state;
            }
        
        default:
        return state;
    }
};
