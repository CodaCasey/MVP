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
    <div id="side-bar">
      <h1>level 1 placeholder</h1>
    </div>
    <div id="main-content">
      <FlashCard/>
    </div>
    </div>
   )
 }

}

export default App;