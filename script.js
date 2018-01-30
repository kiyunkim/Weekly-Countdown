var countdown = (function() {
  var self = this,
      proto = countdown.prototype,

      weekdays,
      weekday,

      currentDate = new Date(),
      currentDayi = currentDate.getDay(), // index for current day of week (0-6)
      currentHour = currentDate.getHours(), // current hour (0-23)
      currentMs = currentDate.getTime(), // # of ms from 1970 to current date

      newDate, // new weekday
      newHour, // new hour
      newHour24,

      daysTil, // # of days until new weekday
      msTil, // # of ms from current date to new weekday
      totalmsTil, // ms from 1970 to new weekday 

      ms, // re-calc ms til new weekday with adjusted time

      days,
      hours,
      minutes,
      seconds,
      colon = ' : ';
      
    // covert into 2 digits
    function doubleDigitNum(varUnit) {
      if (varUnit.toString().length < 2) {
        return '0' + varUnit;
      } else {
        return varUnit;
      }
    }

    function getCountdownNum(day, newHour) {
      currentDate = new Date(),
      weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      weekday = weekdays.indexOf(day.toLowerCase());

      // how many days til the new weekday?
      if (currentDayi > weekday) {
        daysTil = 8-currentDayi; 
      } 
      else if (currentDayi < weekday ) { 
        daysTil = weekday-currentDayi;
      }
      else if (currentDayi = weekday ) {
        // if today is the same as the new weekday
        if ( currentHour >= newHour) { // did it pass?
          daysTil = 7;
        }
        else {
          daysTil = 0;
        }
      }

      // get ms from 1970 to new date
      msTil = (daysTil * 24 * 60 * 60 * 1000); 
      totalmsTil = currentMs + msTil;

      // calc new date from ms
      newDate = new Date(totalmsTil);
      // then set it to the new hour
      newDate.setHours(newHour,0,0,0);
      // get # of ms between those dates
      ms = newDate - currentDate; 
      console.log(newDate)
      console.log(currentDate)
      console.log(ms)

      // calculate ms into readable values
      days = doubleDigitNum(Math.floor(ms/(86400000))); // 24 * 60 * 60 * 1000
      hours = doubleDigitNum(Math.floor((ms-(days*86400000)) / 3600000)); // 60 * 60 * 1000
      minutes = doubleDigitNum(Math.floor((ms-(days*86400000)-(hours*3600000)) / 60000)); // 60 * 1000
      seconds = doubleDigitNum(Math.floor((ms-(days*86400000)-(hours*3600000)-(minutes*60000)) / 1000));
      
      return days+colon+hours+colon+minutes+colon+seconds;
    }

    function convertTo12Hour(hour) {
      if (hour == 0) { // midnight
          return 12 + ' am';
        }
      if (hour == 12) { // noon
          return 12 + ' pm';
        }
      if (hour > 12 && hour < 24) {
        return (hour-12) + ' pm';
      }
      if (hour > 0 && hour < 12) {
        return hour + ' am';
      }
    }

    function generateCountdown(weekday, newHour, timerSelector, textSelector) {
      $(timerSelector).html(getCountdownNum(weekday, newHour));  // display timer
      $(textSelector).html('Counting down to '+weekday+', '+ convertTo12Hour(newHour));  // display when it is counting down to

    }

    proto.setup = function(weekday, newHour, timerSelector,textSelector) {
      var x = setInterval(function(){generateCountdown(weekday, newHour, timerSelector,textSelector)}, 1000)
    }


  return {
    setup: self.setup
  };
});

$(document).ready(function() {
  var countdownTimer = new countdown();
  countdownTimer.setup('tuesday', 12, '.k_timer', '.k_date'); // weekday to countdown to, hour to countdown to (0-23), css selector for timer, css selector for date
});