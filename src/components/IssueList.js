import { useState, useContext } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';
import styles from './IssueList.module.scss';

const IssueList = () => {
  const { issues } = useContext(IssueContext);

  //initial sorting property for each column
  const [sortBy, setSortBy] = useState({
    open: 'newest',
    pending: 'newest',
    complete: 'newest',
  });
  const columns = ['open', 'pending', 'complete'];

  const sortIssues = (issues, sortBy) => {
    return [...issues].sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.addDate) - new Date(b.addDate);
      } else if (sortBy === 'newest') {
        return new Date(b.addDate) - new Date(a.addDate);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return issues
    });
  };

  return (//creates a list for each statues array element
    <div className={styles.wrapper} id="scrollTarget">
      {columns.map(status => {
        const filteredIssues = issues.filter(issue => issue.status === status);
        const sortedIssues = sortIssues(filteredIssues, sortBy[status]);

        return (
          <div className={styles[`${status}-issues`]} key={status}>
            <h4>{status} ({filteredIssues.length})</h4>
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
