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
    // Button to open the form
    <button
      className={styles.addButton}
      onClick={() => setShowForm(true)}
      aria-label="Open form to add an issue"
    >
      ADD A NEW ISSUE
    </button>
  ) : (
    // Form to add an issue
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="Form to add an issue"
    >
      <label className={styles.label}>
        Title:
        <input
          className={styles.input}
          type="text"
          name="title"
          value={issue.title || ''}
          onChange={handleChange}
          aria-label="Title of the issue"
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
          aria-label="Description of the issue"
        />
      </label>
      <div className={styles.timeContainer}>
        <label>
          Days:
        </label>
        <input
          type="number"
          id="days"
          name="daysRemaining"
          min="0"
          value={issue.daysRemaining || ''}
          onChange={handleChange}
          aria-label="Days remaining to solve the issue"
        />
        <br />
        <label>
          Hours:
        </label>
        <input
          type="number"
          id="hours"
          name="hoursRemaining"
          min="0"
          value={issue.hoursRemaining || ''}
          onChange={handleChange}
          aria-label="Hours remaining to solve the issue"
        />
        <br />
        <label>
          Minutes:
        </label>
        <input
          type="number"
          id="minutes"
          name="minutesRemaining"
          min="0"
          value={issue.minutesRemaining || ''}
          onChange={handleChange}
          aria-label="Minutes remaining to solve the issue"
        />
      </div>
      <br />
      {error ? <p className={styles.error} aria-label="Error message"> {error} </p> :  null}
          <button className={styles.button} type="submit">Save</button>
        </form>)}
    </div>)
};

export default AddIssue;
