import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import IssueContext from './IssueContext';
import Timer from './Timer';
import EditIssue from './EditIssue';
import { animated, useSpring } from 'react-spring'
import styles from './Issue.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const Issue = ( issue ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(IssueContext);

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

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ISSUE', payload: issue.id });
  };

  //Updates issue if status change button clicked
  const handleStatusChange = () => {
    const date = new Date().toString();
    const newStatus = issue.status === "open" ? 'pending' : 'complete';
    const updatedFields = { ...issue, status: newStatus };

    //adds pending/complete date property depending on the new issue status
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

  //converts date to displayable format
  const convertDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/\//g, '-');
  };

  //renders button to change issue status
  const renderStatusBtn = () => (
      <button onClick={handleStatusChange} className={`${styles.changeStatusBtn} ${styles.button}`}>
        {issue.status === 'open' ? 'Move to Pending' : 'Mark as Complete'}
        <FontAwesomeIcon
          icon={faCheck}
          style={{ fontSize: "1.5em" }}
        />
      </button>
  );

  const renderContent = () => {
    if (isEditing) {
      return <EditIssue issue={issue} toggleEditing={setIsEditing} />
    }

    return (
      <div className={styles.issueContainer}>
        <p className={`${styles.date} ${styles.p}`}>Date added: {convertDate(issue.addDate)}</p>
        <h3>{issue.title}</h3>
        <div className={`${styles.content} ${isActive ? styles.contentExpanded : styles.contentCollapsed}`}>
          <p className={`${styles.description} ${styles.p}`}>{issue.description}</p>
          <div className={styles.buttonWrapper}>
            <button onClick={handleEdit} className={styles.button}>Edit</button>
            <button
              onClick={handleDelete}
              className={styles.button}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: "1.5em" }}
              />
            </button>
          </div>
          <Timer
            pendingDate={issue.pendingDate}
            completedDate={issue.completeDate}
            countDownTime={issue.countDownTime}
          />
        </div>
        {issue.status !== 'complete' ? renderStatusBtn() : null}
        <button onClick={ () => setIsActive(!isActive)}  className={styles.button}>
          <FontAwesomeIcon
            icon={isActive ? faArrowUp : faArrowDown}
            style={{ fontSize: "1.5em" }}
          />
        </button>
      </div>
    );
  };

  return (
    <animated.div className={styles.issue} style={{ ...fade, ...colorChange }}>
      {renderContent()}
    </animated.div>
  );
};

Issue.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    addDate: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'pending', 'complete']).isRequired,
    pendingDate: PropTypes.string,
    completeDate: PropTypes.string,
    countDownTime: PropTypes.number
  }).isRequired
};

export default Issue;
