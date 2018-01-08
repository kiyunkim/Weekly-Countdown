var countdown = (function() {
  var self = this,
      proto = countdown.prototype,

      weekdays,
      weekday,

      currentDate = new Date(),
      currentDayi = currentDate.getDay(), // get index for day of week
      currentHour = currentDate.getHours(), // get current hour
      currentMs = currentDate.getTime(), // ms from 1970 to now
      daysTil, // days until next selected weekday
      msTil, // ms til next selected weekday from now
      totalmsTil, // ms from 1970 to next selected weekday 
      newDate,
      newHour,
      setTime, // next selected weekday what time ?
      ms, // re-calc ms til next selected weekday with adjusted time
      days,
      hours,
      minutes,
      seconds,
      colon = ' : ';
      

    function getTimes(day, newHour) {
      currentDate = new Date()
      weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      weekday = weekdays.indexOf(day.toLowerCase());

      if (currentDayi > weekday) {
        daysTil = 8-currentDayi; } 
      else if (currentDayi < weekday ) { 
        daysTil = weekday-currentDayi; }
      else if (currentDayi = weekday ) {
        // if today is weekday ..
        // get the current hour and compare to new hour
        if ( currentHour > newHour) {
          daysTil = 7;
        }
        else {
          daysTil = 0;
        }
      }

      msTil = (daysTil * 24 * 60 * 60 * 1000); 
      totalmsTil = currentMs + msTil;

      newDate = new Date(totalmsTil);
      setTime = newDate.setHours(newHour,0,0,0);
      ms = newDate - currentDate; 
      days = Math.floor(ms/(86400000)); // 24 * 60 * 60 * 1000
      hours = Math.floor((ms-(days*86400000)) / 3600000);  // 60 * 60 * 1000
      minutes = Math.floor((ms-(days*86400000)-(hours*3600000)) / 60000); // 60 * 1000
      seconds = Math.floor((ms-(days*86400000)-(hours*3600000)-(minutes*60000)) / 1000);

      // find out a cleaner way to do the below: 
      if (days.toString().length < 2 ) { 
        days = '0' + days;
      }
      if (hours.toString().length < 2 ) { 
        hours = '0' + hours;
      }
      if (minutes.toString().length < 2 ) { 
        minutes = '0' + minutes;
      }
      if (seconds.toString().length < 2 ) { 
        seconds = '0' + seconds;
      }

      return days+colon+hours+colon+minutes+colon+seconds;
    }

    function countdowntimer(weekday, newHour, selector) {
      $(selector).html(getTimes(weekday, newHour)); 
    }

    proto.setup = function(weekday, newHour, selector) {
      var x = setInterval(function(){countdowntimer(weekday, newHour, selector)}, 1000)
    }


  return {
    setup: self.setup
  };
});

$(document).ready(function() {
  var countdownTimer = new countdown();
  countdownTimer.setup('Monday', 10, '.k_timer'); // weekday to countdown to, hour to coutdown to (0-23), css selector for timer
});