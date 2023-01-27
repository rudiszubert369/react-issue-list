import { Fragment, useState, useContext } from 'react';
import IssueContext from './IssueContext';
import ElapsedTime from './ElapsedTime';

const Issue = ({ id, title, description, status, addDate, pendingDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const { dispatch, issues } = useContext(IssueContext);
  const issue = issues.find(issue => issue.id === id);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const issue = issues.find(issue => issue.id === id);
    dispatch({ type: 'UPDATE_ISSUE', payload: {...issue, title: editedTitle, description: editedDescription} })
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ISSUE', payload: id });
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

  const statusButtonText = () => {
    switch (issue.status) {
        case 'open':
        return 'Move to pending';
        case 'pending':
        return 'Mark as complete'
        case 'complete':
        return 'Completed'
        default:
        return 'Complete'
    }
  }
  console.log(statusButtonText())

  return (
    <div>
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
          <h3>{title}</h3>
          <p>{addDate}</p>
          <p>{description}</p>
          <p>{status}</p>
          {status !== 'open' ? <ElapsedTime startDate={pendingDate} isCounting={status === 'pending'} />  : null}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleStatusChange}>{statusButtonText()}</button>
          <button onClick={handleDelete}>Delete</button>
        </Fragment>
      )}
    </div>
  );
};


export default Issue;