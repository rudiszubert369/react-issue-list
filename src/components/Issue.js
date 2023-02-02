import { useState, useContext } from 'react';
import IssueContext from './IssueContext';
import Timer from './Timer';
import { animated, useSpring } from 'react-spring'
import styles from './Issue.module.scss';


const Issue = ( issue ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(issue.title);
  const [editedDescription, setEditedDescription] = useState(issue.description);


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
    let newStatus = issue.status === "open" ? 'pending' : 'complete';
    dispatch({
      type: 'UPDATE_ISSUE',
      payload: {
        ...issue,
        status: newStatus,
        ...(newStatus === 'pending' ? { pendingDate: getDate() } : {}),
        ...(newStatus === 'complete' ? { completeDate: getDate() } : {})
      }
    });
  };

  function getDate() {
    const date = new Date();
    return date.toString();
  }

  const calcCountdownMinutes  = ()  => {
    return  (issue.daysRemaining || 0) * 1440 + (issue.hoursRemaining || 0) * 60 + (issue.minutesRemaining || 0);
  }

  const convertDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/\//g, '-');
  };

  return (
    <animated.div className={styles.issue}  style={{ ...fade, ...(isEditing ? transition : {}), ...colorChange }}>
      {isEditing ? (
        <>
         <div className={styles.editInput}>
            <form>
              <label>
                Title
                <input
                  key="title-input"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </label>
              <label>
                Description
                <textarea
                  type="text"
                  key="description-input"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3>{issue.title}</h3>
            <p className={styles.date}>{convertDate(issue.startDate)}</p>
            <p className={styles.description}>{issue.description}</p>
              <Timer
                startDate={issue.pendingDate}
                completedDate={issue.completeDate}
                countDownTime={calcCountdownMinutes()}
              />
            {issue.status === 'complete' ? null : (
              <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleStatusChange}>
                {issue.status === 'open' ? 'Move to Pending' : 'Mark as Complete'}
              </button>
              </>
            )}
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </animated.div>
    );
};

export default Issue;
