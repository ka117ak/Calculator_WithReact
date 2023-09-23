import {ACTION} from './App'
import React from 'react'

export default function Digit({dispatch, digit}){
    return (
    <button 
        onClick={() => dispatch( {type: ACTION.ADD_DIGIT, payload: {digit} })}
    >
        {digit}
        </button>
    )
}