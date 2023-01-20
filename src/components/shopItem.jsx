import React from 'react'
import './shopItem.css'

export default function ShopItem(props) {
  const {
    name, id, quantity, price, image, update
  } = props

  let qty = quantity;

  function handleClick() {
    quantity >= 0 ?  qty += 1: console.log(qty);
    update(id, qty)
  }
  
  let total = quantity * price

  return (
    <div className='happy-food' style={{width: '7em', height: '7em'}}>
      <img width='100%' height='100%' 
      style={{objectFit: 'cover'}} src={image} alt={name}/>
      <button  onClick={() => handleClick()} >{name} ${quantity < 2 && price} {quantity > 1 && total}{!!quantity && ` (${quantity}) `} +</button>
    </div>
  )
}