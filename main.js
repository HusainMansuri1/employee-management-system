import './style.css';

let employeeData = [
	{
		id: 1,
		employee_name: 'Tiger Nixon',
		employee_salary: 320800,
		employee_age: 61,
		profile_image: '',
	},
	{
		id: 2,
		employee_name: 'Garrett Winters',
		employee_salary: 170750,
		employee_age: 63,
		profile_image: '',
	},
	{
		id: 3,
		employee_name: 'Ashton Cox',
		employee_salary: 86000,
		employee_age: 66,
		profile_image: '',
	},
	{
		id: 4,
		employee_name: 'Cedric Kelly',
		employee_salary: 433060,
		employee_age: 22,
		profile_image: '',
	},
	{
		id: 5,
		employee_name: 'Airi Satou',
		employee_salary: 162700,
		employee_age: 33,
		profile_image: '',
	},
	{
		id: 6,
		employee_name: 'Brielle Williamson',
		employee_salary: 372000,
		employee_age: 61,
		profile_image: '',
	},
	{
		id: 7,
		employee_name: 'Herrod Chandler',
		employee_salary: 137500,
		employee_age: 59,
		profile_image: '',
	},
	{
		id: 8,
		employee_name: 'Rhona Davidson',
		employee_salary: 327900,
		employee_age: 55,
		profile_image: '',
	},
	{
		id: 9,
		employee_name: 'Colleen Hurst',
		employee_salary: 205500,
		employee_age: 39,
		profile_image: '',
	},
	{
		id: 10,
		employee_name: 'Sonya Frost',
		employee_salary: 103600,
		employee_age: 23,
		profile_image: '',
	},
];

