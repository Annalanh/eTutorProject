"use strict";

const $createClassConfirmBtn = document.getElementById('et-create-class-confirm-btn');
const $createNewClassForm = document.getElementById('et_modal_create');
const $addTutorList = document.getElementById('et-add-tutor');
const $updateTutorList = document.getElementById('et-update-tutor');
const $updateStaffList = document.getElementById('et-update-staff');
const $createClassBtn = document.getElementById('et-create-class-btn');
const $createClassNameInput = document.getElementById('et-create-classname-input');
const $modalConfirmCreate = document.getElementById('et_modal_confirm_create');
const $modalConfirmDelete = document.getElementById('et_modal_confirm_delete');
const $modalConfirmUpdate = document.getElementById('et_modal_confirm_update');
const $deleteClassBtns = document.getElementsByClassName('et-delete-class-btn');
const $updateClassBtns = document.getElementsByClassName('et-update-class-btn');
const $updateClassNameInput = document.getElementById('et-edit-classname-input');
const $updateClassForm = document.getElementById('et_modal_update');
const $studentManaBtns = document.getElementsByClassName('et-mana-students-class-btn');

var ClassListTable = function() {
    const showAllClass = () => {
		let classList = [];
        $.ajax({
            method: "GET",
			url: "/class/getAll",
			async: false
        }).done((data) => {
			classList = data.classes;            
		})
		$('#kt_subheader_total').text(classList.length + " Total")
		classList.forEach(element => {
			$('#main-container').append(`
                <div class="col-xl-3">

				<!--Begin::Portlet-->
				<div class="kt-portlet kt-portlet--height-fluid">
					<div class="kt-portlet__head kt-portlet__head--noborder">
						<div class="kt-portlet__head-label">
							<h3 class="kt-portlet__head-title">
							</h3>
						</div>
					</div>
					<div class="kt-portlet__body">

						<!--begin::Widget -->
						<div class="kt-widget kt-widget--user-profile-2">
							<div class="kt-widget__head">
								<div class="kt-widget__media">
									<img class="kt-widget__img kt-hidden-" src="assets/media/project-logos/1.png"
										alt="image">
									<img class="kt-widget__img kt-hidden" src="assets/media/users/300_21.jpg"
										alt="image">
									<div
										class="kt-widget__pic kt-widget__pic--success kt-font-success kt-font-boldest kt-hidden">
										ChS
									</div>
								</div>
								<div class="kt-widget__info">
									<a href="#" class="kt-widget__titel kt-hidden-">
										${element.name}
									</a>
									<span class="kt-widget__desc">
										Tutor: ${element.Tutor.name}
									</span>
								</div>
							</div>
							<div class="kt-widget__body">
								<div class="kt-widget__item">
									<div class="kt-widget__contact">
										<span class="kt-widget__label">Number of students: </span>
										<a href="#" class="kt-widget__data">${element.Students.length}</a>
									</div>
								</div>
							</div>
							<div class="kt-widget__footer">
								<button type="button" class="et-update-class-btn btn btn-label-success btn-lg btn-upper" data-toggle="modal"
								data-target="#et_modal_update" class-id="${element.id}">Update Class</button>
								&nbsp;
								<button type="button" class="et-mana-students-class-btn btn btn-label-warning btn-lg btn-upper" data-toggle="modal"
								data-target="#et_modal_update_students" class-id="${element.id}">Students Management</button>
								&nbsp;
								<button style="button" class="et-delete-class-btn btn btn-label-danger btn-lg btn-upper" 
								data-toggle="modal" data-target="#et_modal_delete" class-id="${element.id}">Delete</button>
							</div>
						</div>

						<!--end::Widget -->
					</div>
				</div>

				<!--End::Portlet-->
			</div>
                `)
		})
	}

	const clearCreateInputs = () => {
		$('#et-add-tutor').empty();
		$createClassNameInput.value = '';
	}
	
	const loadTutors = () => {
		clearCreateInputs();
		$createClassBtn.onclick = () => {
			$.ajax({
				method: "POST",
				url: '/user/findByRole',
				data: { userRole: 'tutor' }
			}).done((data) => {
				data.users.forEach(tutor => {
					var option = document.createElement("option");
					option.id = tutor.id;
					option.text = `Name: ${tutor.name} - Email: ${tutor.email}`;
					$addTutorList.add(option);
				})
			})
		}
		
	}

	

	const clearUpdateInputs = () => {
		$('#et-update-tutor').empty();
		$updateClassNameInput.value = '';
	}

	const refreshUpdateForm = () => {
		$("#et_modal_update").on("show.bs.modal", () => {
			clearUpdateInputs();
			$.ajax({
				method: "POST",
				url: '/user/findByRole',
				data: { userRole: 'tutor' }
			}).done((data) => {
				data.users.forEach(tutor => {
					var option = document.createElement("option");
					option.id = tutor.id;
					option.text = `Name: ${tutor.name} - Email: ${tutor.email}`;
					$updateTutorList.add(option);
				})
			})
			$.ajax({
				method: 'POST',
				url: '/user/findByRole',
				data: { userRole: 'staff'}
			}).done((data) => {
				data.users.forEach(staff => {
					var option = document.createElement("option");
					option.id = staff.id;
					option.text = `Name: ${staff.name} - Email: ${staff.email}`;
					$updateStaffList.add(option);
				})
			})
		})
	}
	
	const addClassRoom = () => {
		$createClassConfirmBtn.onclick = (e) => {
			let staffId = window.localStorage.getItem('userId');
			let className = $createClassNameInput.value;
			let tutorId = $addTutorList.options[$addTutorList.selectedIndex].id;
			$.ajax({
				method: "POST",
				url: '/class/add',
				data: { staffId: staffId, className: className, tutorId: tutorId }
			}).done((data) => {
				if (data.status){
					// sendNotiToTutor(tutorId, className);
					window.location.reload();
				} else{
					console.log(data.message);
					$("#et_modal_confirm_create").modal('hide');
					// $modalConfirmCreate.style.display = "none"
					$("#et_modal_create").modal('hide');
					// $createNewClassForm.style.display = "none"
					document.body.removeChild(document.querySelector('.modal-backdrop'))
					document.body.removeChild(document.querySelector('.modal-backdrop'))
					$("#error-title").html("Error Message");
					$("#error-body").html(data.message);
					$("#errorModal").modal('show');
				}
			})
		}
	}

	const sendNotiToTutor = (tutorId, className) => {
		console.log('ye');
		$.ajax({
			method:"POST",
			url:"/email/sendNotificationEmail",
			data: {}
		}).done((data)=> {
			console.log(data);
		})
	}
	
	const updateClassRoom = () => {
		for (var i = 0; i < $updateClassBtns.length; i ++){
			$updateClassBtns[i].onclick = (btn) => {
				var classId = btn.target.attributes["class-id"].value;
				$modalConfirmUpdate.setAttribute("class-id", classId);
			}
		}

		$modalConfirmUpdate.onclick = () => {
			let staffId = $updateStaffList.options[$updateStaffList.selectedIndex].id;
			let className = $updateClassNameInput.value;
			let tutorId = $updateTutorList.options[$updateTutorList.selectedIndex].id;
			let classId = $modalConfirmUpdate.getAttribute('class-id');
			$.ajax({
				method: "POST",
				url: '/class/update',
				data: { staffId: staffId, className: className, tutorId: tutorId, classId: classId }
			}).done((data) => {
				if (data.status){
					window.location.reload();
				} else{
					console.log(data.message);
					$("#et_modal_confirm_update").modal('hide');
					// $modalConfirmUpdate.style.display = "none"
					$("#et_modal_update").modal('hide');
					// $updateClassForm.style.display = "none"
					document.body.removeChild(document.querySelector('.modal-backdrop'))
					document.body.removeChild(document.querySelector('.modal-backdrop'))
					$("#error-title").html("Error Message");
					$("#error-body").html(data.message);
					$("#errorModal").modal('show');
				}
			})
		}
	}

	const deleteClassRoom = () => {
		for (var i = 0; i < $deleteClassBtns.length; i ++){
			$deleteClassBtns[i].onclick = (btn) => {
				var classId = btn.target.attributes["class-id"].value;
				$modalConfirmDelete.setAttribute("class-id", classId);
			}
		}

		$modalConfirmDelete.onclick = () => {
			let classId = $modalConfirmDelete.getAttribute("class-id");
			$.ajax({
				method: 'POST',
				url: '/class/delete',
				data: { classId: classId },
			}).done((data) => {
				if (data.status){
					console.log(data.message);
					window.location.reload();
				}else{
					console.log(data.message);
					$modalConfirmDelete.style.display = "none";
					document.body.removeChild(document.querySelector('.modal-backdrop'))
				}
			})
		}
	}

	const relocateToClassStudentMana = () => {
		for (var i = 0; i < $studentManaBtns.length; i ++){
			$studentManaBtns[i].onclick = (btn) => {
				var classId = btn.target.attributes["class-id"].value;
				window.location.href=`class/studentManagement?classId=${classId}`
			}
		}
	}
	
    return {
        init: () => {
			showAllClass();
			loadTutors();
			addClassRoom();
			deleteClassRoom();
			updateClassRoom();
			refreshUpdateForm();
			relocateToClassStudentMana();
        }
    }
}();

$(document).ready(() => {
    ClassListTable.init();
})