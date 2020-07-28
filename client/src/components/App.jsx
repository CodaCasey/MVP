import React from 'react';
import FlashCard from './FlashCard';


class App extends React.Component {
 constructor(props) {
   super(props)
  this.state = {
    data: [],
  }
 }

 render() {
   return(
    <div id="page-contents">
    <div id="flashcard-component">
      <FlashCard/>
    </div>
    </div>
   )
 }

}

export default App;