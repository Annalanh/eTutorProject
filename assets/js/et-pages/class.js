/**
 * DOM Elements
 */

const $notiIcon = $('#et-noti-icon')
const $chatIcon = $('#et-chat-icon')
const $signOutBtn = $('#et-signout-btn')
const $redirectClassPeople = document.getElementById('et-redirect-class-people')
const $redirectClassStream = document.getElementById('et-redirect-class-stream')
const $redirectClassMeeting = document.getElementById('et-redirect-class-meeting')
const $addMeetingBtn = document.getElementById('et-add-meeting-btn')
const $addPostBtn = document.getElementById('et-add-post-btn')

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
        if(data.status) {
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            window.location.href = "http://localhost:3000/auth/login"
        }
    });
})

$redirectClassPeople.addEventListener('click', () => {
    window.location.href = `/class/${classId}/people`
})
$redirectClassStream.addEventListener('click', () => {
    window.location.href = `/class/${classId}/stream`
})
$redirectClassMeeting.addEventListener('click', () => {
    window.location.href = `/class/${classId}/meeting`
})