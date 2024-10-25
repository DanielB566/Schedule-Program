$(document).ready(function () {
    const btn = $("#sumbitDay");

    btn.on('click', function () {
        $.ajax({
            url: `https://www.npoint.io/docs/e0e0a960103ef64e67c7`,
            method: 'GET',
            success: function (data) {
                const schedule = data.schedule
                const daySchedule = schedule.filter(item => 
                    item.days.includes(selectedDay)
                )
    
            },
            error: function () {
                alert("Theres a connection error");
            }
        });
    })
})