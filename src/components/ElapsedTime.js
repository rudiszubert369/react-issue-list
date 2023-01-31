import { useState, useEffect } from 'react';

function ElapsedTime(props) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    let intervalId = null;
    const startDate = new Date(props.startDate);
    const computeElapsedTime = () => {
      const currentTime = new Date();
      const elapsed = props.completedDate ? new Date(props.completedDate) - startDate : currentTime - startDate;
      const elapsedSeconds = elapsed / 1000;
      const elapsedMinutes = elapsedSeconds / 60;
      const elapsedHours = elapsedMinutes / 60;

      let hours = Math.floor(elapsedHours) % 24;
      let minutes = Math.floor(elapsedMinutes) % 60;
      let seconds = Math.floor(elapsedSeconds) % 60;
      let days = Math.floor(elapsedHours/24);

      if (days > 0) {
        setElapsedTime(`${days} days ${hours}:${minutes}:${seconds}`);
      } else {
        setElapsedTime( `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };
    computeElapsedTime();
    if (!props.completedDate) {
      intervalId = setInterval(computeElapsedTime, 1000);
    }
    return () => clearInterval(intervalId);
  }, [props.startDate, props.completedDate]);

  return <div>{!props.completedDate ? 'Elapsed time' : 'Total time'}: {elapsedTime}</div>;
}

export default ElapsedTime;
