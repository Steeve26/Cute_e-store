import React, { useState, useEffect } from 'react';
import { Products } from './data/products';
import  ShopItem  from './components/shopItem';
import  CartItem  from './components/cartItem';
import ShoppingBag from './assets/shopping bag.png';
import {BsHandbag} from 'react-icons/bs'
import {FaTimes} from 'react-icons/fa'
import './App.css'

export default function App() {  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindoHeight] = useState(window.innerHeight);


  // let fontSize = 0.0020071875;
  // const [resize, setResize] = useState(fontSize * windowWidth)
  // console.log(resize)

  // if(windowWidth > 1250) {
  //   fontSize = 0.001007;
  // }
  // if(windowWidth > 300) {
  //   fontSize = 0.0027777777777778;
  // }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindoHeight(window.innerHeight);
      // handleResize()
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // function handleResize() {
  //   setResize(windowWidth * fontSize);
  // }

  // console.log('fontSize:', resize.toFixed(5))

  const [product, setProduct] = useState(Products);
  const [cartCount, setCartCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const body = document.querySelector('body')
  const root = document.getElementById('root')
  
  root.style.paddingTop = '2em'
  modalVisible ? body.style.overflowY = 'hidden' : body.style.overflowY = 'unset';


  function addItem(id) {
    setProduct(
      product.map(item => {
        if(item.id === id)
          return {...item, quantity: item.quantity + 1}
        else return item
      })
    )
  }

  function decreaseItem(id) {
    setProduct(
      product.map(item => {
        if(item.id === id){
          if(item.quantity === 1){
           setCartCount(cartCount - 1)}
          return {...item, quantity: item.quantity - 1}
        }
        else return item
      })
    )
  }

  function removeItem(id) {
    setProduct(
      product.map(item => {
        if(item.id === id){
          setCartCount(cartCount - 1)
          return {...item, quantity: 0}
        }
        else return item
      })
    )
  }

  function handleUpdate(id, qty) {
    setProduct(
      product.map(item => {
        if (id === item.id) {
          let val = { ...item, quantity: qty };
          if (val.quantity > 0 && val.quantity <= 1)
            setCartCount(cartCount + 1);
          return val;
        } else return item;
      })
    );
  }

  function getTotal() {
    return product.reduce((acc, prod) => {
      return acc + (prod.price * prod.quantity)
    }, 0)
  }

  function clearCart() {
    setProduct(
      product.map(item => {
        return {...item, quantity: 0}
      })
    )
    setCartCount(0)
  }

  return (
    <div className='App' style={{overflow: `${!modalVisible ? 'unset': 'hidden'}`}}>
      <div
        className='modal-container'
        style={{ display: modalVisible ? 'flex' : 'none' }}
        onClick={(e) => {if(e.target.classList == 'modal-container') setModalVisible(false)}}
      >
        <div className='modal' style={{paddingInline: `${cartCount ? '1em 0' : '1em'}`}}>
          <div className='cartItems-wrapper'>
            {product.map(item => {
              let emoji = ''
              if (item.name === 'Carrot')
              emoji = '🥕';
              if (item.name === 'Steak')
              emoji = '🥩';
              if (item.name === 'Ice Cream')
              emoji = '🍧';
              if (item.name === 'Burger')
              emoji = '🍔';
              if (item.name === 'Cup Cake')
              emoji = '🧁';
              if (item.name === 'Choco Cake')
              emoji = '🎂';
              if (item.name === 'Pizza')
              emoji = '🍕';
              if (item.name === 'Sushi')
              emoji = '🍣';
              if (item.name === 'Doughnut')
              emoji = '🍩';
              if (item.name === 'Strawberry')
              emoji = '🍓';
              if (item.quantity !== 0)
                return (
                    <CartItem key={item.id} {...item} emoji={emoji} decrease={decreaseItem} add={addItem} remove={removeItem}/>
                );
            })}

          {!!cartCount &&
            <div className='total-wrapper'>
              <div className="total">Total: ${getTotal()}</div>
            </div>
          }
          </div>

          {!cartCount && 
            <>
              <p className='message'>Your Stupid Cart Is Empty 😡</p>
              <button className='modal-btn return' onClick={() => setModalVisible(false)}>back to shop</button>  
            </>
          }

          { !!cartCount &&
            <button className='modal-btn clear-btn' onClick={() => clearCart()}>Empty Cart</button>
          }

          <button className='exit' onClick={() => setModalVisible(false)}>
            <FaTimes size={20}></FaTimes>
          </button>
        </div>
      </div>

      <span className='reso'>
        {windowWidth} x {windowHeight}
      </span>

      <div className='shopping-bag'>
        <p>
          Cute St<strong>🥺</strong>
          <strong>re</strong>
        </p>
        {/*{resize.toFixed(5)}*/}
        <BsHandbag className='bag-icon' style={{cursor: 'pointer'}} color='black'  onClick={() => { window.scrollTo(0,0); setModalVisible(true)}}></BsHandbag>
        <span
          className='cart-count'
          style={{ display: cartCount ? 'flex' : 'none' }}
        >
          {cartCount}
        </span>
      </div>

      <p>
        Hello Shopper 👋🏼. <br /> Grab a bite to eat! 🍴😋
      </p>

      <div className='shop-items-container'>
        {product.map(item => {
          return (
            <ShopItem key={item.id} {...item} update={handleUpdate}></ShopItem>
          );
        })}
      </div>
    </div>
  );
}
