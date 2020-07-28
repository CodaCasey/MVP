
import React from 'react';
import Content from './Content';
import supermemo2 from 'supermemo2';

import { supermemo, SuperMemoItem, SuperMemoGrade } from 'supermemo';

class FlashCard extends React.Component{
 constructor(props){
   super(props)
  this.state={
    words:[
    {id: 1, english:'hello', spanish: 'hola', factor:3, schedule:3,repeat:false},
    {id:2, english:'dog', spanish: 'perro', factor:3, schedule:5,repeat:false},
    {id:3, english:'but', spanish: 'pero', factor:3, schedule:1,repeat:false},
    {id:4, english:'goodbye', spanish: 'adios', factor:3, schedule:2,repeat:false},
    {id:5, english:'thank you', spanish: 'gracias', factor:3, schedule:3,repeat:false},
    {id:6, english:'why', spanish: 'por que', factor:3, schedule:4,repeat:false},
    {id:7, english:'what', spanish: 'que', factor:3, schedule:2,repeat:false},
    {id:8, english:'mirror', spanish: 'el espejo', factor:3, schedule:1,repeat:false}

    ],

    index:0,
    showBackOfCard:false,
    value:'',
  }
  this.moveForward=this.moveForward.bind(this);
  this.moveBackward=this.moveBackward.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.testAnswer=this.testAnswer.bind(this);
  this.mathFunc=this.mathFunc.bind(this);
  this.updateWordStats=this.updateWordStats.bind(this);

 }

 moveForward(){
  event.preventDefault();
  let { index, words } = this.state;

  if (index === words.length - 1) {
    index = -1;
  }
  index += 1;
  this.setState({ index });
 }

 moveBackward(){
  event.preventDefault();
  let { index, words } = this.state;

  if (index < 1) {
    index = words.length;
  }
  index -= 1;
  this.setState({ index });
 }

 handleChange(event) {
  this.setState({value: event.target.value});
}

handleSubmit(event) {
  this.testAnswer();
  alert('an answer was submitted: ' + this.state.value);
  event.preventDefault();
}

testAnswer(){
  const{words,index} = this.state;
  let nativeWord=words[index].english;
  if(this.state.value === nativeWord){
    console.log(true)
  }else{
    console.log(false)
  }
}

updateWordStats(event){
  event.preventDefault()
  const{words,index} = this.state;
  let quality; // A number between 0 and 5 that indicate the quality of review. 0 is the worse while 5 is the best.
   let lastSchedule=2; // The duration of last review space.
   let lastFactor=2 // The factor that was used to caculate last schedule.
   let updateInfo  = supermemo2(1, words[index].schedule, words[index].factor)

   //===================
   const itemIndex = this.state.words.findIndex(item => item.id === words[index].id )
   let copyArray = [...this.state.words]
   copyArray[itemIndex].schedule = updateInfo.schedule
   copyArray[itemIndex].factor=updateInfo.factor;
   copyArray[itemIndex].repeat=updateInfo.isRepeatAgain;
   this.setState({

   words: copyArray,

   });
}

mathFunc(event){
  const{words,index} = this.state;
  let weightTotal = 0;

  for (let i = 0; i < words.length; i++) {
    let trueWeight=Math.abs(5 - words[i].schedule);
      weightTotal += trueWeight;
  }
  for (let i = 0; i < words.length; i++) {
    let trueWeight=Math.abs(5 - words[i].schedule);
      words[i].distribution = trueWeight / weightTotal;
  }

  function getNewCard(list) {
      let key = 0;
      let selector = Math.random();
      while (selector > 0) {
          selector -= list[key].distribution;
          key++;
      }
      key--;
      return list[key];
  }

  console.log(getNewCard(words));

}



 render(){

   const{words,index} = this.state;
   let foreignWord=words[index].spanish;
   let nativeWord=words[index].english;
   let numFactor=words[index].num;

   return(
    <div className="flashcard-container">
       <div id="content-area">

       <div className="front">
        <div id="flashcard-word">
          flashcard forighn word
          <h1>{foreignWord}</h1>
        </div>
        <div id="answer-form">
            <form onSubmit={this.handleSubmit}>
              <label>
                Please enter your answer here
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>
       </div>
       <div className="back">

       </div>

      </div>
      <div>
        <button onClick={this.updateWordStats}>next question</button>
        <button onClick={this.mathFunc}>prev question</button>
      </div>


    </div>
   )
 }

}

export default FlashCard;