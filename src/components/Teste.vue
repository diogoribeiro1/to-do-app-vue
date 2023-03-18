<template>
    <div class="app-container">
        <h1 class="app-header">To do list</h1>

        <div class="add-task">
            <input v-model="title" type="text" placeholder="Add new Task" class="task-input">
            <input @click="createTask" type="submit" value=" " title="Add Task" class="submit-task">
        </div>

        <ul class="task-list" v-for="task in tasks" v-bind:key="task.id">
            <li class="task-list-item">
                <label class="task-list-item-label">
                    <input type="checkbox">
                    <span>{{task.title}}</span> 
                </label>
                <span @click="getOneTask(task.id)" class="update-btn" title="Update Task" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></span>
                <span @click="deleteTask(task.id)" class="delete-btn" title="Delete Task"></span>
            </li>
        </ul>
    </div>
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

<style>
    *{
        box-sizing: border-box;
    }

    :root{
        --checkbox-color: rgb(202, 60, 60);
        --checkbox-shadow: rgba(238, 156, 167, 0.2);
        --add-button: rgba(255, 255, 255, 0.7);
        --add-button-shadow: rgba(238, 156, 167, 0.4);
    }

    body{
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: 
        linear-gradient(62deg, rgba(7, 86, 160, 0.973) 13%, rgba(255, 122, 151, 0.5) 4%),
        linear-gradient(44deg, rgba(0, 43, 99, 0.079) 39%, rgba(242, 140, 143, 0.5) 18%),
        linear-gradient(118deg, rgba(84, 202, 242, 0.031) 40%, rgba(247, 155, 187, 0.5) 54%),
        linear-gradient(58deg, rgba(90, 90, 237, 0.161) 83%, rgba(249, 156, 142, 0.5) 23%);
        background-blend-mode: normal, lighten, multiply, hard-light;
        font-family: "DM Sans", sans-serif;
        overflow: hidden;       
    }

    input{
        outline: none;
    }

    ul{
        list-style: none;
        padding: 0;
    }

    .app-container{
        max-width: 480px;
        width: 100%;
        max-height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 25px;
        border-radius: 25px;
        overflow: auto;
        color: #222;
    }

    .app-header{
        font-size: 20px;
        line-height: 32px;
        margin: 0 0 12px 0;
        color: #272727;
    }

    .submit-task{
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border: none;
        background: var(--add-button);
        color: #272727;
        background-image: url(src/assets/circle.png);
        background-size: 18px;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 12px 0 var(--add-button-shadow);
    }

    .add-task{
        height: 40px;
        font-size: 14px;
        display:  flex;
    }

    .task-input{
        width: 100%;
        padding: 0 5px;
        outline: none;
        border: none;
        border-bottom: 1px solid #272727;
        background-color: transparent;
        margin-right: 15px;
        color: #272727;
        box-shadow: none;
        border-radius: 0;
    }

    .task-input::placeholder{
        color: #272727;
    }

    .task-list-item{
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 35px;
        margin-bottom: 12px;
    }

    .task-list-item input{
        width: 16px;
        height: 16px;
        border: 1px solid #272727;
        border-radius: 50%;
        background-image: url("check.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0;
        transition: 0.2s;
        margin-right: 8px;
        flex-shrink: 0;
        margin-top: 4px;
        appearance: none;
    }

    .task-list-item input:hover{
        border-color: var(--checkbox-color);
        box-shadow: 0 0 0 3px var(--checkbox-shadow);
    }

    .task-list-item input:checked{
        background-size: 10px;
        border: 1px solid var(--checkbox-color);
        background-color: var(--checkbox-color);    
    }

    .task-list-item input:checked + span{
        color:  #272727;
        text-decoration: line-through #272727;
    }

    .task-list-item-label {
        display: flex;
        align-items: flex-start;
        color: #272727;
        margin-right: 8px;
        font-size: 14px;
        line-height: 24px;
        position: relative;
        transition: 0.2s;
        cursor: pointer;
    }

    .delete-btn{
        margin-left: auto;
        margin-right: 5px;
        display: block;
        width: 16px;
        height: 16px;
        background-image: url(src/assets/trash-can.png);
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: center;
        cursor: pointer;
    }

    .update-btn{
        margin-left: auto;
        margin-right: -100px;
        display: block;
        width: 16px;
        height: 16px;
        background-image: url(src/assets/edit.png);
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: center;
        cursor: pointer;
    }

</style>