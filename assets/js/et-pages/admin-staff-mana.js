/**
 * DOM elements
 */
let staffListTable = document.getElementById('et-staff-list-table')

let allStaff = []

/**
 * render staff data
 */
$.ajax({
    url: '/user/findAllStaff',
    method: 'GET'
}).done((data) => {
    if(data.status){
        let staffData = data.staffData

        staffData.forEach((staff, index) => {
            console.log(staff)
            let newRow = document.createElement('tr')
            newRow.setAttribute("data-row", index)
            newRow.classList.add('kt-datatable__row')
            newRow.style.left = '0px'
            newRow.innerHTML = `<td class="kt-datatable__cell" data-field="Name">
                                        <span style="width: 110px;">${staff.name}</span>
                                    </td>
                                    <td class="kt-datatable__cell" data-field="Email">
                                        <span style="width: 110px;">${staff.email}</span>
                                    </td>
                                    <td class="kt-datatable__cell" data-field="Role">
                                        <span style="width: 110px;">Staff</span>
                                    </td>
                                    <td class="kt-datatable__cell" data-field="Actions" data-autohide-disabled="false">
                                        <span style="overflow: visible; position: relative; width: 110px;">										
                                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" id="et-staff-edit-btn-${staff.id}" staff-id=${staff.id} title="Edit details">					
                                                <i class="la la-edit"></i>						
                                            </a>					
                                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">							<i class="la la-trash"></i>						</a>					</span>
                                    </td>
                                `
            staffListTable.appendChild(newRow)
            
            let $editButton = document.getElementById(`et-staff-edit-btn-${staff.id}`)
            $editButton.addEventListener('click',(e) => {
                console.log('alooo')
                let staffId = $editButton.getAttribute('staff-id')
                
            })

        })
    }
    else console.log(data.message)
})