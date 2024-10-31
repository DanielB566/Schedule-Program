$(document).ready(function () {

  const scheduleUrl = 'schedule.json'

  const bellSchedule = {
    1: { start: '8:24 AM', end: '9:31 AM' },
    2: { start: '9:36 AM', end: '10:43 AM' },
    3: { start: '10:48 AM', end: '11:55 AM' },
    lunch: { start: '11:55 AM', end: '12:35 PM'},
    4: { start: '12:00 PM', end: '12:35 PM' },
    5: { start: '12:41 PM', end: '1:48 PM' }
  }

  const letterDayPeriods = {
    A: [1,2,3, "Lunch", 5,6],
    B: [4,1,2, "Lunch", 7,5], 
    C: [3,4,1, "Lunch", 6,7],
    D: [2,3,4, "Lunch", 5,6],
    E: [1,2,3, "Lunch", 7,5],
    F: [4,1,2, "Lunch", 6,7],
    G: [3,4,7, "Lunch", 5,6]
  }

  

  $('#submitDay').on('click', function () {
    const selectedDay = $('#dayInput').val().trim().toUpperCase()

    if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(selectedDay)) {
      alert('Please enter a valid day (A-G)')
      return
    }

   
    $.ajax({
      url: scheduleUrl,
      method: 'GET',
      success: function (data) {
        const schedule = data.schedule
        const daySchedule = letterDayPeriods[selectedDay];

        $('#scheduleList').empty()

        let bellIndex = 1;
        

        daySchedule.forEach((period) => {
          if(period === "Lunch"){
            const lunchTime = bellSchedule.lunch;
            $("#scheduleList").append(`
              <tr>
              <td>Lunch</td>
              <td>${lunchTime.start} - ${lunchTime.end}</td>
              <td colspan="3">Lunch Break</td>
              </tr>
            `);
          } else {
            const periodData = schedule.find( (item) => item.period === period && item.days.includes(selectedDay));

            if(periodData) {
              const time = bellSchedule[bellIndex]
              $('#scheduleList').append(`
                 <tr class="schedule-row" data-start="${time.start}" data-end="${time.end}">
                <td>${period}</td>
                <td>${time.start} - ${time.end}</td>
                <td>${periodData.class}</td>
                <td>${periodData.teacher}</td>
                <td>${periodData.room}</td>
                </tr>
              `);
              bellIndex++;
            }
          }
        });

        highlightCurrentClass(); 
        
      },
      error: () => {
        console.log("Error loading data");
      }
    })
  })
})

// Credits to Adam 
function highlightCurrentClass() {
  const currentTime = new Date(); //built in javascript function, will give u the date and time
  $(".schedule-row").each(function () {
      const startTime = parseTime($(this).data("start")); //converts the start into a 12 hr format
      const endTime = parseTime($(this).data("end")); //converts the end into a 12 hr format
      if (currentTime >= startTime && currentTime <= endTime) { //when the current time is during / in between the time of the period, it will add the class to highlight the row  
          $(this).addClass("table-warning");
      }
  });
}

function parseTime(timeString) { //Converts 24 hr clock into 12 hr clock so we can compare times all in the same format.
  const [hour, minute] = timeString.match(/\d+/g).map(Number);
  const isPM = timeString.includes("PM") && hour !== 12;
  return new Date().setHours(isPM ? hour + 12 : hour, minute, 0);
}



