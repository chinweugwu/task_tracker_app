import React from 'react'
import { MdOutlineDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import EditTask from './EditTask';
 
const DisplayTasks = ({data, 
                        style1, style2, style3, style4, 
                        toggleActive, 
                        deleteTask, 
                        setData,
                        //toggleX,
                        //setToggleX,
                        setTask,
                        task,
                        handleChange,
                        user,
                        handleToggleX
                    }) => {

const navigate = useNavigate();

// function handleToggleX(item) {
//     console.log(item)
//     setToggleX(!toggleX)
// }

  return (
    <div className='intro_div'>
            <div id="dashboard_section">
                <h2 id="dashboard_h3">You have {data.length} Task{data.length == 1 ? "" : "s"}</h2>
                {data && data.map((item) => {
                    return (
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
                                <p>{item.description}</p>
                                <p className="due-p">Due by: <span>{item.due_date}</span></p>
                            </section>
                        </section>
                        {item.toggleX && 
                            <EditTask
                            //toggleX={toggleX}
                            //setToggleX={setToggleX}
                            task={task}
                            setTask={setTask}
                            item={item}
                            handleChange={handleChange}
                            setData={setData}
                            user={user}
                            handleToggleX={handleToggleX}
                            data={data}
                            />
                        } 
                        <section id="task-icons" style={!item.isActive ? style3 : style4}>
                            <MdOutlineModeEditOutline 
                            id="task-icon-edit"
                            onClick={() => {
                                handleToggleX(item)
                                setData(prevState => prevState.map(task => {
                                    if(task.id === item.id) {
                                        return {...task, toggleX: !task.toggleX}
                                    }else {
                                        return task
                                    }
                                }))
                            }}
                            />
                            <MdOutlineDeleteForever 
                            id="task-icon-delete"
                            onClick={() => {
                                deleteTask(item.id)
                            }}
                            />
                        </section>

                        
                    </div>
                    
                    )
                })
                }
            </div>
    </div>
  )
}

export default DisplayTasks
