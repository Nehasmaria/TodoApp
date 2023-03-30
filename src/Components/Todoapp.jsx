import React,{useState, useRef, useEffect} from 'react'
import './Todoapp.css'
import {TbChecks} from 'react-icons/tb'
import {BiEditAlt} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'


function Todoapp() {
    const [todo,setTodo]=useState('')
    const [todos,setTodos]=useState([])
    const [editid, setEditid]=useState(0)

const addTodo =()=>{
    if(todo !== ''){
        setTodos([...todos,{id:Date.now(), text: todo, status : false}])
    console.log(todos)
    setTodo('')
    }
    if(editid){
        const editTodo =todos.find((todo)=>todo.id === editid)
        const updateTodo = todos.map((obj)=>obj.id === editTodo.id
        ? (obj={id: obj.id, text: todo}) : (obj={id: obj.id, text: obj.text}))
        setTodos(updateTodo)
        setEditid(0)
        setTodo('')
    }
}
const handleSubmit=(e)=>{
    e.preventDefault()
}

const inputRef = useRef('null')

useEffect(()=>{
    inputRef.current.focus();
})

const onDelete =(id)=>{
    setTodos(todos.filter((obj)=> obj.id !==id))
}

const onComplete =(id)=>{
    let complete = todos.map((text)=>{
        if(text.id === id){
        return ({...text, status: !text.status})
        }
        return text
    })
    setTodos(complete)
}

const onEdit = (id)=>{
    const editTodo = todos.find((obj)=> obj.id === id)
    setTodo(editTodo.text)
    setEditid(editTodo.id)
}

  return (
    <div className='container'>
       <div className='head'>
            <h1>
                <span className='emoj'>😉</span>
                <span className='todo'>TodoApp</span>
            </h1>
        </div>
        <div className='subhead'>
            <h3>Today's Plans For To Do </h3>
            
        </div>
      
            <form className='form-group'
            onSubmit={handleSubmit}>
                
                
                    <input type="text"
                    value={todo}
                    ref={inputRef}
                    onChange={(e)=>setTodo(e.target.value)}
                    placeholder='Type Your Plans...'
                    className='form-msg'/>

                    <button  className='but' onClick={addTodo}> {editid ? (<BiEditAlt id='editbut' />):(<IoMdSend id='send'/>)} </button>
                    
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((obj)=>(
                            <li className='list-items'>
                                <div className='list-item-list' id={obj.status ? 'list-item': ''}>{obj.text}</div>
                                <span>
                                <TbChecks 
                                onClick={()=>onComplete(obj.id)}
                                className='list-item-icons' 
                                id='complete' 
                                title='complete' />
                                <BiEditAlt 
                                onClick={()=>onEdit(obj.id)}
                                className='list-item-icons' 
                                id='edit' 
                                title='edit' />
                                <MdDelete
                                onClick={()=>onDelete(obj.id)}
                                className='list-item-icons' 
                                id='delete' 
                                title='delete' />
                                </span>
                            </li>
                        ))
                    }
                    
                </ul>
                
            </div>
    </div>
  )
}

export default Todoapp
