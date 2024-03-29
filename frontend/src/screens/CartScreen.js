import React, { useEffect} from 'react'
import { useParams, useNavigate, useLocation,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col, Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
// import Loader from '../components/Loader'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'



const CartScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    // const [searchParms] = useSearchParams();
  
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

const checkoutHandler = () => {
  navigate('/login?redirect=shipping')
} 

const removeFromCartHandler = (id) => {
  dispatch(removeFromCart(id))
}

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (<Message>Your Cart is Empty <Link to='/'>Go back</Link></Message>) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                        as='select' 
                        value={item.qty} 
                        onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                       { [...Array(item.countInStock).keys()].map(x=>(
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}  
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
                
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
            <Link to='/'><Button className='btn btn-dark my-3'>Go Back</Button></Link>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>SubTotal ({cartItems.reduce((acc,cur) => acc + cur.qty, 0)}) items</h2>
              ${cartItems.reduce((acc,cur)=> acc +  cur.qty * cur.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item> 
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen