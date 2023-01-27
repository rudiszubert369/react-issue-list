import { Fragment, useState, useContext } from 'react';
import IssueContext from './IssueContext';
import ElapsedTime from './ElapsedTime';

const Issue = ({ id, title, description, status, date }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const { dispatch, issues } = useContext(IssueContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    
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
    const issue = issues.find(issue => issue.id === id);
    let newStatus = issue.status === "open" ? 'pending' : 'complete';
    dispatch({ type:'UPDATE_ISSUE',  payload: {...issue, status: newStatus} });
  };

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
          <p>{date}</p>
          <p>{description}</p>
          <p>{status}</p>
          {status !== 'open' ? <ElapsedTime startDate={date} isCounting={status === 'pending'} />  : null}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleStatusChange}>Change status</button>
          <button onClick={handleDelete}>Delete</button>
        </Fragment>
      )}
    </div>
  );
};


export default Issue;