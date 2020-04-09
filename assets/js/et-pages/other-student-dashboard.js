/**
 * DOM Elements
 */
const $todayMeetingList = document.getElementById('et-today-meeting-list')
const $tutorRecentMessageList = document.getElementById('et-tutor-recent-message-list')
const $sharedFileList = document.getElementById('et-shared-file-list')
const userId = window.location.pathname.split("/")[2]

/**
 * initially render today's meetings and shared files
 */

$.ajax({
    url: '/user/findMeetingsAndFilesByUserId',
    method: 'POST',
    data: { userId }
}).done(data => {
    if(data.status){
        //render meetings
        let meetings = data.meetings

        meetings.forEach(meeting => {
            let { name, startTime, tutorConfirmed, studentConfirmed } = meeting
            //get today meeting
            let todayStr = moment().format('YYYY MM DD')
            let startTimeStr = moment(startTime).format('YYYY MM DD')

            if(todayStr == startTimeStr) renderTodayMeetings({ meetingName: name, startTime, tutorConfirmed, studentConfirmed, container: $todayMeetingList })
        })

        //render shared files

        let sharedFiles = data.files
        
        sharedFiles.forEach(file => {
            renderSharedFiles({ fileData: file, container: $sharedFileList })
        })

    }else{
        console.log(data.message)
    }

})

/**
 * render today's meeting
 */
function renderTodayMeetings({ meetingName, startTime, tutorConfirmed, studentConfirmed, container }){
    let statusColor = ''
    if(tutorConfirmed && studentConfirmed) statusColor = 'kt-font-success'
    else if(tutorConfirmed) statusColor = 'kt-font-danger'
    else statusColor = 'kt-font-warning'

    //format startTime 
    startTime = moment(startTime).format('LT')
    let $todayMeeting = document.createElement('div')
    $todayMeeting.classList.add("kt-timeline-v2__item")
    $todayMeeting.innerHTML =`<span class="kt-timeline-v2__item-time" style="font-size: 1rem">${startTime}</span>
                            <div class="kt-timeline-v2__item-cricle">
                                <i class="fa fa-genderless ${statusColor}"></i>
                            </div>
                            <div class="kt-timeline-v2__item-text  kt-padding-top-5">
                                ${meetingName}
                            </div>`
                        
    container.appendChild($todayMeeting)           
}

/**
 * render shared files
 */
function renderSharedFiles({ container, fileData }){
    let { path, createdAt } = fileData

    let pathSplit = path.split('/')
    let fileName = pathSplit[pathSplit.length - 1]
    let fileNameSplit = fileName.split('.')
    let fileType = fileNameSplit[fileNameSplit.length - 1]
    let availableFileIcon = ['css', 'csv', 'doc', 'docx', 'html', 'javascript', 'jpg', 'mp4', 'pdf', 'xml', 'zip']
    let fileImg = ''

    if(availableFileIcon.includes(fileType)){
        fileImg = `<img src="../media/files/${fileType}.svg" alt="">`
    }else{
        fileImg = `<img src="../media/icons/svg/Files/Selected-file.svg"/>`
    }

    console.log(fileName, fileType)

    let $sharedFile = document.createElement('div')
    $sharedFile.classList.add('kt-widget4__item')
    $sharedFile.innerHTML = `<div class="kt-widget4__pic kt-widget4__pic--icon">
                                ${fileImg}
                            </div>
                            <a href="../${path}" download = "${fileName}" class="kt-widget4__title">
                                ${fileName}
                            </a>
                            <div class="kt-widget4__tools">
                                <a href="#" class="btn btn-clean btn-icon btn-sm">
                                    <i class="flaticon2-download-symbol-of-down-arrow-in-a-rectangle"></i>
                                </a>
                            </div>`
    container.appendChild($sharedFile)

}

/**
 * get messages from tutor 
 */
$.ajax({
    url:'/user/findMessagesOfPeersByUserId',
    method: "POST",
    data: { userId }
}).done(data => {
    if(data.status){
        let messages = data.messages
        console.log(messages)
        messages.forEach(message => {
            renderRecentMessage({ container: $tutorRecentMessageList, message })
        })
    }else{
        console.log(data.message)
    }
})

/**
 * render recent messages function 
 */
function renderRecentMessage({ message, container}){
    let { createdAt, content } = message
    createdAt = moment(createdAt).format('LT')

    let $recentMessage = document.createElement('div')
    $recentMessage.classList.add('kt-widget4__item')
    $recentMessage.innerHTML = `<span class="kt-widget4__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <polygon fill="#000000" opacity="0.3" points="5 15 3 21.5 9.5 19.5"/>
                                            <path d="M13.5,21 C8.25329488,21 4,16.7467051 4,11.5 C4,6.25329488 8.25329488,2 13.5,2 C18.7467051,2 23,6.25329488 23,11.5 C23,16.7467051 18.7467051,21 13.5,21 Z M8.5,13 C9.32842712,13 10,12.3284271 10,11.5 C10,10.6715729 9.32842712,10 8.5,10 C7.67157288,10 7,10.6715729 7,11.5 C7,12.3284271 7.67157288,13 8.5,13 Z M13.5,13 C14.3284271,13 15,12.3284271 15,11.5 C15,10.6715729 14.3284271,10 13.5,10 C12.6715729,10 12,10.6715729 12,11.5 C12,12.3284271 12.6715729,13 13.5,13 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z" fill="#000000"/>
                                        </g>
                                    </svg>
                                </span>
                                <a href="#" class="kt-widget4__title kt-widget4__title--light">
                                    ${content}
                                </a>
                                <span class="kt-widget4__number kt-font-info">${createdAt}</span>`
    container.appendChild($recentMessage)
}