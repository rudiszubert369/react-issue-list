import { useContext, useState } from 'react';
import IssueContext from './IssueContext';

const AddIssue = () => {
  const { dispatch, nextId } = useContext(IssueContext);
  const [issue, setIssue] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (issue.title && issue.description) {
      const date = new Date();
      const dateString = date.toString()
      dispatch({ type: 'ADD_ISSUE', payload: {...issue, id: nextId, addDate: dateString} });
      setIssue( {description: '', title: '' } );
      setError('');
    } else {
      setError('Title and description cannot be empty');
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
      {error ? error : null}
      <button type="submit">Save</button>
    </form>
  );
};

export default AddIssue;