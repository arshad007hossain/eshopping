import React, { useEffect} from 'react'
import { useParams, useNavigate, useLocation,useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col, Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {addToCart} from '../actions/cartActions'


const CartScreen = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const [searchParms] = useSearchParams();
  
    const productId = id;
    const qty = search ? Number(search.split("=")[1]) : 1;

    // console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state=> state.cart)

    const {cartItems} = cart

    console.log(cartItems)

    useEffect(()=> {
      if(productId){
         dispatch(addToCart(productId,qty))
      }
    },[dispatch, qty, productId])



  return (
    <div>CartScreen</div>
  )
}

export default CartScreen