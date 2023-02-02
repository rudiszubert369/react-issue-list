import { useState } from 'react';
import { useContext } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';
import styles from './IssueList.module.scss';


const IssueList = () => {
  const { issues } = useContext(IssueContext);
  const statuses = ['open', 'pending', 'complete'];
  const [sortBy, setSortBy] = useState({
    open: 'oldest',
    pending: 'oldest',
    complete: 'oldest',
  });

  const sortIssues = (issues, sortBy) => {
    return [...issues].sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (sortBy === 'newest') {
        return new Date(b.startDate) - new Date(a.startDate);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return issues
    });
  };

  return (
    <div className={styles.wrapper} id="scrollTarget">
      {statuses.map(status => {
        const filteredIssues = issues.filter(issue => issue.status === status);
        const sortedIssues = sortIssues(filteredIssues, sortBy[status]);

        return (
          <div className={styles[`${status}-issues`]} key={status}>
            <h4>{status}</h4>
            <div className={styles.sortBy}>
              <p>Sort By:</p>
              <select
                value={sortBy[status]}
                onChange={e => setSortBy({ ...sortBy, [status]: e.target.value })}
              >
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
                <option value="title">Name</option>
              </select>
            </div>
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
