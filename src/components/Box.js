import React from 'react'

const Box = ({marked, number, handleClick}) => {
  let playerStyles = {
    "background":"#89ebff",
    "color":'white'
  }
  let cpuStyles ={
    "background":"#ff89cd",
    "color":'white'
  }
 return (
  <div className='box' style={number === 'X'? playerStyles : number === 'O'? cpuStyles : null} onClick={number === 'X' || number === 'O' ?   null:handleClick}>
    {number}
  </div>
 )
}

export default Box