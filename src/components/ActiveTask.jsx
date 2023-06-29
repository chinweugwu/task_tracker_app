import React from 'react'
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";

const ActiveTask = ({data, 
                    style1, style2, style3, style4, 
                    toggleActive, 
                    deleteTask,
                    setData
                    }) => {
  return (
    <div className="screen-min-height">
            <h2 id="dashboard_h3">Active tasks</h2>
            {data.map(item => {
                if(item.isActive) {
                    return(
                        <div 
                        key={item.id} 
                        id="task-title"
                        style={!item.isActive ? style1 : style2}
                        >
                        <section>
                            <section id="task-body">
                                <div id="task-body-div">
                                    <h3 
                                    id="task-h3"
                                    onClick={() => toggleActive(item)}
                                    >{item.title}</h3>
                                    <input 
                                        type="checkbox" 
                                        id="checkmark"
                                        checked={!item.isActive ? 'checked' : ''}
                                        onChange={() => {
                                            toggleActive(item)
                                            setData(prevState => prevState.map(task => {
                                                if(task.id === item.id) {
                                                    return {...task, isActive: !task.isActive}
                                                }else {
                                                    return task
                                                }
                                            }))
                                        }}
                                    />
                                </div>    
                                <p>{item.description}</p><br />
                                <p className="due-p">Due by: <span>{item.due_date}</span></p>
                            </section>
                        </section>
                        <section id="task-icons" style={!item.isActive ? style3 : style4}>
                            <MdOutlineDeleteForever 
                            id="task-icon-delete"
                            onClick={() => {
                                deleteTask(item.id)
                            }}
                        />
                        </section> 
                    </div>
                    );
                }
            })}
    </div>
  )
}

export default ActiveTask
