/**
 * DOM elements
 */
$viewStaffManaBtn = document.getElementById("et-view-staff-mana-btn")
$viewStaffDashboardBtn = document.getElementById("et-view-staff-dashboard-btn")

/**
 * handle click view staff management button
 */
$viewStaffManaBtn.addEventListener('click', (e) => {
    $.ajax({
        url:"/user/findAllStaff",
        method: "GET",
    }).done(data => {
        if(data.status){
            $.ajax({
                url: "/staffManagement",
                method: "POST",
                data: JSON.stringify({staffData: data.staffData}),
                contentType: 'application/json'
            }).done((data) => {
                if(data.status) console.log("error")
            })
        }else{
            console.log(data.message)
        }
    })
    
})
/**
 * handle click view staff dashboard button
 */
$viewStaffDashboardBtn.addEventListener('click', (e) => {
    console.log("trang xem dashboard")
    window.location.href = '/staffDashboard'
})
