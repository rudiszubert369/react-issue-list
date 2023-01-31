import { useContext, Fragment } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';
import './IssueList.css'


const IssueList = () => {
  const { issues } = useContext(IssueContext);
  const statuses = ['open', 'pending', 'complete'];

  return (
    <Fragment>
      {statuses.map(status => (
        <div className={`${status}-issues`}>
          <p>{status}</p>
          {issues.filter(issue => issue.status === status).map(issue => (
            <Issue key={issue.id} {...issue} />
          ))}
        </div>
      ))}
    </Fragment>
  );
};

export default IssueList;
