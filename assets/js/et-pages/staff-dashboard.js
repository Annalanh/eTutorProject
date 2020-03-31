$viewStudentListBtn = document.getElementById('et-view-student-list-btn');
$viewClassListBtn = document.getElementById('et-view-class-list-btn');

$viewClassListBtn.onclick = (e) => {
    window.location.href ='/classManagement'
}

$viewStudentListBtn.onclick = (e) => {
    window.location.href = '/studentManagement'
}