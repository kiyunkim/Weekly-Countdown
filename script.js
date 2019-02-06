
function countdown(o) {
  // countdown date
  var day,
      hour,
      minute,
      second;

  // current date
  var currentTime,
      currentDay,
      currentHour,
      currentMinute,
      currentSecond,
      year,
      month,
      date;

  var interval;

  var $days = document.querySelector(o.$days),
      $hours = document.querySelector(o.$hours),
      $minutes = document.querySelector(o.$minutes),
      $seconds = document.querySelector(o.$seconds),
      $loading = document.querySelector(o.$loading);
  
  function getValue(unit) {
    // get number value for a unit
    return parseInt(document.querySelector(unit).value);
  }

  function updateHTML(el, val) {
    el.innerHTML = val;
  }
  // make number into 2 digits
  function doubleDigits(number) {
    if (number < 10) {
      return '0' + number;
    }
      return number;
  }


  function loop(){
    day = getValue(o.day);
    hour = getValue(o.hour);
    minute = getValue(o.minute);
    second = getValue(o.second);

    currentTime = new Date().getTime();
    currentDay = new Date().getDay();
    currentHour = new Date().getHours();
    currentMinute = new Date().getMinutes();
    currentSecond = new Date().getSeconds();

    year = new Date().getFullYear();
    month = new Date().getMonth();
    date = new Date().getDate();
    
    var daysLeft,
        hoursLeft,
        minutesLeft,
        secondsLeft;

    var diff = day - currentDay;

    // for same day - is it today or next week?
    if (diff < 0) {
      daysLeft = 7 + diff;
    } else if (diff > 0) {
      daysLeft = diff;
    } else if (diff === 0) {
      if (currentHour > hour) {
        daysLeft = 7;
      } else if (currentHour < hour) {
        daysLeft = 0;
      } else if (currentHour === hour) {
        if (currentMinute < minute) {
          daysLeft = 0;
        } else if (currentMinute > minute) {
          daysLeft = 7;
        } else if (currentMinute === minute) {
          if (currentSecond < second) {
            daysLeft = 0;
          } else if (currentSecond > second) {
            daysLeft = 7;
          } else if (currentSecond === second) {
            daysLeft = 0;
          }
        }
      }
    }
    
    var totalTime = new Date(year, month, (date+daysLeft), hour, minute, second).getTime();
    var msTil = totalTime - currentTime;
    var timeTil = Math.round(msTil/1000)*1000;

    // calculate ms into readable values
    daysLeft = doubleDigits(Math.floor(timeTil/(86400000))); // 24 * 60 * 60 * 1000
    hoursLeft = doubleDigits(Math.floor((timeTil-(daysLeft*86400000)) / 3600000)); // 60 * 60 * 1000
    minutesLeft = doubleDigits(Math.floor((timeTil-(daysLeft*86400000)-(hoursLeft*3600000)) / 60000)); // 60 * 1000
    secondsLeft = doubleDigits(Math.floor((timeTil-(daysLeft*86400000)-(hoursLeft*3600000)-(minutesLeft*60000)) / 1000));

    updateHTML($loading, '');
    document.querySelector(o.$timer).style.display = '';

    updateHTML($days, daysLeft);
    updateHTML($hours, hoursLeft);
    updateHTML($minutes, minutesLeft);
    updateHTML($seconds, secondsLeft);

    // reset once it gets to 0
    if (timeTil === 0) {
      endInterval();
      runCountdown();
    }
  }

  function endInterval() {
    clearInterval(interval);
  }

  function runCountdown() {
    interval = setInterval(function() {
      loop();
    }, 1000);
  }

  return runCountdown();
}

countdown({
  day: '.day option:checked',
  hour: '.hour option:checked',
  minute: '.minute option:checked',
  second: '.second option:checked',
  $timer: '.time-left',
  $days: '.days-left',
  $hours: '.hours-left',
  $minutes: '.minutes-left',
  $seconds: '.seconds-left',
  $loading: '.loading-message'
});