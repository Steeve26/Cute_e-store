import React from 'react'
import './cartItem.css'
import {GiCancel} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'

export default function cartItem(props) {
  const {id, name, price, quantity, emoji, decrease, add, remove} = props;
  const total = quantity * price

  return(
    <div className='cart-item'>
      <span className='cart-info'>
        <span>{emoji} {name} ${total}</span> 

        <div className='qty-edit'>
          <span className='btns' onClick={() => decrease(id)}>- </span>
          <span>{quantity}</span>
          <span className='btns' onClick={() => add(id)}> +</span>
        </div>
      </span>
      
      <MdCancel color={'#ff4747'} size={'1.5em'} onClick={() => remove(id)} className='del'></MdCancel>
      {/* <button onClick={() => remove(id)} className='del-item'>x</button> */}
    </div>
  )
}