import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import IssueContext from './IssueContext';
import styles from './EditIssue.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const EditIssue = ({ issue, toggleEditing }) => {
  const [editedTitle, setEditedTitle] = useState(issue.title);
  const [editedDescription, setEditedDescription] = useState(issue.description);
  const { dispatch } = useContext(IssueContext);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTitle && editedDescription) {
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: { ...issue, title: editedTitle, description: editedDescription }
      });
      toggleEditing(false);
      setError('');
    } else {
      setError('Title and description cannot be empty');
    }
  };

  const handleCancel = () => {
    toggleEditing(false);
    setEditedTitle(issue.title);
    setEditedDescription(issue.description);
  };

  return (
    <div>
      <form>
        <label>
          Title
          <input
            className={styles.input}
            key="title-input"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            className={styles.textarea}
            type="text"
            key="description-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </label>
        {error && <p className={styles.error} aria-label="Error message">{error}</p>}
        <button onClick={handleSubmit} className={styles.button}>
          <FontAwesomeIcon icon={faFloppyDisk} style={{ fontSize: '1.5em' }} />
        </button>
        <button onClick={handleCancel} className={styles.button}>
          Cancel
        </button>
      </form>
    </div>
  );
};

EditIssue.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    addDate: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'pending', 'complete']).isRequired,
    pendingDate: PropTypes.string,
    completeDate: PropTypes.string,
    countDownTime: PropTypes.number
  }).isRequired,
  toggleEditing: PropTypes.func.isRequired
};

export default EditIssue;
