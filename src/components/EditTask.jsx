import React from 'react';
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { taskTrackerDB } from "../firebase";


const EditTask = ({task,
                   handleChange,
                   item,
                   user,
                   setData,
                   handleToggleX,
                   data,
                   setTask,
                }) => {
    
const handleEdit = async (e) => {
    e.preventDefault()
    await updateDoc(doc(taskTrackerDB, 'tasks', item.id), {
        title: task.title,
        description: task.description,
        isActive: true,
        createdBy: user.uid,
        due_date: task.due_date,
        toggleX: false
    });

    setTask(prevState => {
        return {...prevState,
            title: "",
            description: "",
            due_date: ""}
             
    })
    console.log(data)
}

   

  return (
    <div>
        <form id="edit-form" onSubmit={handleEdit}>
            <MdOutlineClose className="close-edit-form" onClick={() => {
                                handleToggleX(item)
                                setData(prevState => prevState.map(task => {
                                    if(task.id === item.id) {
                                        return {...task, toggleX: !task.toggleX}
                                    }else {
                                        return task
                                    }
                                }))
                            }}></MdOutlineClose><br/>

            <input 
           type="text" 
           id="task_title"
           className='edit-form-field'
           name="title"
           placeholder={item.title}
           value={task.title}
           onChange={handleChange}
            /><br />

            <input 
            type="text" 
            placeholder={item.description}
            id="task_title"
            className='edit-form-field'
            name="description"
            value={task.description}
            onChange={handleChange}
            /><br />

            <input 
            type="text"
            id="task_title"
            className='edit-form-field'
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            placeholder={item.due_date}
            /><br />

            <button type='submit' className='edit-form-field'>Save changes</button>
        </form>
    </div>
  )
}

export default EditTask
