import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'
// import axios from 'axios'

const ProductScreen= ({value,text,color}) => {
//   const [product, setProduct] = useState({})

  const { id } = useParams();

//   useEffect(() => {
//     const getProduct = async () => {
//       const {data} = await axios.get(`/api/products/${id}`)

//       setProduct(data)
//     }

//     getProduct()
//   }, [id])


  const product = products.find((p) => p._id === (id));
  return (
    <div>
      <Link to='/'><Button className='btn btn-dark my-3'>Go Back</Button></Link>
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
              <ListGroup.Item>
                <div style={{width:'100%', display:'flex', justifyContent:'center' }} >
                  <Button className='btn-block' type='button' disabled = {product.countInStock===0}>Add To Cart</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row> 
    </div>
  );
}

export default  ProductScreen