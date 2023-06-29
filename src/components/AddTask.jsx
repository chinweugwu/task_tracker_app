import React from 'react';
import { 
    collection,  
    addDoc
    } from "firebase/firestore"; 
import { taskTrackerDB } from "../firebase";

const AddTask = ({task, handleChange, user, setTask}) => {

        const submitTask = async (e) => {
        e.preventDefault()
        if(task.title == "") {
            alert("Pls enter a task")
        } 
        else {
            const docRef = await addDoc(collection(taskTrackerDB, 'tasks'), {
            title: task.title,
            description: task.description,
            isActive: true,
            createdBy: user.uid,
            due_date: task.due_date,
            toggleX: false
            });
            console.log("Document written with ID: ", docRef.id)

            setTask(prevState => {
                return {...prevState,
                    title: "",
                    description: "",
                    due_date: ""}       
            })   
        } 
         
}
  return (
    <div>
        <div className="create_div">
                <h1 id="add_task_h1">Add a new task</h1>
                <form id="task_form" onSubmit={submitTask}>
                    <section id="form_field">
                        <label htmlFor="task_title" id="title_label">Title:</label><br />
                        <input 
                            type="text" 
                            id="task_title"
                            name="title"
                            placeholder='Enter a task'
                            value={task.title}
                            onChange={handleChange}
                        /><br />
                    </section>
                    <section id="form_field">
                        <label htmlFor="task_description" id="desc_label">Description:</label><br />
                        <textarea 
                            id="desc" 
                            name="description"
                            placeholder='Describe your task (optional)'
                            value={task.description}
                            onChange={handleChange}
                        ></textarea><br />
                    </section>
                    <section id="form_field">
                        <label htmlFor="task_description" id="desc_label">Due by:</label><br />
                        <input type="text" 
                            id="form-date"
                            name="due_date"
                            value={task.due_date}
                            onChange={handleChange}
                            placeholder='mm/dd/yyyy'
                        /><br />
                    </section>
                    
                    <button type='submit'>Submit</button>
                </form>
            </div>
    </div>
  )
}

export default AddTask
