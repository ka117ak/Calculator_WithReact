import React from 'react'
import {ACTION} from './App'

export default function Operation({dispatch, operation}) {
  return (
    <button 
        onClick={() => dispatch( {type: ACTION.CHOOSE_OPERATION, payload: {operation} })}
    >
        {operation}
        </button>
  )
}

