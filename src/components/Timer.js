import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Timer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Timer = ({ pendingDate, completedDate, countDownTime, status }) => {
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

    //calculates time from setting issue status to pending
    const computeElapsedTime = () => {
      const start = new Date(pendingDate);
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

    //calculates time left between issue moved to pending date and time goal
    const computeTimeLeft = () => {
      if (!pendingDate) {
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

      const start = new Date(pendingDate).getTime();
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

    //initial display of countdown time
    if (countDownTime) {
      setTimeLeft(computeTimeLeft());
    }

    if ( status !== 'open') {
      intervalId = setInterval(() => setElapsedTime(computeElapsedTime()), 1000);//starts to measure elapsed time

      if (countDownTime) {
        intervalId2 = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);//starts countdown
      }
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [pendingDate, completedDate, countDownTime, status]);

  //converts time object into readable string
  const renderTime = (time) => {
    const daysStr = time.days > 0 ? `${time.days}d ` : '';
    const hoursStr = time.hours > 0 ? `${time.hours}h ` : '';
    const minutesStr = time.minutes > 0 ? `${time.minutes}m ` : '';
    const secondsStr = time.seconds !== 0 ? `${time.seconds}s` : '';

    return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`;
  };

  const renderCountdownMsg = () => {
    if (countDownTime) {
      switch (status) {
        case 'open':
          return <p>Time goal: {renderTime(timeLeft)}</p>
        case 'pending':
           return <p>Time remaining: {renderTime(timeLeft)}</p>
        case 'complete':
          return <p><b>You have {timeLeft ? 'made it in time, congratulations!' : 'not made it in time. Plan better next time.'}</b></p>
        default:
          return null;
      }
    }
  }

  const renderElapsedTimeMsg = () => {
    if (status !== 'open') {
      console.log(elapsedTime)
      return status === 'complete' ? <p>You have done it in: {renderTime(elapsedTime)}</p> : <p>Time elapsed: {renderTime(elapsedTime)}</p>
    }
  };

  const icon = countDownTime || status !== 'open' ? <FontAwesomeIcon icon={ faClock } style={{ fontSize: "1.5em" }} /> : null

  return (
    <div className={styles.timer}>
      { renderCountdownMsg() }
      { icon }
      { renderElapsedTimeMsg() }
    </div>
  );
}

Timer.propTypes = {
  pendingDate: PropTypes.string,
  completedDate: PropTypes.string,
  countDownTime: PropTypes.number,
  status: PropTypes.oneOf(['open', 'pending', 'complete']).isRequired
};

export default Timer;
