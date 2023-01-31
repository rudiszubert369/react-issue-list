import './Issue.css';
import { Fragment, useState, useContext } from 'react';
import IssueContext from './IssueContext';
import ElapsedTime from './ElapsedTime';
import { animated, useSpring } from 'react-spring'


const Issue = ( issue ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(issue.title);
  const [editedDescription, setEditedDescription] = useState(issue.description);
  // const [fade, setFade] = useSpring(() => ({ opacity: 1 }));


  const { dispatch } = useContext(IssueContext);

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
    if (newStatus === 'pending') {
        const date = new Date();
        const dateString = date.toString()
        dispatch({ type:'UPDATE_ISSUE',  payload: {...issue, status: newStatus, pendingDate: dateString } });
    } else {
        dispatch({ type:'UPDATE_ISSUE',  payload: {...issue, status: newStatus } });
    }
  };

  return (
    <animated.div className="issue" style={fade} >
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
          {issue.status !== 'open' ? <ElapsedTime startDate={issue.pendingDate} isCounting={issue.status === 'pending'} />  : null}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleStatusChange}>change status ad change the name of the fucking button</button>
          <button onClick={handleDelete}>Delete</button>
        </Fragment>
      )}
    </animated.div>
    );
};

export default Issue;
