var countdown = (function(options) {
  var self = this,
      proto = countdown.prototype,

      day,
      // TODO: generate below array from html
      weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        // new Array(),
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

      inputHour = options.inputHour,
      inputHourVal,
      ampmOption = options.ampmOption,
      ampmOptionVal,

      days,
      hours,
      minutes,
      seconds,
      colon = ' : ',
      
      timerSelector = options.timerSelector,
      textSelector = options.textSelector;
      
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
      // move these variables
      inputHourVal = parseInt($(inputHour).val()),
      ampmOptionVal = $(ampmOption).val();

      if (inputHourVal == 12) {
        if (ampmOptionVal == 'pm') {
          inputHourVal = 12; // noon
        } if (ampmOptionVal == 'am') {
          inputHourVal = 0; // midnight
        }
      }
      else if (ampmOptionVal == 'pm') {
        inputHourVal = inputHourVal + 12;
      }
    }

    function getCountdownNum(newHour) {

      day = $('.dayChoices option:selected').val(),
      weekday = weekdays.indexOf(day.toLowerCase()),
      currentDate = new Date();
      getHourIndex();

      // how many days til the new weekday?
      if (currentDayi > weekday) {
        daysTil = 7 - currentDayi + weekday; 
      } 
      else if (currentDayi < weekday ) { 
        daysTil = weekday - currentDayi;
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

    // merge this with getHourIndex somehow
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

    function updateCountdown() {
      $(textSelector).html('Counting down to '+day+', '+ convertTo12Hour(inputHourVal) + ' '+ ampmOptionVal);  // display when it is counting down to
      $(timerSelector).html(getCountdownNum(inputHourVal));  // display timer
    }

    proto.setup = function() {
      getCountdownNum(inputHourVal); // init run so numbers dont display as NaN
      var countDownInterval = setInterval(function(){
        updateCountdown();
      }, 1000);
    }


  return {
    setup: self.setup
  };
});

$(document).ready(function() {
  var countdownTimer = new countdown({
    timerSelector: '.k_timer',
    textSelector: '.k_date',
    inputHour: '#hourInput',
    ampmOption: '.ampm option:selected'
  });
  countdownTimer.setup(); // weekday to countdown to, hour to countdown to (0-23), css selector for timer, css selector for date
});