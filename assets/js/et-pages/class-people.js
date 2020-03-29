/**
 * DOM elements
 */
const $staffList = document.getElementById('et-staff-list')
const $tutorList = document.getElementById('et-tutor-list')
const $studentList = document.getElementById('et-student-list')

const classId = window.location.pathname.split("/")[2]

/**
 * hide add post button
 */
const $addPostBtn = document.getElementById('et-add-post-btn')
$addPostBtn.style.display = 'none'

$.ajax({
    url: '/class/findPeopleByClassId',
    method: "POST",
    data: { classId }
}).then(data => {
    if(data.status){
        let classPeople = data.classPeople
        renderUserList($staffList, [classPeople.staff])
        renderUserList($tutorList, [classPeople.tutor])
        renderUserList($studentList, classPeople.students)
    }else{
        console.log(data.message)
    }
    
})

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