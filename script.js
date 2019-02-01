document.querySelector('.loading').innerHTML = 'Loading...';

var countdown = (function(options) {
  var 
      day,
      weekday,
      
      currentDate = new Date(),
      currentDayi = currentDate.getDay(),   // index for current day of week (0-6)
      currentHour = currentDate.getHours(), // current hour (0-23)
      currentMs = currentDate.getTime(),    // # of ms from 1970 to current date

      newDate, // new weekday

      daysTil, // # of days until new weekday
      msTil, // # of ms from current date to new weekday
      totalmsTil, // ms from 1970 to new weekday 

      ms, // re-calc ms til new weekday with adjusted time

      hour = document.querySelector(options.hour),
      period = document.querySelector(options.period),

      daysLeft,
      hours,
      minutes,
      seconds,
      colon = ' : ',
      
      timerSelector = options.timerSelector,
      textSelector = options.textSelector;
      
  // make number into 2 digits
  function doubleDigits(number) {
    if (number.toString().length < 2) {
      return parseInt('0' + number);
    }
      return number;
  }

  function hourIndex() {
    hour = hour.value;
    period = period.value;

    if (period === 'pm') {
      return hour + 12;
    }
  }

  function countdown() {
    hourIndex();
    console.log(hour);
  }

  // align input hour to index
  function getHourIndex() {



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

    day = $('.day option:selected').val(),
    weekday = day,
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
    daysLeft = doubleDigits(Math.floor(ms/(86400000))); // 24 * 60 * 60 * 1000
    hours = doubleDigits(Math.floor((ms-(daysLeft*86400000)) / 3600000)); // 60 * 60 * 1000
    minutes = doubleDigits(Math.floor((ms-(daysLeft*86400000)-(hours*3600000)) / 60000)); // 60 * 1000
    seconds = doubleDigits(Math.floor((ms-(daysLeft*86400000)-(hours*3600000)-(minutes*60000)) / 1000));
    
    return daysLeft+colon+hours+colon+minutes+colon+seconds;
    
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

    var countDownInterval = setInterval(function(){
      countdown();
      // updateCountdown();
    }, 1000);


});

var countdownTimer = new countdown({
  timerSelector: '.timer',
  textSelector: '.date',
  hour: '.hour',
  period: '.ampm option'
});
