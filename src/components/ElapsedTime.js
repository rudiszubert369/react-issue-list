import { useState, useEffect } from 'react';

function ElapsedTime( props ) {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const startDate = new Date(props.startDate)
      const elapsed = currentTime - startDate;
      const elapsedSeconds = elapsed / 1000;
      const elapsedMinutes = elapsedSeconds / 60;
      const elapsedHours = elapsedMinutes / 60;

      let hours = Math.floor(elapsedHours) % 24;
      let minutes = Math.floor(elapsedMinutes) % 60;
      let seconds = Math.floor(elapsedSeconds) % 60;
      let days = Math.floor(elapsedHours/24);

      if(days>0) {
        setElapsedTime(`${days} days ${hours}:${minutes}:${seconds}`);
      } else {
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }

    }, 1000);
    return () => clearInterval(intervalId);
  });

  return <div>Elapsed Time: {elapsedTime}</div>;
}

export default ElapsedTime;