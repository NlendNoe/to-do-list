class Tache {
    constructor(task) {
        this.task = task
        this.completed = false
    }
}

    class ToDoList {
        constructor() {
        this.taches = JSON.parse(localStorage.getItem('taches')) || []
        this.afficherTaches()
    }

    ajouterTache(tache) {
        this.taches.push(tache)
        this.sauvegarderTaches()
        this.afficherTaches()
    }

    supprimerTache(index) {
        this.taches.splice(index, 1)
        this.sauvegarderTaches()
        this.afficherTaches()
    }
    
    marquerCommeFait(index) {
        this.taches[index].completed = !this.taches[index].completed
        this.sauvegarderTaches()
        this.afficherTaches()
    }

    sauvegarderTaches() {
        localStorage.setItem('taches', JSON.stringify(this.taches))
    }

    afficherTaches() {
        const taskList = document.querySelector('#taskList')
        taskList.innerHTML = ''

        this.taches.forEach((tache, index) => {
        const li = document.createElement('li')
        if (tache.completed) {
            li.classList.add('completed')
        }
        const check = document.createElement('button')
        check.textContent = '✔️'
        
        li.appendChild(check)
        
        const texte=document.createElement('p')
        texte.textContent = tache.task;
        li.appendChild(texte)

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X'
        deleteBtn.classList.add('dell-btn')
        deleteBtn.addEventListener('click', () => {
            this.supprimerTache(index)
        })
        li.appendChild(deleteBtn)

        taskList.appendChild(li)

        check.addEventListener('click', () => {
            this.marquerCommeFait(index)
        })
    })
    }
}

    const todoList = new ToDoList()

    const taskInput = document.getElementById('taskInput')
    const addTaskBtn = document.getElementById('addTaskBtn')

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value
    if (taskText !== '') {
        todoList.ajouterTache(new Tache(taskText))
        taskInput.value = ''
    }
})