import { useReducer } from 'react';
import AddIssue from './components/AddIssue';
import IssueList from './components/IssueList';
import { initialState } from './components/state';
import { reducer } from './components/reducer';
import IssueContext from './components/IssueContext';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IssueContext.Provider value={{ ...state, dispatch }}>
      <IssueList />
      <AddIssue />
    </IssueContext.Provider>
  );
};

export default App;
