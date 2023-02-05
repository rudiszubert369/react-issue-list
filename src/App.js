import { useReducer, useEffect } from 'react';
import { initialState } from './state/state';
import { reducer } from './state/reducer';
import AddIssue from './components/AddIssue';
import IssueList from './components/IssueList';
import IssueContext from './components/IssueContext';
import Layout from './components/Layout';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //checks if there is app state in localStorage
  useEffect(() => {
    const storedState = localStorage.getItem('IssueMasterState');

    if (storedState) {
      dispatch({
        type: 'SET_STORED_STATE',
        payload: JSON.parse(storedState),
      });
    }
  }, []);

  useEffect(() => {
    if (state.nextId !== 1) {//doesn't save to localStorage if initial state is used
      localStorage.setItem('IssueMasterState', JSON.stringify(state));
    }
  }, [state]);

  return (
    <IssueContext.Provider value={{ ...state, dispatch }}>
      <Layout>
        <AddIssue />
        <IssueList />
      </Layout>
    </IssueContext.Provider>
  );
};

export default App;
