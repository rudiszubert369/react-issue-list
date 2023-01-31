import { useContext, useState } from 'react';
import { useTransition, animated } from "react-spring";
import IssueContext from './IssueContext';
import styles from './AddIssue.module.css';

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Title:
        <input
          className={styles.input}
          type="text"
          name="title"
          value={issue.title || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className={styles.label}>
        Description:
        <textarea
          className={styles.textarea}
          name="description"
          value={issue.description || ''}
          onChange={handleChange}
        />
      </label>
      <br />
      {error ? <p className={styles.error}>{error}</p> : null}
      <button className={styles.button} type="submit">Save</button>
    </form>
  );
};

export default AddIssue;
