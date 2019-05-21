import React, { useState, Fragment } from 'react'
import ReactDom from 'react-dom'

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
    text: string
    complete: boolean
}

export default function App():JSX.Element {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (event : FormElem):void => {
        event.preventDefault()
        addTodo(value)
        setValue('')
    }

    const addTodo = (text: string):void => {
        const newTodos: ITodo[] = [...todos, {text, complete:false}]
        setTodos(newTodos)
    }

    const completeToddo = (index:number):void => {
        console.log('we are here')
        const newTodos = todos.map((todo, index1) => {
            if(index==index1){
                todo.complete=!todo.complete
            }
            return todo
        })
        setTodos(newTodos)

    }
    return (
        <div>
            <p>This is from typescript own configuration</p>
            <br />
            <form onSubmit={handleSubmit}>
                <label>This is a form</label>
                <br />
                <input type='text' value={value} onChange={(event) => setValue(event.target.value)} required />
                <button type='submit'>Add To Do</button>
            </form>

            <p>This is Todos</p>
            <br />
            <div>
                {JSON.stringify(todos)}
            {todos.map((todo:ITodo, index:number) => {
                return (
                    <Fragment key={index} >
                        {todo.complete ? null : todo.text}
                        <button type='button' onClick={() => completeToddo(index)}>
                        { '' }
                        {todo.complete ? 'complete' : 'incomplete'}
                        </button>
                    </Fragment>
                )
            })}
            </div>
        </div>
    )
}

const root = document.getElementById('app-root')

ReactDom.render(<App />, root)
