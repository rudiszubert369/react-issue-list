import { useState, useContext } from 'react';
import IssueContext from './IssueContext';
import Timer from './Timer';
import { animated, useSpring } from 'react-spring'
import styles from './Issue.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCheck, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';



const Issue = ( issue ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(issue.title);
  const [editedDescription, setEditedDescription] = useState(issue.description);
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(IssueContext);

  const transition = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' },
    config: { duration: 500 },
  });

  //set up colors and transition colors for issue statuses
  const colorChange = useSpring({
    from: { backgroundColor: issue.status === 'open' ? 'gray' : (issue.status === 'pending' ? '#20aa20' : 'f50000') },
    to: { backgroundColor: issue.status === 'open' ? '#20aa20' : (issue.status === 'pending' ? '#dd1a1a' : 'gray') },
    config: { duration: 500 },
  });

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_ISSUE', payload: {...issue, title: editedTitle, description: editedDescription} })
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(issue.title);
    setEditedDescription(issue.description);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ISSUE', payload: issue.id });
  };

  const handleStatusChange = () => {
    const date = new Date().toString();
    const newStatus = issue.status === "open" ? 'pending' : 'complete';
    const updatedFields = { ...issue, status: newStatus };

    if (newStatus === 'pending') {
      updatedFields.pendingDate = date;
    } else if (newStatus === 'complete') {
      updatedFields.completeDate = date;
    }

    dispatch({
      type: 'UPDATE_ISSUE',
      payload: updatedFields
    });
  };

  const convertToMinutes  = ()  => {//converts countdown days, hours and minutes to minutes
    return  (issue.daysRemaining || 0) * 1440 + (issue.hoursRemaining || 0) * 60 + (issue.minutesRemaining || 0);
  }

  const convertDate = dateString => {//converts date to displayable format
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/\//g, '-');
  };

  const renderStatusBtn = () => ( //renders button to change issue status
      <button onClick={handleStatusChange} className={styles.changeStatusBtn}>
        {issue.status === 'open' ? 'Move to Pending' : 'Mark as Complete'}
        <FontAwesomeIcon
          icon={faCheck}
          style={{ fontSize: "1.5em" }}
        />
      </button>
  )

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className={styles.editInput}>
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
            <button onClick={handleSave}>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ fontSize: "1.5em" }}
              />
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      );
    }

    return isActive ? (
      <div className={styles.expanded}>
        <p className={styles.date}>Date added: {convertDate(issue.startDate)}</p>
        <h3>{issue.title}</h3>
        <p className={styles.description}>{issue.description}</p>
        <div className={styles.buttonWrapper}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "1.5em" }}
            />
          </button>
        </div>
        <Timer
          startDate={issue.pendingDate}
          completedDate={issue.completeDate}
          countDownTime={convertToMinutes()}
        />
        {issue.status !== 'complete' ? renderStatusBtn() : null}
        <button onClick={e => setIsActive(false)} className={styles.buttonSecondary}>
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{ fontSize: "1.5em" }}
          />
        </button>
      </div>
    ) : (
      <div className={styles.compressed}>
        <h3>{issue.title}</h3>
        {issue.status !== 'complete' ? renderStatusBtn() : null}
        <button onClick={e => setIsActive(true)}>
          <FontAwesomeIcon
            icon={faArrowDown}
            style={{ fontSize: "1.5em" }}
          />
        </button>
      </div>
    );
  };

  return (
    <animated.div className={styles.issue} style={{ ...fade, ...(isEditing ? transition : {}), ...colorChange }}>
      {renderContent()}
    </animated.div>
  );
};

export default Issue;
