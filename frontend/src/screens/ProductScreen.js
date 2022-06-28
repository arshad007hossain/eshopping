import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions';


const ProductScreen= ({value,text,color}) => {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)

  const {loading, error, product} = productDetails
    
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch,id])

  const addToCartHandler = () => {
    navigate (`/cart/${id}?qty=${qty}`)
  }

  // const product = products.find((p) => p._id === (id));
  return (
    <div>
      <Link to='/'><Button className='btn btn-dark my-3'>Go Back</Button></Link>
      {loading ? <Loader/> : error ? <Message variant='danger'/> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                       { [...Array(product.countInStock).keys()].map(x=>(
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

              <ListGroup.Item>
                <div style={{width:'100%', display:'flex', justifyContent:'center' }} >
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled = {product.countInStock===0}>Add To Cart</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row> 
      )}
      
    </div>
  );
}

export default  ProductScreen