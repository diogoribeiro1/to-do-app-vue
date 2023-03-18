import {http } from './config'

export default{
    listar:() => {
        return http.get('tasks')
    },
    salvar:(titlePay, desc) => {
        return http.post('tasks', {title: titlePay, description: desc})
    },
    delete:(idPayload) => {
        return http.delete(`tasks/${idPayload}`)
    },
    getOne:(idPayload) => {
        return http.get(`tasks/${idPayload}`)
    },
    editar:(idPayload, titlePayload, desc) => {
        return http.put(`tasks/${idPayload}`, {title: titlePayload, description: desc})
    }
}