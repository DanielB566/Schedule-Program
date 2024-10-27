$(document).ready(function () {
    const btn = $("#submitDay");

    btn.on('click', function () {
        const selectedDay = $("#dayInput").val().trim().toUpperCase();

        // Validate the day input
        if (!["A", "B", "C", "D", "E", "F", "G"].includes(selectedDay)) {
            alert("Please enter a valid day (A-G)");
            return;
        }
        
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