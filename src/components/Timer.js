import { useState, useEffect } from 'react';



const Timer = ({ startDate, completedDate, countDownTime }) => {
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

      return {
        days,
        hours,
        minutes,
        seconds
      };
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

      return {
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
      };
    };

    if (countDownTime) {
      setTimeLeft(computeTimeLeft());
    }

    if (startDate) {
      intervalId = setInterval(() => setElapsedTime(computeElapsedTime()), 1000);
    }

    if (countDownTime && startDate && !completedDate) {
      intervalId2 = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [startDate, completedDate, countDownTime]);

  const renderTime = (time, text) => {
    return `${time.days > 0 ? `${time.days}d ` : ''}${time.hours > 0 ? `${time.hours}h ` : ''}${time.minutes > 0 ? `${time.minutes}m ` : ''}${time.seconds}s ${text}`;
  };

  return (
    <div style={{ color: timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds < 0 ? 'blue' : 'inherit' }}>
      {
        !startDate
          ? `Time goal: ${renderTime(timeLeft)}`
          : completedDate
            ? `You have done it in: ${renderTime(elapsedTime, '')}. You are: ${renderTime(timeLeft, 'from your goal.')} ${timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds >= 0 ? 'Congratulations!' : 'Work better next time.'}`
            : `Time remaining: ${renderTime(timeLeft, '')}. Time elapsed: ${renderTime(elapsedTime, '')}`
      }
    </div>
  );
}

export default Timer;

//TODO case when no time goal is set
