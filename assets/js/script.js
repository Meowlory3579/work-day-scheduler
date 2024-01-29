// jQuery ready function to ensure the code runs after the DOM has fully loaded
$(document).ready(() => {


  // Display the current date and time
  var today = dayjs();
  $('#currentDay').text(today.format('MMMM D, YYYY h:mm A'));


  // Apply the past, present, or future class to each time block by comparing the id to the current hour
  $('.time-block').each(function() {
    // Get the current hour
    var currentHour = dayjs().hour();
    // Parse the (hour) integer from the time-block id being processed
    var blockHour = parseInt(this.id.split('-')[1], 10);

    // Apply / remove class
    if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
    } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
    } else {
        $(this).addClass('future').removeClass('past present');
    }
  });


  // Get any user input that was saved in localStorage...
  var allItems = JSON.parse(localStorage.getItem('allItems')) || [];

  // ...and set the values of the corresponding textarea elements
  allItems.forEach(function(item) {
    var textarea = '#' + item.hour + ' .description';
    $(textarea).val(item.text);
  }); 


  // Add a listener for click events on the save button that saves relevant information from the element that triggered the event to localStorage
  $('.saveBtn').on('click', function() {
    // Find the element that triggered the event
    var button = $(this);
    // Find the parent id for that element...
    var index = button.parent().attr("id");
    // ...then find the text that was input by user
    var text = button.siblings('.description').val();

    // Store the id and text in an object
    var newPlannerItem = {
      hour: index,
      text: text.trim()
    };

   // Retrieve allItems array from localstorage, if exists. If not, set allItems to empty
    var allItems = localStorage.getItem('allItems');
    if (allItems === null) {
      allItems = [];
    } else {
      allItems = JSON.parse(allItems);
    }

    // Push new events into the allItems array
    allItems.push(newPlannerItem);

    // Store allItems in localStorage
    var setStoredItems = localStorage.setItem('allItems', JSON.stringify(allItems));

  }); 

}); // Document ready end






