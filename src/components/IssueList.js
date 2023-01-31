import { useContext } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';
import styles from './IssueList.module.css'


const IssueList = () => {
  const { issues } = useContext(IssueContext);
  const statuses = ['open', 'pending', 'complete'];

  return (
    <div>
      {statuses.map(status => (
        <div className={styles[`${status}-issues`]}>
          <p>{status}</p>
          {issues.filter(issue => issue.status === status).map(issue => (
            <Issue key={issue.id} {...issue} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default IssueList;
