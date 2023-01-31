import React, { useState } from 'react';
import { useContext } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';
import styles from './IssueList.module.scss'

const IssueList = () => {
  const { issues } = useContext(IssueContext);
  const statuses = ['open', 'pending', 'complete'];
  // const [sortBy, setSortBy] = useState('addDate');
  const [sortBy, setSortBy] = useState({ open: 'addDate', pending: 'addDate', complete: 'addDate' });

  return (
    <div>
    {statuses.map(status => {
      const filteredIssues = issues.filter(issue => issue.status === status);
      const sortedIssues = [...filteredIssues].sort((a, b) => {
        if (sortBy[status] === 'addDate') {
          return new Date(a.addDate) - new Date(b.addDate);
        } else if (sortBy[status] === 'title') {
          return a.title.localeCompare(b.title);
        }
      });

      return (
        <div className={styles[`${status}-issues`]}>
          <div className={styles.sortBy}>
            <p>Sort By:</p>
            <select value={sortBy[status]} onChange={e => setSortBy({ ...sortBy, [status]: e.target.value })}>
              <option value="addDate">Start Date</option>
              <option value="title">Name</option>
            </select>
          </div>
          <p>{status}</p>
          {sortedIssues.map(issue => (
            <Issue key={issue.id} {...issue} />
          ))}
        </div>
      );
    })}
  </div>
);
};

export default IssueList;
