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
    let intervalId;
    let intervalId2;

    const computeElapsedTime = () => {//calculates time from moving issue into pending
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

    const computeTimeLeft = () => {//calculates time left between issue moved to pending date and time goal
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

      if (remainingTime <= 0) {
        clearInterval(intervalId2);
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
      setTimeLeft(computeTimeLeft());
    }

    //start to measure elapsed time if issue is in pending
    if (startDate) {
      intervalId = setInterval(() => setElapsedTime(computeElapsedTime()), 1000);
    }

    //Start the countdown only if the countdown is specified and issue is in pending
    if (countDownTime && startDate && !completedDate) {
      intervalId2 = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [startDate, completedDate, countDownTime]);

  const renderTime = (time) => {
    const daysStr = time.days > 0 ? `${time.days}d ` : '';
    const hoursStr = time.hours > 0 ? `${time.hours}h ` : '';
    const minutesStr = time.minutes > 0 ? `${time.minutes}m ` : '';
    const secondsStr = time.seconds !== 0 ? `${time.seconds}s` : '';

    return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`;
  };

  const renderCountdown = () => {
    if (!startDate) {
      return <p>Time goal: {renderTime(timeLeft)}</p>
    }

    if (startDate && !completedDate) {
      return <p>Time remaining: {renderTime(timeLeft)}</p>
    }

    if (completedDate) {
      return <p>You have {timeLeft ? 'made it in time, congratulations!' : 'not made it in time. Plan better next time.'}</p>
    }
  }

  const renderElapsedTime = () => {
    return completedDate ? <p>You have done it in: {renderTime(elapsedTime)}</p> :  <p>Time elapsed: {renderTime(elapsedTime)}</p>
  }

  return (
    <div>
    { countDownTime ? renderCountdown() : null }
    { startDate ? renderElapsedTime() : null}
    </div>
  );
}

export default Timer;
