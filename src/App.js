import { useReducer, useEffect } from 'react';
import AddIssue from './components/AddIssue';
import IssueList from './components/IssueList';
import { initialState } from './components/state';
import { reducer } from './components/reducer';
import IssueContext from './components/IssueContext';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem('myState');
    if (storedState) {
      dispatch({
        type: 'SET_STORED_STATE',
        payload: JSON.parse(storedState),
      });
    }
  }, []);

  useEffect(() => {
    if (state.issues.length) {
      localStorage.setItem('myState', JSON.stringify(state));
    }
  }, [state]);

  return (
    <IssueContext.Provider value={{ ...state, dispatch }}>
      <IssueList />
      <AddIssue />
    </IssueContext.Provider>
  );
};

export default App;
