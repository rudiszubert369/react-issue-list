import { useContext, useState } from 'react';
import IssueContext from './IssueContext';

const AddEditIssue = () => {
  const { currentIssue, dispatch } = useContext(IssueContext);
  const [issue, setIssue] = useState(currentIssue || {});

  const handleSubmit = e => {
    e.preventDefault();
    if (issue.id) {
      dispatch({ type: 'UPDATE_ISSUE', payload: issue });
    } else {
      dispatch({ type: 'ADD_ISSUE', payload: issue });
    }
  };

  const handleChange = e => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={issue.title || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={issue.description || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Save</button>
      <button onClick={() => dispatch({ type: 'SET_CURRENT_ISSUE', payload: null })}>Cancel</button>
    </form>
  );
};

export default AddEditIssue;
