const $studentNoTutorList = document.getElementById('et-student-no-tutor-list')
const $studentNoInteractionSevenList = document.getElementById('et-student-no-interaction-7-list')
const $studentNoInteractionTwentyEightList = document.getElementById('et-student-no-interaction-28-list')
const $noTutorStats = document.getElementById('et-no-tutor-stats')
const $pairStats = document.getElementById('et-pair-stats')
const userId = window.location.pathname.split("/")[2]


$.ajax({
    url: '/class/findClassRoomsByUserId',
    method: "POST",
    data: { userId, role: 'staff'}
}).done(classRooms => {
    $pairStats.innerText = classRooms.length
})

/**
 * table of students with no interaction for 7 days and 28 days
 */
$.ajax({
    url:'/user/findStudentsWithNoInteractionInSevenDays',
    method:'GET',
}).done(students => {
    renderStudentsNoInteraction({ days: 7, students, container: $studentNoInteractionSevenList })
    renderStudentsNoInteraction({ days: 28, students, container: $studentNoInteractionTwentyEightList })
})

/**
 * table of student without no tutor
 */
$.ajax({
    url:'/user/findStudentWithNoTutor',
    method:'GET',
}).done(data => {
    if(data.status) {
        $noTutorStats.innerText = data.studentsNoTutor.length
        renderUserList($studentNoTutorList, data.studentsNoTutor)
    }else{
        console.log(data.message)
    }
})

/**
 * render user list function
 */
function renderUserList(container, userData){
    userData.forEach(user => {
        let newRow = document.createElement('tr')
        newRow.setAttribute('user-id', user.id)
        newRow.classList.add('kt-datatable__row')
        newRow.style.left = '0px'
        newRow.innerHTML =      `<td class="kt-datatable__cell" data-field="Name">
                                    <span style="width: 110px;">${user.name}</span>
                                </td>
                                <td class="kt-datatable__cell" data-field="Fullname">
                                    <span style="width: 110px;">${user.fullname}</span>
                                </td>
                                <td class="kt-datatable__cell" data-field="Email">
                                    <span style="width: 110px;">${user.email}</span>
                                </td>
                            `
        container.appendChild(newRow)
    })
}

/**
 * render no interaction student list
 */
function renderStudentsNoInteraction({ days, students, container }){
    let studentsNoInteraction = []

    let now = moment();

    students.forEach(student => {
        let noMessage = false
        let noPost = false
        let noMeeting = false

        let messages = student.Messages
        let posts = student.Posts
        let meetings = []
        let classRoom = student.ClassRooms[0]

        if(classRoom) meetings = classRoom.Meetings

        if(messages.length == 0) noMessage = true
        else{
            let latestMessageTime = messages[0].createdAt
            if(now.diff(latestMessageTime, 'minutes') > days) noMessage = true
        }

        if(posts.length == 0) noPost = true
        else {
            let latestPostTime = posts[0].createdAt
            if(now.diff(latestPostTime, 'minutes') > days) noPost = true
        }

      
        if(meetings.length == 0) noMeeting = true
        else {
            let latestMeetingTime = meetings[0].createdAt
            if(now.diff(latestMeetingTime, 'minutes') > days) noMeeting = true
        }

        if(noMessage && noMeeting && noPost) studentsNoInteraction.push(student)
    })

    renderUserList(container, studentsNoInteraction)
}