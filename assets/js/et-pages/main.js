/**
 * DOM Elements
 */
const $topBarUserName = document.getElementById('et-topbar-username')
const $topBarBadgeUserName = document.getElementById('et-topbar-badge-username')
const $topBarDropDownUserName = document.getElementById('et-topbar-dropdown-username')
const $topBarDropDownBadgeUserName = document.getElementById('et-topbar-dropdown-badge-username')
const $notiIcon = $('#et-noti-icon')
const $chatIcon = $('#et-chat-icon')
const $signOutBtn = $('#et-signout-btn')
const $personalTutorHref = document.getElementById('et-personal-tutor-href')
const $notiList = document.getElementById('et-noti-list')
const $answerCallModal = document.getElementById('et_answer_call_modal')
const $callModal = document.getElementById('et_call_modal')
const $cancelCallBtn = document.getElementById('et-cancel-call-btn')
const $declineCallBtn = document.getElementById('et-decline-call-btn')
const $acceptCallBtn = document.getElementById('et-accept-call-btn')
const $phoneRingAudio = document.getElementById('et-phone-ring-audio')
const $incomingPhoneCallAudio = document.getElementById('et-incoming-phone-call-audio')

/**
 * setup topbar username, badge and its dropdown
 */
function setUpTopBarUserName(){
    let userName = localStorage.getItem('userName')
    let firstLetter = userName.charAt(0)
    $topBarUserName.innerText = userName
    $topBarDropDownUserName.innerText = userName
    $topBarBadgeUserName.innerText = firstLetter.toUpperCase()
    $topBarDropDownBadgeUserName.innerText = firstLetter.toUpperCase()
}
setUpTopBarUserName()

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


/**
 * call notification socket
 */
let call_noti_socket = io.connect("/callNoti")

/**
 * incoming call notification
 */
call_noti_socket.on('joinACall', ({ callerId, callerName, answererId, answererName}) => {
    if(answererId == localStorage.getItem('userId')){
        showAnswerCallModal({ callerName, callerId })
    }
})

/**
 * stop current call
 */
$cancelCallBtn.addEventListener('click', () => {
    hideCallModal()
    let callerId = localStorage.getItem('userId')
    let callerName = localStorage.getItem('userName')
    let answererId = $callBtn.getAttribute('answerer-id')
    let answererName = $callBtn.getAttribute('answerer-name')
    call_noti_socket.emit('cancelCall', { callerId, callerName, answererId, answererName })
})

/**
 * call being canceled notification
 */
call_noti_socket.on('canceledCall', ({ callerId, callerName, answererId, answererName }) => {
    if(answererId == localStorage.getItem('userId')){
        hideAnswerCallModal()
    }
})
/**
 * decline incoming call
 */
$declineCallBtn.addEventListener('click', () => {
    hideAnswerCallModal()
    let callerId = $answerCallModal.getAttribute('caller-id')
    let callerName = $answerCallModal.getAttribute('caller-name')
    let answererId = localStorage.getItem('userId')
    let answererName = localStorage.getItem('userName')
    call_noti_socket.emit('declineCall', { callerId, callerName, answererId, answererName })
})
/**
 * call being declined notification
 */
call_noti_socket.on('declinedCall', ({ callerId, callerName, answererId, answererName }) => {
    if(callerId == localStorage.getItem('userId')){
        hideCallModal()
    }
})

/**
 * accept incoming call 
 */
$acceptCallBtn.addEventListener('click', () => {
    let callerId = $answerCallModal.getAttribute('caller-id')
    let callerName = $answerCallModal.getAttribute('caller-name')
    let answererId = localStorage.getItem('userId')
    let answererName = localStorage.getItem('userName')
    call_noti_socket.emit('acceptCall', { callerId, callerName, answererId, answererName }, () => {
        // window.location.href = '/call'
        hideAnswerCallModal()
        window.open("/call"); 
    })  
})
/**
 * call being accepted notification
 */
call_noti_socket.on('acceptedCall', ({ callerId, callerName, answererId, answererName }) => {
    if(callerId == localStorage.getItem('userId')) {
        // window.location.href = '/call/#1'
        hideCallModal()
        window.open("/call/#1"); 
    }
})

function showCallModal({ answererName}){
    $callModal.style.display = 'block'
    $callModal.classList.add('show')
    $callModal.setAttribute('aria-modal', true)
    $callModal.querySelector('.et-calling-person-name').innerText = answererName
    addFadeShadow()
    $phoneRingAudio.play()
}
function hideCallModal(){
    $callModal.style.display = 'none'
    $callModal.classList.remove('show')
    $callModal.removeAttribute('aria-modal')
    $callModal.setAttribute('aria-hidden', true)
    removeFadeShadow()
    $phoneRingAudio.load()
}
function showAnswerCallModal({ callerName, callerId }){
    $answerCallModal.style.display = 'block'
    $answerCallModal.classList.add('show')
    $answerCallModal.setAttribute('aria-modal', true) 
    $answerCallModal.querySelector('.et-calling-person-name').innerText = callerName
    $answerCallModal.setAttribute('caller-id', callerId)
    $answerCallModal.setAttribute('caller-name', callerName)
    addFadeShadow()
    $incomingPhoneCallAudio.play()
}
function hideAnswerCallModal(){
    $answerCallModal.style.display = 'none'
    $answerCallModal.classList.remove('show')
    $answerCallModal.removeAttribute('aria-modal')
    $answerCallModal.setAttribute('aria-hidden', true)
    removeFadeShadow()
    $incomingPhoneCallAudio.load()
}
function addFadeShadow(){
    let fadeShadow = document.createElement('div')
    fadeShadow.classList.add('modal-backdrop')
    fadeShadow.classList.add('fade')
    fadeShadow.classList.add('show')
    
    document.body.appendChild(fadeShadow)
}
function removeFadeShadow(){
    let currentFadeShadows = document.getElementsByClassName('modal-backdrop')
    document.body.removeChild(currentFadeShadows[currentFadeShadows.length - 1])
}
