import React, { useContext } from 'react';
import IssueContext from './IssueContext';

const Issue = ({ id, title, description }) => {
  const { dispatch } = useContext(IssueContext);

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ISSUE', payload: id });
  };

  const handleEdit = () => {
    dispatch({ type: 'SET_CURRENT_ISSUE', payload: id });
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Issue;