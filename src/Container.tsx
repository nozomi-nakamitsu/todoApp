import React,{ FC, useState, useCallback,useContext } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'

import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
const style = {
  width: 400,
}

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
    // インプットタグ入力フォーム値取得
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setTask(() => event.target.value)
      console.log(task)
    }
    // タスク追加
    const addtask=()=>{
      var TaskIdArray=cards.map(v=>v.id)
      var lastTaskID=TaskIdArray.slice(-1)[0]
      setCards([...cards,{id: lastTaskID+1, name: task}]);
      setTask("")
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

    return (
  <>
  <div className= "Container">
  <div className="header">
    <div className="">のぞみのやることリスト</div>
    <div className="headerItem" onClick={()=> DeleteAllTask()}>全削除</div>
  </div>
  <hr/>
   <CardsContext.Provider value={{cards,setCards}}>
    {cards.length!=1?
    <div style={style}>{cards.map((card:any , i:number) => renderCard(card, i))} </div>
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
