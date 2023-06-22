// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
  var todaysDate = dayjs();
  var suffix = getOrdinal(dayjs(todaysDate).format('D'));
  $('#currentDay').text(dayjs(todaysDate).format('dddd, MMMM D') + suffix);

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

