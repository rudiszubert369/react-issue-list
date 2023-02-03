import { useState, useContext } from 'react';
import IssueContext from './IssueContext';
import styles from './EditIssue.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';


const EditIssue = ( {issue, onStopEditing} ) => {
  const [editedTitle, setEditedTitle] = useState(issue.title);
  const [editedDescription, setEditedDescription] = useState(issue.description);
  const { dispatch } = useContext(IssueContext);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_ISSUE', payload: {...issue, title: editedTitle, description: editedDescription} })
    onStopEditing(false);
  };

  const handleCancel = () => {
    onStopEditing(false);
    setEditedTitle(issue.title);
    setEditedDescription(issue.description);
  };

  return (
        <div >
          <form>
            <label>
              Title
              <input
                className={styles.input}
                key="title-input"
                type="text"
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                className={styles.textarea}
                type="text"
                key="description-input"
                value={editedDescription}
                onChange={e => setEditedDescription(e.target.value)}
              />
            </label>
            <button onClick={handleSave} className={styles.button}>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ fontSize: "1.5em" }}
              />
            </button>
            <button onClick={handleCancel} className={styles.button}>Cancel</button>
          </form>
        </div>
  )
}

export default EditIssue;
