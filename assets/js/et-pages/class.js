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
const $personalTutorHref = document.getElementById('et-personal-tutor-href')
const $notiList = document.getElementById('et-noti-list')

/**
 * handle click Personal Tutor in asidebar
 */
if($personalTutorHref){
    $.ajax({
        url:'/class/findClassRoomsByUserId',
        method: "POST",
        data: {userId: localStorage.getItem('userId'),role: localStorage.getItem('role')}
    }).done(classRooms => {
        let classId = classRooms[0].classId
        $personalTutorHref.href = `/class/${classId}/stream`
    })
}
/**
 * handle click notification icon
 */
$notiIcon.click((e) => {
    console.log('noti')
    console.log(e)
})

/**
 * handle click chat icon
 */
$chatIcon.click((e) => {
    window.location.href = '/chat'
})

/**
 * get current notifications
 */
$.ajax({
    url: '/notification/getNotificationsByUserId',
    method: 'GET'
}).then(data => {
    if(data.status) {
        let notifications = data.notifications
        notifications.forEach(noti => {
            let { type, href, content, moreDetail } = noti
            renderNewNotification({ type, data: { href, content, moreDetail }})
        })
    }
    else console.log(data.message)
})

/**
 * handle click sign out icon
 */
$signOutBtn.click((e) => {
    $.ajax({
		method: "GET",
		url: "/auth/logout",
	})
    .done(function (data) {
        if(data.status) {
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            window.location.href = "/auth/login"
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

/**
 * notification socket
 */
let noti_socket = io.connect("/notification")

noti_socket.on('needConfirmMeeting', ({ tutorId, tutorName, studentId, studentName, creatorRole, classId, meetingName }) => {
    let currentUserId = localStorage.getItem('userId')

    if(currentUserId == tutorId || currentUserId == studentId){
        let currentUserRole = localStorage.getItem('role')

        if(currentUserRole != creatorRole) {
            let creatorName = ''
            if(currentUserRole == 'student'){
                creatorName = tutorName
            }else{
                creatorName= studentName
            }

            let content = `${creatorName} has just created a new meeting: ${meetingName}`
            let href = `/class/${classId}/meeting`
            let moreDetail = `Let's confirm!`
            renderNewNotification({type: 'confirm_meeting', data: { content, href, moreDetail }})
        }
    }
    
})

noti_socket.on('confirmedMeeting', ({ tutorId, studentId, classId, meetingName }) => {
    let currentUserId = localStorage.getItem('userId')

    if(currentUserId == tutorId || currentUserId == studentId){
        let content = `${meetingName} has just been confirmed`
        let moreDetail = `Click to see detail!`
        let href = `/class/${classId}/meeting`

        renderNewNotification({type: 'confirmed_meeting', data: { content, moreDetail, href }})
    }
})
/**
 * render new notification 
 */
function renderNewNotification({ type, data}){
    console.log('render')
    if(type == 'confirm_meeting'){
        let $newNotiItem = document.createElement('a')
        $newNotiItem.classList.add('kt-notification__item')
        $newNotiItem.setAttribute('href', data.href) 
        $newNotiItem.innerHTML =`<div class="kt-notification__item-icon">
                                    <i class="flaticon-whatsapp kt-font-danger"></i>
                                </div>
                                <div class="kt-notification__item-details">
                                    <div class="kt-notification__item-title">
                                        ${data.content}
                                    </div>
                                    <div class="kt-notification__item-time">
                                        ${data.moreDetail}
                                    </div>
                                </div>`

        $notiList.insertBefore($newNotiItem, $notiList.childNodes[0])

    }else if(type == 'confirmed_meeting'){
        let $newNotiItem = document.createElement('a')
        $newNotiItem.classList.add('kt-notification__item')
        $newNotiItem.setAttribute('href', data.href) 
        $newNotiItem.innerHTML =`<div class="kt-notification__item-icon">
                                    <i class="flaticon-whatsapp kt-font-success"></i>
                                </div>
                                <div class="kt-notification__item-details">
                                    <div class="kt-notification__item-title">
                                        ${data.content}
                                    </div>
                                    <div class="kt-notification__item-time">
                                        ${data.moreDetail}
                                    </div>
                                </div>`

        $notiList.insertBefore($newNotiItem, $notiList.childNodes[0])
    }
}

