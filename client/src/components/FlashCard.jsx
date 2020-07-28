import React from 'react';
import supermemo2 from 'supermemo2';
import axios from 'axios';
import { GiReturnArrow, GiCardDraw } from 'react-icons/gi';

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      currentCard: {},
      index: 0,
      showFront: true,
      value: '',
      responseQuality: 4,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testAnswer = this.testAnswer.bind(this);
    this.mathFunc = this.mathFunc.bind(this);
    this.updateWordStats = this.updateWordStats.bind(this);
    this.showSide = this.showSide.bind(this);
  }

  componentDidMount() {
    const { words } = this.state;
    axios.get('/getWords')
      .then((response) => {
        this.setState({
          words: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    this.testAnswer();
    alert('an answer was submitted: ' + value);
    event.preventDefault();
}

  testAnswer() {
    const { currentCard } = this.state;
    const nativeWord = currentCard.english;

    if (this.state.value === nativeWord) {
      this.updateWordStats(3);
       //console.log(true,words)
    } else {
      this.updateWordStats(2.5);
      // console.log(false,words)
    }
  }

  updateWordStats(num) {
    const { words, currentCard } = this.state;

    // let quality; // A number between 0 and 5 that indicate the quality of review. 0 is the worse while 5 is the best.
    // let lastSchedule=2; // The duration of last review space.
    // let lastFactor=2 // The factor that was used to caculate last schedule.
    const updateInfo = supermemo2(num, currentCard.schedule, currentCard.factor);

    //===================
    const itemIndex = words.findIndex(item => item._key === currentCard._key);
    const copyArray = [...words];
    copyArray[itemIndex].schedule = updateInfo.schedule;
    copyArray[itemIndex].factor = updateInfo.factor;
    copyArray[itemIndex].repeat = updateInfo.isRepeatAgain;

    this.setState({
      words: copyArray,
    });
  }

  mathFunc(event) {
    event.preventDefault();
    const { words, currentCard } = this.state;
    let weightTotal = 0;

    for (let i = 0; i < words.length; i += 1) {
      const trueWeight = Math.abs(5 - words[i].schedule);
      weightTotal += trueWeight;
    }
    for (let i = 0; i < words.length; i += 1) {
      const trueWeight = Math.abs(5 - words[i].schedule);
      words[i].distribution = trueWeight / weightTotal;
    }

    function getNewCard(list) {
      let key = 0;
      let selector = Math.random();
      while (selector > 0) {
        selector -= list[key].distribution;
        key += 1;
      }
      key -= 1;
      return list[key];
    }
    this.setState({
      currentCard: getNewCard(words),
    });
    // getNewCard(words)
  }

  showSide(event) {
    const { showFront } = this.state;
    event.preventDefault();
    this.setState({
      showFront: !showFront,
    });

  }

  render() {

    const { currentCard, showFront } = this.state;
    return (
      <div className="flashcard-container">
         <div id="content-area">
        {showFront?
        <div className="front">
          <div id="flashcard-word">
            <h1>{currentCard.spanish}</h1>
          </div>
           <div id="answer-form">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Please enter your answer here
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit Answer" />
              </form>
           </div>
        </div>:
        <div className="back">
        <h1>{currentCard.english}</h1>

        </div>}

       </div>
       <div>

         <button className="newcard-button" onClick={this.mathFunc}>< GiCardDraw/>New Card</button>
         <button className="flip-card" onClick={this.showSide}><GiReturnArrow/>flip card</button>
       </div>


     </div>
    )
  }

}

export default FlashCard;
