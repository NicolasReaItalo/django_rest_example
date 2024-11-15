class Todo
{

    constructor() {
        this._handleDelete = this._handleDelete.bind(this);
        this._handlePost = this._handleAdd.bind(this);
        this._handleToggle = this._handleToggle.bind(this);

        const form = document.querySelector('form');

        form.addEventListener('submit', this._handlePost)
    }
    _handleDelete(event) {
        event.stopPropagation();
        const li = event.target.closest('li');
        const taskId = li.getAttribute('data-id');
        this.deleteTask(taskId);
        }
    _handleAdd(event) {
        event.stopPropagation();
        event.preventDefault();
        const input = document.querySelector('form > input');
        this.AddTask(input.value);
        input.value = '';
        this.refresh();
        }

	async AddTask(title_value){
		try {
			const response = await fetch(`/api/todos/`,
			{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({title: title_value})
		});
			}
		catch {
			//bon bah on verra
		}
		this.refresh();
	}

    _handleToggle(event) {
        event.stopPropagation();
        const li = event.target.closest('li');
        const taskId = li.getAttribute('data-id');
		const span = li.querySelector('span');
		const title = li.querySelector('p').textContent;

		const status = span.dataset.completed === "true" ? false: true ;
		this.toggleStatus(taskId, status, title);

        }


	async toggleStatus(taskId, status, title)
	{
		try {
			const response = await fetch(`/api/todos/${taskId}/`,
			{
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({title: title,completed: status})
		});
			}
		catch {
			//bon bah on verra
		}
		this.refresh();
	}

    async deleteTask(id)
    {

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE' })
            console.log(response);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données");}


        }
        catch {
            console.error(`Erreur lors de  la suppression de la tâche : ${id}`, error);
        }
        this.refresh();
    }




    async getTasks() {
        try {
            const response = await fetch("/api/todos/");
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données");
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error("Les données reçues ne sont pas un tableau");
            }
            return data;
          } catch (error) {
            console.error("Erreur dans la récupération des tâches :", error);
          }
    }




    _createTodoElement(task)
        {
            const li = document.createElement("li");
            li.dataset.id = task['id'];
            const span = document.createElement("span");
            const buttonDelete = document.createElement("button");
            const buttonEdit = document.createElement("button");
            const title = document.createElement('p');
            title.className = "title";
            title.textContent = task['title'];
            buttonDelete.innerHTML = 'Supprimer';
            buttonDelete.addEventListener('click', this._handleDelete)
            span.dataset.completed = task.completed;

            li.appendChild(span);
            li.appendChild(title);
            li.addEventListener('click', this._handleToggle);
            li.appendChild(buttonDelete);
            // li.appendChild(buttonEdit);

            return li;
        }

    async refresh()
        {
            try {

                const t = await this.getTasks();
                this.displayTasks(t);
            }
            catch {
                console.error("Erreur lors de la récupération des tâches :", error);
                //ajouter affichage erreur sur le dom
            }

        }


    displayTasks(tasklist){
        const ul = document.querySelector('ul');
        ul.innerHTML = '';
        tasklist.forEach(task => {
            const li = this._createTodoElement(task)
            ul.appendChild(li);
        });
    }



}


export {Todo};


/*


*/
