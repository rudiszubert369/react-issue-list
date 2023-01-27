import React, { useContext } from 'react';
import IssueContext from './IssueContext';

const Issue = ({ id, title, description, date }) => {
  const { dispatch } = useContext(IssueContext);

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ISSUE', payload: id });
  };

  const handleEdit = () => {
  };

  const handleStatusChange = () => {
    dispatch({ type:'UPDATE_ISSUE',  payload: id})
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleStatusChange}>Change status</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Issue;