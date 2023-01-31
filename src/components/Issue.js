import './Issue.css';
import { Fragment, useState, useContext } from 'react';
import IssueContext from './IssueContext';
import ElapsedTime from './ElapsedTime';
import { animated, useSpring, useTransition } from 'react-spring'


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

  // const transitions = useTransition(issue, item => item.id, {
  //   from: { opacity: 1, transform: 'translate3d(0,40px,0)' },
  //   enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  //   leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  // });

  const colorChange = useSpring({
    from: { backgroundColor: issue.status === 'open' ? 'green' : 'orange' },
    to: { backgroundColor: issue.status === 'pending' ? 'orange' : 'red' },
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

  return (
    <animated.div className="issue"  style={{ ...fade, ...(isEditing ? transition : {}), ...colorChange }} >
      {isEditing ? (
        <Fragment>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </Fragment>
      ) : (
        <Fragment>
          <h3>{issue.title}</h3>
          <p>{issue.addDate}</p>
          <p>{issue.description}</p>
          <p>{issue.status}</p>
          {issue.status !== 'open' ? (
            <ElapsedTime
              startDate={issue.pendingDate}
              completedDate={issue.completeDate ?  issue.completeDate : null}
            />
          ) : null}
          <button onClick={handleEdit}>Edit</button>
          {issue.status === 'complete' ? null : (
            <button onClick={handleStatusChange}>
              {issue.status === 'open' ? 'Move to Pending' : 'Mark as Complete'}
            </button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </Fragment>
      )}
    </animated.div>
    );
};

export default Issue;
