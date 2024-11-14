const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

form.addEventListener('submit',(event) =>{
	event.preventDefault();
	const value = input.value;
	input.value ='';
	addTodo(value);
	displayTodo();

})

const todos = [
	{
		text: "Je suis une tache",
		done: false,
		editMode: false
	},
	{
		text: "Je suis une autre tache",
		done: true,
		editMode: true
	},
];


const displayTodo = () => {
	const todoNodes = todos.map((todo, index)=>{
		if (todo.editMode === true)
			return todoCreateEditElement(todo, index);
		else
			return createTodoElement(todo, index);
	});
	ul.innerHTML = '';
	ul.append(...todoNodes);
}

const createTodoElement = (todo, index) =>
{
	const li = document.createElement("li");
	const buttonDelete = document.createElement("button");
	const buttonEdit = document.createElement("button");
	const span = li.querySelector('span');
	buttonDelete.innerHTML = 'Supprimer';
	buttonDelete.addEventListener('click', (event)=> {
		event.stopPropagation();
		deleteTodo(index);
	})
	buttonEdit.innerHTML = 'Edit';
	buttonEdit.addEventListener('click', (event) => {
		event.stopPropagation();
		toggleEditMode(index);
	});


	li.innerHTML = `
		<span class="todo ${todo.done? "done":""}"></span>
		<p>${todo.text}</p>
	`;
	li.addEventListener('click',(event)=>{
		todos[index].done = !todos[index].done;
		displayTodo();
	});
	li.appendChild(buttonDelete);
	li.appendChild(buttonEdit);

	return li;
}


const todoCreateEditElement  = (todo, index) => {
	const li = document.createElement("li");
	const input = document.createElement('input');
	const buttonSave = document.createElement('button');
	const buttonCancel = document.createElement('button');
	input.type= 'text';
	input.value = todo.text;
	buttonSave.innerHTML = 'Save';
	buttonCancel.innerHTML = 'Cancel';
	buttonCancel.addEventListener('click',(event)=>
	{
		event.stopPropagation();
		toggleEditMode(index);
	});
	buttonSave.addEventListener('click',(event) => {
		editTodo(index,input);

	} )
	li.append(input, buttonCancel,buttonSave);
	return li;
}


const editTodo= (index, input) => {
	const value = input.value;
	todos[index].text = value;
	todos[index].editMode = false;
	displayTodo();
}


const addTodo = (text) => {
	todos.push({
		text: text,
		done: false
	})
	console.log(todos);
}


const deleteTodo = (index) =>{
	todos.splice(index,1);
	displayTodo();
}

const toggleEditMode = (index) => {
	todos[index].editMode = !todos[index].editMode;
	displayTodo();
}

displayTodo()
