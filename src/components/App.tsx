import React,{useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import './App.css';
import DragAndDrop from './DragAndDrop';



const App = () => {
  const [tasks, setTasks] = useState([{ id: 0, name: "" }]);
  const [task, setTask] = useState("");
  // インプットタグ入力フォーム値取得
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTask(() => event.target.value)
    console.log(task)
  }
  // タスク追加
  const addtask=()=>{
    var TaskIdArray=tasks.map(v=>v.id)
    var lastTaskID=TaskIdArray.slice(-1)[0]
    setTasks([...tasks,{id: lastTaskID+1, name: task}]);
    setTask("")
  }
  // タスク削除
    const DeleteTask=(id :number)=>{
      const result = tasks.filter(target => target.id!= id);
      setTasks(result)
    }
  // タスク全削除
    const DeleteAllTask=()=>{
      setTasks([])
    }
  // タスクにチェックつける
  const Checked = (id:number) => {

    var target =document.getElementsByClassName(`checkbox${id}`)
    target[0].classList.remove("-checked")
    var target =document.getElementsByClassName(`checkboxBlank${id}`)
    target[0].classList.add("-checked")
    var target =document.getElementsByClassName(`taskItem${id}`)
    target[0].classList.add("-checkedSentence")
    
  }
  // タスクにチェック外す
  const UnChecked = (id:number) => {
    var target =document.getElementsByClassName(`checkbox${id}`)
    target[0].classList.add("-checked")
    var target =document.getElementsByClassName(`checkboxBlank${id}`)
    target[0].classList.remove("-checked")
    var target =document.getElementsByClassName(`taskItem${id}`)
    target[0].classList.remove("-checkedSentence")
  }
  // エンタキー押した時にタスク追加
  const keyPress=(e :any)=>{
    if(e.keyCode == 13){
      addtask()
     
    }
  }

  return (
<>

<div className= "Container">
  <div className="header">
    <div className="">のぞみのやることリスト</div>
    <div className="headerItem" onClick={()=>DeleteAllTask()}>全削除</div>
  </div>
  <hr/>
  {/* タスク一覧 */}
  <div className="main">
{ 
tasks.map((taskItem, index)=>{
  if(index !=0)
  return(
    <div className="todoItemArea">
      <div className="todoItem">
      < CheckBoxOutlinedIcon onClick={()=>UnChecked(taskItem.id)} className={`checkbox${taskItem.id} -checked` } style={{ cursor:"pointer"}}/>
      <CheckBoxOutlineBlankOutlinedIcon onClick={()=>Checked(taskItem.id)} className={`checkboxBlank${taskItem.id} ` } style={{cursor:"pointer"}}/>
        <div style={{marginLeft:10}} className={`taskItem${taskItem.id}`} >{taskItem.name}</div>
        <DeleteIcon onClick={()=>DeleteTask(taskItem.id)} className="DeleteIcon"  style={{ cursor:"pointer"}}/>
      </div>
      <hr/>
    </div>
  )
})
}
    {/* inputタグ */}
    <div className="Input">
    < CheckBoxOutlineBlankOutlinedIcon />
      <div className="cp_iptxt">
      <label className="ef">
      <input type="text" onChange={(e)=>handleChange(e)} value={task} placeholder="タスクを入力!"  onKeyDown={(e)=>keyPress(e)}/>
      </label>
    </div>
    </div>
    <hr/>
  </div>
  <div className="footer">
    <AddIcon className="addIcon" onClick={()=>addtask()}/>
  </div>
</div>
<DragAndDrop/>
</>

  );
}



export default App;