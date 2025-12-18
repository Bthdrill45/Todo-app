import { useState, useEffect } from 'react'

import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
useEffect(() => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    settodos(JSON.parse(saved));
  }
}, []);


useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


  const Handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });


    settodos(newTodos)
    
  }
  const togglefinish = (e) => {
    setshowfinished(!showfinished)

  }

  const HandleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    });


    settodos(newTodos)
   
  }
  const Handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompletes: false }])
    settodo("")
    console.log(todo)
    
  }
  const Handlechange = (e) => {
    settodo(e.target.value)
    
  }
  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompletes = !newTodos[index].isCompletes;
    settodos(newTodos)
    
  }



  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 md:rounded-xl p-5 bg-violet-50 min-h-[70vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl '>iTask-Mange your todos at this place</h1>
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={Handlechange} value={todo} type="text" className='bg-white w-3/5 rounded-lg px-5' />
          <button onClick={Handleadd} disabled={todo.length <= 3} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white disabled:bg-violet-200 rounded-md mx-1 word-wrap'>Save</button>
        </div>
        <input onChange={togglefinish} type="checkbox" checked={showfinished} className='accent-violet-600' id="" /> Showfinished
        <h2 className='text-lg font-bold'>
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && <div className='text-sm m-4'> No todos here</div>}
          {todos.map(item => {


            return(showfinished || !item.isCompletes)&& <div key={item.id} className="todo flex md:w-1/2 justify-between my-4">
              <div className='flex gap-2'>

                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompletes} id="" />
                <div className={item.isCompletes ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { Handleedit(e, item.id) }} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
                <button onClick={(e) => { HandleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete />
</button>
              </div>

            </div>
          })}

        </div>


      </div>
    </>
  )
}

export default App
