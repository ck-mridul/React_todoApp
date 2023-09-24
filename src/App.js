import React from 'react';
import './App.css';
import { useState,useEffect } from 'react';


function App() {
  const [toDos,setToDos] = useState(()=>{
  const localValue = localStorage.getItem("Todos");
  if (localValue===null) return[];
  return JSON.parse(localValue);
  });
  
  const [toDo,setToDo] = useState('')
  const [state, setstate] = useState(false);

  useEffect(()=>{
    localStorage.setItem("Todos",JSON.stringify(toDos));
  },[toDos]);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h3>Add your Task </h3>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{
          const textExists = toDos.some(todo=> todo.text === toDo);
          if(!textExists){
            if(toDo.length===0){
              return <h4>hi</h4>
            }else{
              setToDos([...toDos,{id: Date.now(), text: toDo,status:false}])
              setToDo("")
            }
          }else{ alert(toDo+" already exists!");
        }}} className="fas fa-plus"></i>
      </div>
      <br/>
      <h4 onClick={()=>{
        setToDos([])
      }}>clear all task</h4>

      
      <br/><br/>
  {toDos.length > 0 ? <h4>Active Task</h4>: <h4>No Task</h4>}
      <div className="todos">
        { toDos.map((value,index)=>{
          return(
          <div key={index} className="todo">
          <div className="left">
            <input onChange={(e)=>{
           
              setToDos(toDos.filter(obj=>{
                if (obj.id===value.id){
                  obj.status=e.target.checked
                }
                return obj
              }))
              }} checked={value.status} type="checkbox" name="" id="" />
            <p>{value.text}</p>
          </div>
          <div className="right">
            <i onClick={()=>{setToDos((obj)=>obj.filter((obj2)=>
               obj2.id !== value.id

          ))}} className="fas fa-times"></i>
          </div>
        </div>
        )})}
<br/><br/>
    <h4 onClick={()=>setstate(!state)}>Complited Task</h4>
        {state && toDos.map((obj,index)=>{
          if(obj.status){
            return(<h3 key={index} >{obj.text}</h3>)
          }
          return null
        })
        }
      </div>
    </div>
  );
}

export default App;