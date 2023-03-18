<template>
    <div class="container">
                <h1>Todo app</h1>
                <hr>
                <form>
                    <div class="form-todo form-group">
                        <p>
                            <input placeholder="title" type="text" name="title" class="form-control"  v-model="title"/>
                        </p>
                        <p>
                            <textarea placeholder="description" type="text" name="description" class="form-control"  v-model="description"></textarea>
                        </p>
                        <button @click="createTask" type="button" class="btn btn-primary">Save</button>
                    </div>
                </form>
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "task in tasks" v-bind:key = "task.id">
                        <th scope="row">{{ task.id }}</th>
                        <td>{{ task.title }}</td>
                        <td>{{ task.description }}</td>
                        <td><button  @click="deleteTask(task.id)" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                        <button @click="getOneTask(task.id)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pen-fill"></i></button></td>
                        </tr>
                    </tbody>
                </table>
                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Task</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            <input placeholder="title" type="text" name="title" class="form-control"  v-model="title4Update"/>
                        </p>
                        <p>
                            <textarea placeholder="description" type="text" name="description" class="form-control"  v-model="description4Update"></textarea>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button @click="updateTask()" type="button" class="btn btn-primary">Edit</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
</template>

<script>
import Task from '../services/tasks'

export default {
    name: 'Tasks',
    data(){
        return{
            
            tasks: [],
            
            title: '',
            description: '',

            id4Update: '',
            title4Update: '',
            description4Update: ''
        }
    },
    methods: {
        getAllTasks(){
            Task.listar().then((response) =>{
                this.tasks = response.data;
            });
        },
        createTask(){
            if(this.title.trim() === '' && this.description.trim() === ''){
                return;
            }
            Task.salvar(this.title, this.description).then((response) =>{
                this.tasks.push(response.data);
            })
            this.title = ''
            this.description = ''
        },
        deleteTask(id){
            var r = confirm("Deseja realmente apagar?");
            if(r == false){
                return;
            }
            Task.delete(id).then((response) =>{
                this.getAllTasks()
            })
        },
        updateTask(){
            Task.editar(this.id4Update, this.title4Update, this.description4Update).then((response) =>{
                this.getAllTasks()
            })
            this.title4Update= '';
            this.description4Update= '';
        },
        getOneTask(id){
            Task.getOne(id).then((response) =>{
                this.id4Update = response.data.id;
                this.title4Update = response.data.title;
                this.description4Update = response.data.description;
            })
        }
    },
    created(){
        this.getAllTasks()
    }
}
</script>