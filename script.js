$(document).ready(function () {
    
    const bellSchedule = {
        1: { start: '8:24 AM', end: '9:31 AM' },
        2: { start: '9:36 AM', end: '10:43 AM' },
        3: { start: '10:48 AM', end: '11:55 AM' },
        4: { start: '12:41 PM', end: '1:48 PM' },
        5: { start: '1:53 PM', end: '3:00 PM' }
    };
  
    $('#submitDay').on('click', function () {
        const selectedDay = $('#dayInput').val().toUpperCase();

        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(selectedDay)) {
            alert('Please enter a valid day (A-G)');
            return;
        }
  
        $.ajax({
            url: `https://api.npoint.io/e0e0a960103ef64e67c7`,
            method: 'GET',
            success: function (data) {
                const schedule = data.schedule;
                const daySchedule = schedule.filter(item =>
                    item.days.includes(selectedDay)
                );
  
                $('#scheduleList').empty();

                if (daySchedule.length === 0) {
                    $('#scheduleList').append(
                        '<tr><td colspan="5">No classes today.</td></tr>'
                    );
                } else {

                    daySchedule.forEach(classItem => {
                        const period = classItem.period;
                        const time = bellSchedule[period]; 
  
                  
                        if (time) {
                            $('#scheduleList').append(`
                                <tr>
                                    <td>${period}</td>
                                    <td>${time.start} - ${time.end}</td>
                                    <td>${classItem.class}</td>
                                    <td>${classItem.teacher}</td>
                                    <td>${classItem.room}</td>
                                </tr>
                            `);
                        } else {
                           
                            $('#scheduleList').append(`
                                <tr>
                                    <td>${period}</td>
                                    <td colspan="4">No scheduled time available</td>
                                </tr>
                            `);
                        }
                    });
                }
            },
            error: function () {
                alert('Error loading schedule. Please check your JSON file URL.');
            }
        });
    });
});
