import { useContext, useState } from 'react';
import IssueContext from './IssueContext';
import styles from './AddIssue.module.scss';

const AddIssue = () => {
  const { dispatch, nextId } = useContext(IssueContext);
  const [issue, setIssue] = useState({});
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (issue.title && issue.description) {
      const currentDate = new Date();
      dispatch({ type: 'ADD_ISSUE', payload: {...issue, id: nextId, startDate: currentDate.toString()} });
      setIssue({ description: '', title: '', daysRemaining: '' });
      setError('');
      setShowForm(false);
    } else {
      setError('Title and description cannot be empty');
    }
  };

  const handleChange = e => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      {!showForm ? (
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          +
        </button>
      ) : (
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
          <div className={styles.timeContainer}>
            <label for="days">Days:</label>
            <input
              type="number"
              id="days"
              name="daysRemaining"
              min="0"
              value={issue.daysRemaining || ''}
              onChange={handleChange}
            />
            <br />
            <label for="hours">Hours:</label>
            <input
              type="number"
              id="hours"
              name="hoursRemaining"
              min="0"
              value={issue.hoursRemaining || ''}
              onChange={handleChange}
            />
            <br />
            <label for="minutes">Minutes:</label>
            <input
              type="number"
              id="minutes"
              name="minutesRemaining"
              min="0"
              value={issue.minutesRemaining || ''}
              onChange={handleChange}
            />
          </div>
          <br />

          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.button} type="submit">Save</button>
        </form>)}
    </div>)
};

export default AddIssue;
