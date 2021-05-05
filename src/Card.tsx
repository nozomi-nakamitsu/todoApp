import { FC, useRef,useContext} from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { XYCoord } from 'dnd-core'

import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import {CardsContext} from './Container'


const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: any
  name: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Card: FC<CardProps> = ({ id, name, index, moveCard }) => {
  const { cards, setCards } = useContext(CardsContext);
    // タスクにチェックつける
    const Checked = (id:number) => {
      var target =document.getElementsByClassName(`checkbox${id}`)
      console.log(target)
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

  
  // タスク削除
    const DeleteTask=(num :number)=>{
      const result: any[] = cards.filter((target:any) => ( target.id!=num))
      setCards(result)
    }
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <div className="todoItemArea">
      <div className="todoItem">
      < CheckBoxOutlinedIcon onClick={()=>UnChecked(id)} className={`checkbox${id} -checked` } style={{ cursor:"pointer"}}/>
      <CheckBoxOutlineBlankOutlinedIcon onClick={()=>Checked(id)} className={`checkboxBlank${id}` } style={{cursor:"pointer"}}/>
        <div style={{marginLeft:10}} className={`taskItem${id}`} >{name}</div>
        <DeleteIcon   onClick={()=>DeleteTask(id)} className="DeleteIcon"  style={{ cursor:"pointer"}}/>
      </div>
      <hr/>
    </div>
    </div>
  )
}
