import Header from "../components/Header"
import Container from "../components/common/Container"
import Row from "../components/common/Row"
import Column from "../components/common/Column"
import '../styles/products.css'
import { useEffect, useRef, useState } from "react"
import Loader from "../components/Loader"
import Button from "../components/Button"

function Products(){
  const [products,setProducts] = useState([])
  const [loader,setLoader] = useState(false)
  const [cartProducts,setCartProducts] = useState([])
  /* const [addedCart,setAddedCart] = useState(false) */
  //const prevData = useRef()

  useEffect(()=>{
    setLoader(true)
    const loadProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const res = await response.json()
      setProducts(res)
      setLoader(false)
    }
    loadProducts();
  },[])

  const addToCart =(id)=>{
    setCartProducts([
      ...cartProducts,
      products?.[id],      
    ])
    /* setAddedCart(id) */
    localStorage.setItem('products',JSON.stringify(cartProducts))
  }
  /*useEffect(()=>{
    // prevData.current = cartProducts
    if(cartProducts.length){
      
    }
  },[cartProducts])*/

  console.log('products',products)
  console.log('cartProducts',cartProducts);
  return(
    <>
      {loader == true ? 
      <Loader/>
      :<>
      <Header updateCart={cartProducts}/>
      <div className="products-wrapper">
        <div className="breadcrumb">
          <h2>Products</h2>
        </div>
        <div className="products-area">
          <Container>
            <Row>
              {products.map((item,key)=>{
                return(
                <Column col="3" key={key}>
                  <div className="products-box">
                    <div className="product-image">
                      <a href={`/products/${item.id}`}>
                          <img src={item.image} alt="procut-image"/>
                      </a>
                    </div>
                    <div className="product-data">
                        <div className="category">
                          <p>{item.category}</p>
                          <div className="rating">
                            {item.rating.rate <= 1.5 ? 
                              <img src="./star.png" alt="rating"/>
                            : item.rating.rate <= 2.5 ?<>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              </>
                            : item.rating.rate <= 3.5 ?<>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              </>
                            : item.rating.rate <= 4.5 ?<>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              </>
                            : <>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                              <img src="./star.png" alt="rating"/>
                            </>
                            }
                          </div>
                        </div>
                        <h2><a href={`/products/${item.id}`}>{item.title.slice(0,40)}...</a></h2>
                        <div className="price">
                          <h3>${item.price}</h3>
                          <Button className="btn" onClick={()=>addToCart(key)}>Add to cart</Button>
                        </div>
                    </div>
                  </div>
                </Column>
                )
              })}
            </Row>
          </Container>
        </div>
      </div>
      </>}
    </>
  )
}

export default Products