(() => {
	const employeeListContainer = document.querySelector('.employees__all-view');
	const employeeSingleContainer = document.querySelector('.employees__single-view');
	const addEmployeeBtn = document.querySelector('#employee-add-btn');

	const modal = document.querySelector('#modal');
	const modalForm = document.querySelector('#modal-form');
	const modalTitle = document.querySelector('.modal__title');

	/**
	 * To render list of employees
	 */
	const renderEmployeeList = () => {
		const list = document.createElement('ul');
		list.classList.add('employees__all-list');

		employeeData.forEach((row) => {
			list.innerHTML += `
        <li id="${row.id}" class="employees__all-list-item ">
          <h3 class="employees__all-name">${row.employee_name}</h3>
          <div class="employees__all-btn-wrap">
            <button class="employees__all-btn employees__all-btn--view">View</button>
            <button class="employees__all-btn employees__all-btn--edit">Edit</button>
            <button class="employees__all-btn employees__all-btn--delete">Delete</button>
          <div>
        </li>`;
		});

		employeeListContainer.innerHTML = '';
		employeeListContainer.append(list);
	};

	/**
	 * Common hanldler for all actions
	 * @param {*} e event
	 * @returns
	 */
	const handleActions = (e) => {
		// dom vars
		const clickedElem = e.target;
		const clickedClassList = clickedElem.classList;
		const clickedElemParent = clickedElem.parentElement.parentElement;

		// clicked elem data object
		const clickedElemData = employeeData.find((emp) => {
			return Number(emp.id) === Number(clickedElemParent.id);
		});

		// if not clicked on button then return
		if (!clickedClassList.contains('employees__all-btn')) {
			return;
		}

		if (clickedClassList.contains('employees__all-btn--view')) {
			// VIEW Action
			handleViewAction(clickedElemData, clickedElemParent);

			//prettier-ignore
		} else if (clickedClassList.contains('employees__all-btn--delete')) {
			// DELETE Action
			employeeData = employeeData.filter(
				(emp) => Number(emp.id) !== Number(clickedElemParent.id)
			);
			renderEmployeeList();
			attachActionEvent();
			initViewEmployee();

			//prettier-ignore
		} else if (clickedClassList.contains('employees__all-btn--edit')) {
			handleEditBtnClick(clickedElemData, clickedElemParent.id);
		}
	};

	/**
	 * To display selected employee in View Employee view
	 * @param {*Object} selectedEmployee data object from employeeData
	 */
	const handleViewAction = (selectedEmployeeData, clickedElemParent) => {
		const prevSelected = document.querySelector('.employees__all-list-item.selected');
		prevSelected && prevSelected.classList.remove('selected');
		clickedElemParent.classList.add('selected');

		const singleCard = document.createElement('div');
		singleCard.classList.add('employees__single-card');

		singleCard.innerHTML = `
			<h3 class="employees__single-name">${selectedEmployeeData.employee_name}</h2>
			<div  class="employees__single-meta employees__single-meta--price">Age: <span>${selectedEmployeeData.employee_age}</span> years</div>
			<div  class="employees__single-meta employees__single-meta--salary">Salary: <span>${selectedEmployeeData.employee_salary}</span>$</div>
    	`;

		employeeSingleContainer.innerHTML = '';
		employeeSingleContainer.append(singleCard);
	};

	/**
	 * To select first row for view employee
	 */
	const initViewEmployee = () => {
		const firstEmpItem = document.querySelector('.employees__all-list-item');
		if (firstEmpItem) {
			firstEmpItem.classList.add('selected');
			handleViewAction(employeeData[0], firstEmpItem);
		} else {
			employeeSingleContainer.innerHTML = '';
		}
	};

	/**
	 * To common event listener for all row actions
	 */
	const attachActionEvent = () => {
		const actionButtons = document.querySelector('.employees__all-list');
		actionButtons.addEventListener('click', handleActions);
	};

	/**
	 * Reset modal data
	 */
	const resetModalData = () => {
		delete modalForm.dataset.editId;
		modalTitle.innerHTML = '';
		modalForm.id = 'modal-form';
		modalForm.reset();
		modal.classList.remove('active');
	};

	/**
	 * Close modal
	 * @param {*} e	event
	 */
	const handleCloseModal = (e) => {
		e.stopPropagation();
		if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close')) {
			resetModalData();
		}
	};

	/**
	 * Activate Add modal & add necessary info
	 */
	const handleAddBtnClick = () => {
		modalForm.id += ' add-form';
		modalTitle.innerHTML = 'Add Form';
		modal.classList.add('active');
	};

	/**
	 * Activate Edit modal & add necessary info
	 */
	const handleEditBtnClick = (rowData, parentId) => {
		// prefilling input values
		const name = document.querySelector('#employee_name');
		const age = document.querySelector('#employee_age');
		const salary = document.querySelector('#employee_salary');
		name.value = rowData.employee_name;
		age.value = rowData.employee_age;
		salary.value = rowData.employee_salary;

		// form related
		modalForm.id += ' edit-form';
		modalForm.dataset.editId = parentId;
		modalTitle.innerHTML = 'Edit Form';
		modal.classList.add('active');
	};

	/**
	 * On Modal form submit
	 * @param {*} e event
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const formId = e.target.id;
		const name = document.querySelector('#employee_name');
		const age = document.querySelector('#employee_age');
		const salary = document.querySelector('#employee_salary');

		const newRow = {
			employee_name: name.value,
			employee_age: age.value,
			employee_salary: salary.value,
		};

		if (formId.includes('add-form')) {
			newRow.id = Math.random();
			employeeData.unshift(newRow);

			//prettier-ignore
		} else if (formId.includes('edit-form')) {
			const id = modalForm.dataset.editId;
			const editIndex = employeeData.findIndex((row) => Number(row.id) === Number(id));
			const editParent = document.getElementById(id);

			employeeData[editIndex] = {
				...employeeData[editIndex],
				...newRow,
			};
		}

		resetModalData();
		renderEmployeeList();
		attachActionEvent();
		initViewEmployee();
	};

	// init
	renderEmployeeList(employeeData);
	initViewEmployee();
	attachActionEvent();

	// ADD employee btn
	addEmployeeBtn.addEventListener('click', handleAddBtnClick);

	// Modal Click for close
	modal.addEventListener('click', handleCloseModal);

	// Modal submit (common for add, edit)
	modalForm.addEventListener('submit', handleFormSubmit);
})();
