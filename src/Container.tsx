import React,{ FC, useState, useCallback} from 'react'
import { Card } from './Card'
import update from 'immutability-helper'
import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import  AlertComponent from './components/alert'


export interface Item {
  id: number
  text: string
}
export interface ContainerState {
  cards: Item[]
}
export const CardsContext = React.createContext<any | undefined>([undefined, () => {}]);
export const Container: FC = () => {
  {
    const [task, setTask] = useState("");
    const [cards, setCards] = useState([{ id: 0, name: "" },]);
    const [message, setMessage] = useState("")
    const [alert, setAlert] = useState("");
    // インプットタグ入力フォーム値取得
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTask(() => event.target.value)
    }
    // タスク追加
    const addtask=()=>{
      if (task!=""){
        setAlert("success")
        var TaskIdArray=cards.map(v=>v.id)
        var lastTaskID=TaskIdArray.slice(-1)[0]
        setCards([...cards,{id: lastTaskID+1, name: task}]);
        setTask("")
        setMessage("タスクを追加しました")
      }else{
        setAlert("error")
        setMessage("空欄のタスクは登録できません！")
      }
    }

    // エンタキー押した時にタスク追加
    const keyPress=(e :any)=>{
      if(e.keyCode == 13){
        addtask()
      }
    }
   // タスク全削除
   const DeleteAllTask=()=>{
    setCards([{ id: 0, name: "" },])
  }
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )

    const renderCard = (card: { id: number; name: string }, index: number) => {
      if(card.id !=0){
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          name={card.name}
          moveCard={moveCard}
        />
      )
    }
    }
    // アラート初期化メソッド
    const AlertResetFunc=()=>{
      setAlert("")
    }
    return (
  <>
  <div className= "Container">
  <div className="header">
    <div className="">のぞみのやることリスト</div>
    <div className="headerItem" onClick={()=> DeleteAllTask()}>全削除</div>
  </div>
  <hr/>
    <AlertComponent message={message} alert={alert}  AlertResetFunc={()=>AlertResetFunc()}/>
    <CardsContext.Provider value={{cards,setCards}}>
    {cards.length!=1?
    <div>{cards.map((card:any , i:number) => renderCard(card, i))} </div>
    :null} 
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
    <div className="footer">
      <AddIcon className="addIcon" onClick={()=>addtask()}/>
    </div>
    </CardsContext.Provider>
</div>
  </>
    )
  }
}
