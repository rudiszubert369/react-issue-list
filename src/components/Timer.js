import { useState, useEffect } from 'react';

function Timer({ startDate, completedDate, countDownTime }) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });//TODO same formatting?

  useEffect(() => {
    let intervalId = null;
    let intervalId2 = null;

    const computeElapsedTime = () => {
      const start = new Date(startDate);
      const elapsed = completedDate ? new Date(completedDate) - start : new Date() - start;
      const elapsedSeconds = elapsed / 1000;
      const elapsedMinutes = elapsedSeconds / 60;
      const elapsedHours = elapsedMinutes / 60;

      let hours = Math.floor(elapsedHours) % 24;
      let minutes = Math.floor(elapsedMinutes) % 60;
      let seconds = Math.floor(elapsedSeconds) % 60;
      let days = Math.floor(elapsedHours / 24);

      return days > 0
        ? `${days} days ${hours}:${minutes}:${seconds}`
        : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const computeTimeLeft = () => {
      if (!startDate) {
        const days = Math.floor(countDownTime / (60 * 24));
        const hours = Math.floor((countDownTime % (60 * 24)) / 60);
        const minutes = countDownTime % 60;

        return {
          days,
          hours,
          minutes,
          seconds: 0,
        };
      }

      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const remainingTime = start + countDownTime * 60 * 1000 - now;

      if (remainingTime < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
      };
    };

    if (countDownTime) {
      setTimeLeft(computeTimeLeft())
    }

    setElapsedTime(computeElapsedTime());


    if (startDate) {
      intervalId = setInterval(() => setElapsedTime(computeElapsedTime()), 1000);
    }

    if (countDownTime && startDate ) {
      intervalId2 = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    }


    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [startDate, completedDate, countDownTime]);


  const elapsedMessage = `${!completedDate ? "Elapsed time" : "Total time"} : ${elapsedTime}`;

  return <div>
    {startDate ? elapsedMessage : null}
    {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds

    </div>;
}

export default Timer;
