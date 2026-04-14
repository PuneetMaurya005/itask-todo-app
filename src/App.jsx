import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { FaEdit } from "react-icons/fa"
import { RiDeleteBinFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

import {v4 as uuidv4} from 'uuid';

 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])

  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)

  }
   const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
   }
    
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
  }
  
  const handleAdd = () => {
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
      // console.log(todos)
      saveToLS()
    }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
 
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="text-3xl text-center font-bold">iTask - Manage Your Todos At One Place</h1>
        <div className="addTodo  flex flex-col gap-4 my-7">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>

          <div className="flex"> 
          <input onChange={handleChange}value={todo} className="bg-slate-100 w-full rounded-full px-5 py-1" type="text"  />
          <button onClick={handleAdd} disabled = {todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 p-2 py-1 mx-2 text-sm font-bold text-white rounded-full flex justify-center items-center gap-2'>Save< FaSave size={15} /></button>
        </div>
        </div>
        <input className= "my-5" onChange = {toggleFinished} type="checkbox" checked = {showFinished} id="show" /> <label className = "mx-2" htmlFor="show">Show Finished</label> <hr />
        <h2 className='text-2xl font-bold'>Your Todo</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold '>NO TODOS TO DISPLAY </div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div  key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked = {item.isCompleted}/>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-2 text-sm font-bold text-white rounded-md mx-1'><FaEdit size = {15} /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-2 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBinFill size= {15} /></button>
              </div>
            </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App;