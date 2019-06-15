import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe'
import Box from './components/Box'
import './App.css';



function App() {
  const [boxes, setBoxes ]= useState([1,2,3,4,5,6,7,8,9]);
  const winM = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[3,6,9],[2,5,8]];
  const [movP, setMovP] = useState([]);
  const [movCPU, setMovCPU] = useState([]);
  const [cpuWins, setCpuWins] = useState(0)
  const [playerWins, setPlayerWins] = useState(0)
  
  function reset(){
    setTimeout(()=>{
      setMovP([])
      setMovCPU([])
      setBoxes([1,2,3,4,5,6,7,8,9])
    },1000)
  }
  function getRandom(playerNumber){
    
    let boxesFiltered = boxes.filter(boxF=>{
      switch(boxF){
        case 'X':
          return null
        case 'O':
          return null
        case playerNumber:
          return null
        default:
          return boxF
      }
    })

    let random = boxesFiltered[Math.floor((Math.random() * (boxesFiltered.length - 1)))] 
    console.log(boxesFiltered.length)
    if(playerNumber === random && boxesFiltered.length > 1){
      getRandom(playerNumber)
    }else if(boxesFiltered.length === 1){
      return null
    }

    return random
  }

  async function  handleClick (e) {
    
    let value = await parseInt(e.target.textContent)
    let randomCpu = await getRandom(value)

    setBoxes(boxes.map(box =>{ 
     if(box===value){
        let tempPlayer = movP
        tempPlayer.push(value)
        setMovP(tempPlayer)
        return box='X'
      }else if(box===randomCpu){
        let tempCPU = movCPU
        tempCPU.push(randomCpu)
        setMovCPU(tempCPU)
        return box='O'
      }else{
        return box 
      }
    }))

    let boxesEmpty = boxes.filter(box=>  typeof box === 'number')

    console.log(boxesEmpty)
    for(var i in winM){
      if(movP.includes(winM[i][0]) && movP.includes(winM[i][1]) && movP.includes(winM[i][2])){
        setPlayerWins(playerWins+1)
        console.log(playerWins)
        reset()
        return alert('Player wins')
      }else if(movCPU.includes(winM[i][0]) && movCPU.includes(winM[i][1]) && movCPU.includes(winM[i][2])){
        setCpuWins(cpuWins+1)
        reset()
        return  alert('Cpu wins')
      }else if(boxesEmpty.length <= 1){
        reset()
        return alert('DRAW')
      }
    }

  }

  return (
    <div className="App">
      <h1 className='title'><span>Tic</span><span>Tac</span><span>Toe</span></h1>
      <h2>Victorias</h2>
      <ul className='game-stats'>
        <li>Cpu: {cpuWins}</li>
        <li>Jugador: {playerWins}</li>
      </ul>
      <TicTacToe>
        {boxes.map((box, index) => <Box key={index} handleClick={handleClick} number={box}/>)}
      
      </TicTacToe>
    </div>
  );
}

export default App;

