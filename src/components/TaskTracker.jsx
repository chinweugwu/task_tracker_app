import React from 'react';
import {useState, useEffect} from 'react';
import DisplayTasks from './DisplayTasks';
import AddTask from './AddTask';
import { Link, useNavigate } from 'react-router-dom' 
import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    } from "firebase/firestore"; 
import { taskTrackerDB } from "../firebase";
import { UserAuth } from '../context/AuthContext';
import ActiveTask from './ActiveTask';
import CompleteTasks from './CompleteTasks';

const TaskTracker = () => {
    const [data, setData] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        isActive: true,
        createdBy: "",
        due_date: "",
        toggleX: false
    });
    const [active, setActive] = useState(false);
    const [complete, setComplete] = useState(false);
    const [all, setAll] = useState(true);
    const [editTask, setEditTask] = useState();
    const [toggleX, setToggleX] = useState(false);
    //To destructure variables from UserAuth imported above, 
    //Take the user to get access to the user object returned rom firebase
    const {user, logout} = UserAuth();


    const style1 = {
        backgroundColor : "#a0a3a1",
        color: "black"
    }
    const style2 = {
        backgroundColor: "#213547",
        color: "white",
        borderRadius: "10px",
        marginBottom: "5vh",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "-1px 11px 15px 0px rgba(0,0,0,0.75)"
    }
    const style3 = {
        display: "flex",
        borderLeft: "7px solid rgb(34, 197, 34)",
        paddingTop: "50px",
        fontSize: "30px",
        width: "15%",
        justifyContent: "space-around",
          
    }
    const style4 = {
        display: "flex",
        borderLeft: "7px solid rgb(231, 35, 35)",
        paddingTop: "50px",
        fontSize: "30px",
        width: "15%",
        justifyContent: "space-around",
          
    }
    //useEffect hook defines an async function that connects to the database to retrieve the data stored by a user if any
    // async function showData() {
    //     const querySnapshot = await getDocs(collection(taskTrackerDB, "tasks"));
    //         let tasksArr = [];
    //         querySnapshot.forEach((doc) => {
    //         tasksArr.push({...doc.data(), id: doc.id})
    //     });
    //     setData(tasksArr)
    //     console.log(tasksArr)
    // }
    // showData() 
    // useEffect(() => {
        async function showData() {
            const querySnapshot = await getDocs(collection(taskTrackerDB, "tasks"));
                let tasksArr = [];
                let document;
                querySnapshot.forEach((doc) => {
                    document = doc.data() 
                if(document.createdBy === user.uid) {
                    tasksArr.push({...document, id: doc.id})
                }  
            });
            setData(tasksArr)
        }
        showData()     
    // }, []);

    function handleChange(e) {
        const {name, value} = e.target
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }))
    }

    const toggleActive = async (item) => {
        await updateDoc(doc(taskTrackerDB, 'tasks', item.id), {isActive: !item.isActive});        
    }

    const deleteTask = async (item) => {  
        await deleteDoc(doc(taskTrackerDB, 'tasks', item));
    }

    const handleToggleX = async (item) => {
        await updateDoc(doc(taskTrackerDB, 'tasks', item.id), {toggleX: !item.toggleX});
    }

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/');
        } catch (e) {
            console.log(e.message)
        }
    }

  return (
    <div className="intro_div">
        <div id="greetUser">
                    <section id="greetUser-info">
                        <h1>Hello  <span>{user.email}</span></h1>   
                    </section>
                    <section id="greetUser-right">
                        <a href="#task_form">
                            <section id="dashboard_section_create">
                                <h3 id="dashboard_h3_create">Create Task</h3>
                            </section>
                        </a>
                        <section id="dashboard_section_create" onClick={handleLogout}>
                            <h3 id="dashboard_h3_create">Logout</h3>
                        </section>
                        
                    </section>   
        </div>
                <section id="app-nav">
                    <button onClick={() => {
                        setAll(!all)
                        setActive(false)
                        setComplete(false)
                    }}>All tasks</button>
                    <button onClick={() => {
                        setActive(!active)
                        setComplete(false)
                        setAll(false)
                    }}>
                        Active tasks
                    </button>
                    <button onClick={() => {
                       setComplete(!complete)
                       setActive(false)
                       setAll(false) 
                    }}>Completed</button>
                </section>
        {
        all && 
        <DisplayTasks
            data={data}
            style1={style1}
            style2={style2}
            style3={style3}
            style4={style4}
            toggleActive={toggleActive}
            deleteTask={deleteTask}
            setData={setData}
            toggleX={toggleX}
            setToggleX={setToggleX}
            task={task}
            setTask={setTask}
            handleChange={handleChange}
            user={user}
            handleToggleX={handleToggleX}
        />
        }
        {active && 
            <ActiveTask 
                data={data}
                style1={style1}
                style2={style2}
                style3={style3}
                style4={style4}
                toggleActive={toggleActive}
                deleteTask={deleteTask}
                setActive={setActive}
                setAll={setAll}
                setData={setData}
                />
         }
         {complete && 
            <CompleteTasks 
                data={data}
                style1={style1}
                style2={style2}
                style3={style3}
                style4={style4}
                toggleActive={toggleActive}
                deleteTask={deleteTask}
                setComplete={setComplete}
                setAll={setAll}
                setData={setData}  
                />
         }  
        <AddTask
             task={task}
             handleChange={handleChange}
             user={user}
             setData={setData}
             setTask={setTask}
        />
       
    </div>
  )
}

export default TaskTracker
