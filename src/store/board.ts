import { writable } from "svelte/store"
import type { Board, Task, Todo } from "../types"
import { colors } from "$lib"
import { add_task_modal_is_visible } from "."

const new_board: Board = {
    id:1,
    name:"Prima",
    tasks:[]
}

const board = writable<Board>(new_board)

const tabula_data = (() =>{
    if( localStorage.getItem("tabula_data")!==null ){
        return JSON.parse(localStorage.getItem("tabula_data") as string) as Board
    }else{
        localStorage.setItem("tabula_data", JSON.stringify(new_board))
        return JSON.parse(localStorage.getItem("tabula_data") as string) as Board
    }
})()

board.set(tabula_data)

board.subscribe((value)=>{
    localStorage.setItem("tabula_data", JSON.stringify(value))
})    

export default board


export function add_task(){
    board.update((value)=>{
        const new_task: Task = {
            id : value.tasks.length+1,
            name:"",
            todos:[] as Todo[],
            posx:100,
            posy:100,
            color:colors[4]
        }
        value.tasks.push(new_task)
        return value
    })
}

export function remove_task(id:number){
    add_task_modal_is_visible.set(false)
    board.update((value)=>{
        value.tasks = value.tasks.filter(task=>task.id!==id)
        return value
    })
}

export function clear(){
    add_task_modal_is_visible.set(false)
    board.update(value=>{
        value.tasks = []
        return value
    })
}