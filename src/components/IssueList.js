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

  return (
    <div className= { styles.wrapper }>
    {statuses.map(status => {
      const filteredIssues = issues.filter(issue => issue.status === status);
      const sortedIssues = [...filteredIssues].sort((a, b) => {
        if (sortBy[status] === 'oldest') {
          return new Date(a.startDate) - new Date(b.startDate);
        } else if (sortBy[status] === 'newest') {
          return new Date(b.startDate) - new Date(a.startDate);
        } else if (sortBy[status] === 'title') {
          return a.title.localeCompare(b.title);
        }
      });

      return (
        <div className={styles[`${status}-issues`]}>
          <div className={styles.sortBy}>
            <p>Sort By:</p>
            <select value={sortBy[status]} onChange={e => setSortBy({ ...sortBy, [status]: e.target.value })}>
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
              <option value="title">Title</option>
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
// import React, { useState } from 'react';
// import { useContext } from 'react';
// import IssueContext from './IssueContext';
// import Issue from './Issue';
// import styles from './IssueList.module.scss';

// const IssueList = () => {
//   const { issues } = useContext(IssueContext);
//   const statuses = ['open', 'pending', 'complete'];
//   const [sortBy, setSortBy] = useState({
//     open: 'addDate',
//     pending: 'addDate',
//     complete: 'addDate',
//   });

//   const sortIssues = (issues, sortBy) => {
//     return [...issues].sort((a, b) => {
//       if (sortBy === 'addDate') {
//         return new Date(a.addDate) - new Date(b.addDate);
//       } else if (sortBy === 'title') {
//         return a.title.localeCompare(b.title);
//       }
//     });
//   };

//   return (
//     <div>
//       {statuses.map(status => {
//         const filteredIssues = issues.filter(issue => issue.status === status);
//         const sortedIssues = sortIssues(filteredIssues, sortBy[status]);

//         return (
//           <div className={styles[`${status}-issues`]}>
//             <div className={styles.sortBy}>
//               <p>Sort By:</p>
//               <select
//                 value={sortBy[status]}
//                 onChange={e =>
//                   setSortBy({ ...sortBy, [status]: e.target.value })
//                 }
//               >
//                 <option value="addDate">Start Date</option>
//                 <option value="title">Name</option>
//               </select>
//             </div>
//             <p>{status}</p>
//             {sortedIssues.map(issue => (
//               <Issue key={issue.id} {...issue} />
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default IssueList;
