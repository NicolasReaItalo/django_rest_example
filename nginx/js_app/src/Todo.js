class Todo
{

	 getTasks() {
		return [ {
			text: "Je suis une tache",
			done: false,
			editMode: false
		},
		{
			text: "Je suis une autre tache",
			done: true,
			editMode: true
		},];
	}

	displayTasks(tasklist){
		const ul = document.querySelector('ul');
		ul.innerHTML = '';
		for (let task of tasklist)
		{
			const li = document.createElement('li');
			li.innerHTML = `
			<span class="todo ${task.done? "done":""}"></span>
			<p>${task.text}</p>
			`
			ul.append(li);
		}
	}
}


export {Todo};
