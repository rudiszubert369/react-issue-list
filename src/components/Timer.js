import { useState, useEffect } from 'react';

// import { useState, useEffect } from 'react';

function Timer({ startDate, completedDate, countDownTime }) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let intervalId = null;
    const start = new Date(startDate);

    const computeTime = (startTime, endTime) => {
      const elapsed = endTime ? new Date(endTime) - startTime : new Date() - startTime;
      const elapsedSeconds = elapsed / 1000;
      const elapsedMinutes = elapsedSeconds / 60;
      const elapsedHours = elapsedMinutes / 60;

      let hours = Math.floor(elapsedHours) % 24;
      let minutes = Math.floor(elapsedMinutes) % 60;
      let seconds = Math.floor(elapsedSeconds) % 60;
      let days = Math.floor(elapsedHours/24);

      return days > 0
        ? `${days} days ${hours}:${minutes}:${seconds}`
        : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const computeRemainingTime = () => {
      let { days = 0, hours = 0, minutes = 0 } = countDownTime || {};
      hours = hours + 24 * days;
      minutes = minutes + 60 * hours;
      const remainingSeconds = minutes * 60;
      let remaining = start - new Date() + remainingSeconds * 1000;
      intervalId = setInterval(() => {
        remaining -= 1000;
        if (remaining <= 0) {
          clearInterval(intervalId);
        } else {
          const remainingSecondsFormatted = Math.floor(remaining / 1000) % 60;
          const remainingMinutesFormatted = Math.floor(remaining / (60 * 1000)) % 60;
          const remainingHoursFormatted = Math.floor(remaining / (60 * 60 * 1000)) % 24;
          setRemainingTime(
            `${String(remainingHoursFormatted).padStart(2, '0')}:${String(
              remainingMinutesFormatted
            ).padStart(2, '0')}:${String(remainingSecondsFormatted).padStart(2, '0')}`
          );
        }
      }, 1000);
    };

    if (countDownTime) {
      computeRemainingTime();
    }
    setElapsedTime(computeTime(start, completedDate));
    if (!completedDate) {
      intervalId = setInterval(() => setElapsedTime(computeTime(start, completedDate)), 1000);
    }
    return () => clearInterval(intervalId);
  }, [startDate, completedDate, countDownTime]);

  const elapsedMessage = `${!completedDate ? 'Elapsed time' : 'Total time'} : ${elapsedTime}`;


  return <div>
    {`ss` + remainingTime}
    {startDate ? elapsedMessage : null}
    </div>;
}

export default Timer;
