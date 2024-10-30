$(document).ready(function () {
  
    const scheduleUrl = 'schedule.json'
  

    const bellSchedule = {
      1: { start: '8:24 AM', end: '9:31 AM' },
      2: { start: '9:36 AM', end: '10:43 AM' },
      3: { start: '10:48 AM', end: '11:55 AM' },
      lunch: { start: '11:55 AM', end: '12:35 AM'},
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
  
      // Make AJAX request to load the schedule
      $.ajax({
        url: scheduleUrl,
        method: 'GET',
        success: function (data) {
          const schedule = data.schedule
          const daySchedule = schedule.filter(item =>
            item.days.includes(selectedDay)
          )
  
         
          $('#scheduleList').empty()

          

          if (daySchedule.length === 0) {
            $('#scheduleList').append(
              '<tr><td colspan="5">No classes today.</td></tr>'
            )
          } else {
        
            daySchedule.forEach(classItem => {
              const period = classItem.period
              const time = bellSchedule[period] 
              $('#scheduleList').append(`
                              <tr>
                                  <td>${period}</td>
                                  <td>${time.start} - ${time.end}</td>
                                  <td>${classItem.class}</td>
                                  <td>${classItem.teacher}</td>
                                  <td>${classItem.room}</td>
                              </tr>
                          `)
            })
          }
        },
        error: function () {
          alert('Error loading Schedule.')
        }
      })
    })
  })