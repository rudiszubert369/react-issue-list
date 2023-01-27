import { useReducer, useState } from 'react';
import AddEditIssue from './components/AddEditIssue';
import IssueList from './components/IssueList';
import { initialState, reducer } from './components/state';
import IssueContext from './components/IssueContext';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [id, setId] = useState(0);

  const addIssue = (title, description) => {
    setId(id + 1);
    dispatch({
      type: 'ADD_ISSUE',
      payload: { id, title, description }
    });
  };

  return (
    <IssueContext.Provider value={{ ...state, dispatch }}>
      <IssueList />
      <AddEditIssue addIssue={addIssue} />
    </IssueContext.Provider>
  );
};

export default App;
