import { useContext, useState } from 'react';
import IssueContext from './IssueContext';
import styles from './AddIssue.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';


const AddIssue = () => {
  const { dispatch, nextId } = useContext(IssueContext);
  const [issue, setIssue] = useState({});
  const [countDownTime, setCountDownTime] = useState({});
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (issue.title && issue.description) {
      const currentDate = new Date();
      const newIssue = {
        ...issue,
        id: nextId,
        addDate: currentDate.toString(),
        countDownTime: countDownToMinutes()
      };

      dispatch({ type: 'ADD_ISSUE', payload: newIssue });
      setIssue({});
      setCountDownTime({});
      setError('');
      setShowForm(false);

      const target = document.querySelector("#scrollTarget");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setError('Title and description cannot be empty');
    }
  };

  const handleChange = e => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleTimeChange = e => {
    setCountDownTime({ ...countDownTime, [e.target.name]: e.target.value });
  };

  //converts total minutes from countdown days, hours and minutes
  const countDownToMinutes  = ()  => {
    return (Number(countDownTime.days) || 0) * 1440 + (Number(countDownTime.hours) || 0) * 60 + (Number(countDownTime.minutes) || 0);
  };

  return (
    <div className={styles.container}>
      {!showForm ? (
        <button
          className={styles.addButton}
          onClick={() => setShowForm(true)}
          aria-label="Open form to add an issue"
        >
          ADD A NEW ISSUE
        </button>
      ) : (
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
          name="days"
          min="0"
          value={countDownTime.days || ''}
          onChange={handleTimeChange}
          aria-label="Days remaining to solve the issue"
        />
        <br />
        <label>
          Hours:
        </label>
        <input
          type="number"
          name="hours"
          min="0"
          value={countDownTime.hours || ''}
          onChange={handleTimeChange}
          aria-label="Hours remaining to solve the issue"
        />
        <br />
        <label>
          Minutes:
        </label>
        <input
          type="number"
          name="minutes"
          min="0"
          value={countDownTime.minutes || ''}
          onChange={handleTimeChange}
          aria-label="Minutes remaining to solve the issue"
        />
      </div>
      <br />
      {error && <p className={styles.error} aria-label="Error message"> {error} </p>}
        <button className={styles.button} type="submit">
          SAVE&nbsp;
          <FontAwesomeIcon
            icon={faFloppyDisk}
            style={{ fontSize: "1.5em" }}
          />
        </button>
       </form>)}
    </div>)
};

export default AddIssue;
