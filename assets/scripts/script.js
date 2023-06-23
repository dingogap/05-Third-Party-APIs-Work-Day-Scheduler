// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var pastClass = "past";
var presentClass = "present";
var futureClass = "future";
var dayStart = 9;
var dayEnd = 17;
$(function () {
  //Build the Daily Planner

  // Get the date
  var dateAsString = dayjs().format("YYYY-MM-DD");
  // Get the hour in 24 hour format as an integer
  var currentHour = parseInt(dayjs().format("H"));

  // build the daily planner, checking the time to assign the class to show past, present & future
  for (var i = dayEnd; i > dayStart - 1; i--) {
    // build the id for the hourly blocks
    var hourId = "hour-" + i.toString();
    if (i < currentHour) {
      hourColour = "past";
    } else if (i > currentHour) {
      hourColour = "future";
    } else {
      hourColour = "present";
    }
    hourColour = "";

    $(".container-lg").prepend(
      "<div id='" +
      hourId +
      "' class='row time-block " +
      hourColour +
      "'></div>"
    );
    $("#" + hourId).append(
      "<div class='col-2 col-md-1 hour text-center py-3'></div>"
    );
    // hour as a string
    hourAsString = i.toString() + ":00";
    // show the hour in 12 hour format AM/PM
    $("#" + hourId + " div").text(
      dayjs(dateAsString + " " + hourAsString).format("hA")
    );
    $("#" + hourId).append(
      "<textarea class='col-8 col-md-10 description' rows='3'></textarea>"
    );
    $("#" + hourId).append(
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'>"
    );
  }
  // Add the save icon to all buttons with the saveBtn class
  $(".saveBtn").prepend("<i class='fas fa-save' aria-hidden='true'></i>");

  // Check the time and apply hour block colours
  checkTime();

  setInterval(function () {
    var currentMinute = parseInt(dayjs().format("m"));
    if (currentMinute===0){checkTiime()}
    console.log(currentMinute);
  }, 60000
  )

  function checkTime() {
    // Get the current time
    // Check the hour block divs to see if they are for past, present or future
    // Call checkHourClass to ensure the class is correct for the time
    var currentHour = parseInt(dayjs().format("H"));
    for (var i = dayStart; i < dayEnd + 1; i++) {
      var hourId = "#hour-" + i.toString();
      if (i < currentHour) {
        hourClass = pastClass;
        checkHourClass(hourId, hourClass);
      } else if (i > currentHour) {
        hourClass = futureClass;
        checkHourClass(hourId, hourClass);
      } else {
        hourClass = presentClass;
        checkHourClass(hourId, hourClass);
      }
    }
  }

  function checkHourClass(hourId, hourClass) {
    // Update the colour class based on time - past, present or future
    switch (hourClass) {
      case pastClass:
        if ($(hourId).hasClass(presentClass)) {
          $(hourId).removeClass(presentClass);
        } else {
          $(hourId).removeClass(futureClass);
        }
        break;
      case presentClass:
        if ($(hourId).hasClass(pastClass)) {
          $(hourId).removeClass(pastClass);
        } else {
          $(hourId).removeClass(futureClass);
        }
        break;
      case futureClass:
        if ($(hourId).hasClass(pastClass)) {
          $(hourId).removeClass(pastClass);
        } else {
          $(hourId).removeClass(presentClass);
        }
        break;
    }
    if (!$(hourId).hasClass(hourClass)) {
      $(hourId).addClass(hourClass);
    }
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  //Get todays date & format it for the Scheduler Header

  // Get todays date
  var todaysDate = dayjs();
  // Get the Ordinal Suffix
  var suffix = getOrdinal(dayjs(todaysDate).format("D")) + ",";
  $("#currentDay").text(
    dayjs(todaysDate).format("dddd, MMMM D") +
    suffix +
    " " +
    dayjs().format("YYYY")
  );
});

function getOrdinal(noToOrdinal) {
  // Determine the ordinal number of a date in a month
  // Eg: 1st, 2nd, 3rd, 11th, 21st, etc
  // I wrote my own function because I encountered an error in the dayjs advancedFormat routine
  switch (parseInt(noToOrdinal)) {
    case 1:
    case 21:
    case 31:
      ordinalSuffix = "st";
      break;
    case 2:
    case 22:
      ordinalSuffix = "nd";
      break;
    case 3:
    case 23:
      ordinalSuffix = "rd";
      break;
    default:
      ordinalSuffix = "th";
  }
  return ordinalSuffix;
}
