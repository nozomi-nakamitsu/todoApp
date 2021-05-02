import React from 'react';
import './App.css';
import Example from "../example"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {CardsContext} from '../Container'


const App = () => {
  

  return (

<DndProvider backend={HTML5Backend}>
  <Example/>
</DndProvider >


  );
}



export default App;