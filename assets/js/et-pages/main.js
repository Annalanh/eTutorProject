/**
 * DOM Elements
 */

$notiIcon = $('#et-noti-icon')
$chatIcon = $('#et-chat-icon')
$signOutBtn = $('#et-signout-btn')

$notiIcon.click((e) => {
    console.log('noti')
    console.log(e)
})

$chatIcon.click((e) => {
    window.location.href = '/chat'
})

$signOutBtn.click((e) => {
    $.ajax({
		method: "GET",
		url: "http://localhost:3000/auth/logout",
	})
    .done(function (data) {
        if(data.status) window.location.href = "http://localhost:3000/auth/login"
    });
})