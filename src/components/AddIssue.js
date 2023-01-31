import { useContext, useState } from 'react';
import { useSpring, animated } from "react-spring";
import IssueContext from './IssueContext';
import './AddIssue.css';

const AddIssue = () => {
  const { dispatch, nextId } = useContext(IssueContext);
  const [issue, setIssue] = useState({});
  const [error, setError] = useState('');
  
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

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
    <animated.form style={fade} className="form" onSubmit={handleSubmit}>
      <label className="label">
        Title:
        <input
          className="input"
          type="text"
          name="title"
          value={issue.title || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="label">
        Description:
        <textarea
          className="textarea"
          name="description"
          value={issue.description || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      {error ? <p className="error">{error}</p> : null}
      <button className="button" type="submit">Save</button>
    </animated.form>
  );
};

export default AddIssue;
