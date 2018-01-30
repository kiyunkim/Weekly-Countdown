var countdown = (function() {
  var self = this,
      proto = countdown.prototype,

      day,
      weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      weekday,
      
      currentDate = new Date(),
      currentDayi = currentDate.getDay(), // index for current day of week (0-6)
      currentHour = currentDate.getHours(), // current hour (0-23)
      currentMs = currentDate.getTime(), // # of ms from 1970 to current date

      newDate, // new weekday

      daysTil, // # of days until new weekday
      msTil, // # of ms from current date to new weekday
      totalmsTil, // ms from 1970 to new weekday 

      ms, // re-calc ms til new weekday with adjusted time

      inputHour,
      ampmOption,

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
    // convert hour input to index number
    function getHourIndex() {
      inputHour = parseInt($('#hourInput').val()),
      ampmOption = $('.ampm option:selected').val();

      if (inputHour == 12) {
        if (ampmOption == 'pm') {
          inputHour = 12; // noon
        } if (ampmOption == 'am') {
          inputHour = 0; // midnight
        }
      }
      else if (ampmOption == 'pm') {
        inputHour = inputHour + 12;
      }
    }

    function getCountdownNum(newHour) {
      day = $('.dayChoices option:selected').val(),
      weekday = weekdays.indexOf(day.toLowerCase()),
      currentDate = new Date();
      getHourIndex();

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

      // calculate ms into readable values
      days = doubleDigitNum(Math.floor(ms/(86400000))); // 24 * 60 * 60 * 1000
      hours = doubleDigitNum(Math.floor((ms-(days*86400000)) / 3600000)); // 60 * 60 * 1000
      minutes = doubleDigitNum(Math.floor((ms-(days*86400000)-(hours*3600000)) / 60000)); // 60 * 1000
      seconds = doubleDigitNum(Math.floor((ms-(days*86400000)-(hours*3600000)-(minutes*60000)) / 1000));
      
      return days+colon+hours+colon+minutes+colon+seconds;
     
    }

    function convertTo12Hour(hour) {
      if (hour == 0) { // midnight
          return 12;
        }
      if (hour == 12) { // noon
          return 12;
        }
      if (hour > 12 && hour < 24) {
        return (hour-12);
      }
      if (hour > 0 && hour <= 12) {
        return hour;
      }
    }

    function generateCountdown(timerSelector, textSelector) {
      $(textSelector).html('Counting down to '+day+', '+ convertTo12Hour(inputHour) + ' '+ ampmOption);  // display when it is counting down to
      $(timerSelector).html(getCountdownNum(inputHour));  // display timer
      
    }

    proto.setup = function(timerSelector,textSelector) {
      var x = setInterval(function(){generateCountdown(timerSelector,textSelector)}, 1000)
      
    }


  return {
    setup: self.setup
  };
});

$(document).ready(function() {
  var countdownTimer = new countdown();
  countdownTimer.setup('.k_timer', '.k_date'); // weekday to countdown to, hour to countdown to (0-23), css selector for timer, css selector for date
});