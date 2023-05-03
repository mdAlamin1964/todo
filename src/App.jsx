import React from "react"
import { nanoid } from "nanoid"
import "./main.css"
export default function App() {
  const [task, setTask] = React.useState([])
  const [input, setInput] = React.useState("")
  const [time, setTime] = React.useState(timeFunc)
  const [show, setShow] = React.useState(false)
  const [taskTime, setTaskTime] = React.useState("")

  // setting show
  function showFunc() {
    setShow(!show)
  }

  // setting time
  function timeFunc() {
    let date = new Date()
    let hour = date.getHours() > 12? date.getHours() - 12: date.getHours()  
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let con = date.getHours() >= 12? "pm": "am" 
  
    return ({
      hour: hour,
      minute: minute,
      second: second,
      con: con
    })
  }

  React.useEffect(() => {
    const interval = setInterval(()=> {
      setTime(timeFunc)
    }, 1000)

    return () => clearInterval(interval)
  },[])



  // input 
  function updateInput(event) {
    event.preventDefault()
    setInput(event.target.value)
  }


  function handleKey(event) {
    if (event.key == 'Enter') {
      addTask()
    }
  }

  // adding task to the array element
  function addTask() {
    if (input) {
      setTask(prevTask => [
        ...prevTask,
        input
      ])
    }
    setInput("")
    setTaskTime(`${time.hour}: ${time.minute} ${time.con}`)
  }

  // removing task
  function removeTask(value) {
    setTask(prevTask => 
        prevTask.filter(n => n !== value)
      )
  }

  const taskElement = task.map(n => {
    return (
      <li
        key={nanoid()}
      >
        <div className="main-menu-time">{taskTime}</div>
         {n} 
        <span className="main-menu-remove" 
              onClick={()=> removeTask(n)}
        >🗑</span>
      </li>
    )
  })

  return (
    <div className="container">
      {/* Time */}
      <div className="time">
        <h1><span className="time-hour">{time.hour}</span>:<span className="time-minute">{time.minute}</span>:<span className="time-second">{time.second}</span><span className="time-con">{time.con.toUpperCase()}</span></h1>
      </div>

      <div className="main">
        {/* Header area */}
        <div className="main-header">
          <div className="main-header-text">
            Note
          </div>
        </div>

        {/* Add task remove task */}
        <div className="main-btn">
          <button className="main-btn-add"
            onClick={showFunc}
          >
           { !show ? "New Task" : "Done"}
          </button>
        </div>

        {/* input task */}
        {show 
        &&

        <div className="main-input">
          <input type="text" 
                  className="main-input-task" 
                  onChange={updateInput}
                  value={input}
                  onKeyDown={handleKey}
          />
          <button 
            className="main-input-submit"
            onClick={addTask}
            >Add to task</button>
        </div>

        }


        {/* Menu area */}
        <div className="main-menu">
          <ul>
            {taskElement}
          </ul>
        </div>
      </div>
    </div>
  )
} 