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
          setToDos([...toDos,{id: Date.now(), text: toDo,status:false}])}else{ console.log("Text already exists!");
        }}} className="fas fa-plus"></i>
      </div>
      
      <br/><br/>
      <h4>Active Task</h4>
      <div className="todos">
        { toDos.map((value,index)=>{
          return(
          <div key={index} className="todo">
          <div className="left">
            <input onChange={(e)=>{
              console.log(e.target.checked)
              console.log(value)
              setToDos(toDos.filter(obj=>{
                if (obj.id===value.id){
                  obj.status=e.target.checked
                }
                return obj
              }))
              }} value={value.status} type="checkbox" name="" id="" />
            <p>{value.text}</p>
          </div>
          <div className="right">
            <i onClick={()=>{setToDos((obj)=>obj.filter((obj2)=>
               obj2.id !== value.id

          ))}} className="fas fa-times"></i>
          </div>
        </div>
        )})}
        {toDos.map((obj,index)=>{
          if(obj.status){
            return(<h1 key={index} >{obj.text}</h1>)
          }
          return null
        })}
      </div>
    </div>
  );
}

export default App;