import React, { useContext } from 'react';
import IssueContext from './IssueContext';
import Issue from './Issue';

const IssueList = () => {
  const { issues } = useContext(IssueContext);

  return (
    <div>
      {issues.map(issue => (
        <Issue key={issue.id} {...issue} />
      ))}
    </div>
  );
};

export default IssueList;