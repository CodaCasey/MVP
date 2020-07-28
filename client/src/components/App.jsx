import React from 'react';
import FlashCard from './FlashCard';

class App extends React.Component{
 constructor(props){
   super(props)
  this.state={
    data:[],
  }
 }

 render(){
   return(
    <div>
      <div>header</div>
    <div>
      <FlashCard/>
    </div>
    </div>
   )
 }

}

export default App;