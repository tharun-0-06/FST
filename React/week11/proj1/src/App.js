import { useState } from "react";                                                                                                                                       
                                                                                                                                                                        
const products = [                                                                                                                                                      
  {                                                                                                                                                                     
                                                                                                                                                                        
    id: 1,                                                                                                                                                              
    name: "Bed",                                                                                                                                                
    type: 'Furniture',                                                                                                                                             
    description: 'Comfortable to sleep',                                                                                                           
    price: 72000,                                                                                                                                                        
    image: 'bed.jpeg',                                                                                                                                             
  },                                                                                                                                                                    
  {                                                                                                                                                                     
    id: 2,                                                                                                                                                              
    name: "Stationery box",                                                                                                                                              
    type: 'Stationery item',                                                                                                                                          
    description: 'To carry pen, pecil',                                                                                               
    price: 200,                                                                                                                                                        
    image: 'box.jpeg',                                                                                                                                           
  },                                                                                                                                                                    
  {                                                                                                                                                                     
    id: 3,                                                                                                                                                              
    name: "Cup",                                                                                                                                               
    type: 'Kitche Item',                                                                                                                                                 
    description: 'Drink coffe,tea',                                                                                                       
    price: 200,                                                                                                                                                         
    image: 'cup.jpeg',                                                                                                                                         
  },                                                                                                                                                                                                                                                                                                                                       
];                                                                                                                                                                      
                                                                                                                                                                        
export default function App() {                                                                                                                                         
  const [cart, setCart] = useState([]);                                                                                                                                 
                                                                                                                                                                        
                                                                                                                                                                        
  const addToCart = (product) => {                                                                                                                                      
    setCart([...cart, product]);                                                                                                                                        
  };                                                                                                                                                                    
                                                                                                                                                                        
                                                                                                                                                                        
  const removeFromCart = (index) => {                                                                                                                                   
    setCart(cart.filter((_, i) => i !== index));                                                                                                                        
  };                                                                                                                                                                    
                                                                                                                                                                        
                                                                                                                                                                        
  const resetCart = () => {                                                                                                                                             
    setCart([]);                                                                                                                                                        
  };                                                                                                                                                                    
                                                                                                                                                                        
                                                                                                                                                                        
  const buyNow = () => {                                                                                                                                                
    alert("Purchase successful! Thank you for shopping.");                                                                                                              
    setCart([]);                                                                                                                                                        
  };                                                                                                                                                                    
                                                                                                                                                                        
                                                                                                                                                                        
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);                                                                                                  
                                                                                                                                                                        
  return (                                                                                                                                                              
    <div className="container">                                                                                                                                         
      <h1>E-Commerce Store</h1>                                                                                                                                         
      {}                                                                                                                                                                
      <div className="products">                                                                                                                                        
        {products.map((product) => (                                                                                                                                    
          <div key={product.id} className="product-card">                                                                                                               
            <img src={product.image} alt={product.name} />                                                                                                              
            <h2>{product.name}</h2>                                                                                                                                     
            <p>{product.description}</p>                                                                                                                                
            <p><strong>₹{product.price}</strong></p>                                                                                                                    
            <button onClick={() => addToCart(product)}>Add to Cart </button>                                                                                            
          </div>                                                                                                                                                        
        ))}                                                                                                                                                             
      </div>                                                                                                                                                            
      {}  
      <center>                                                                                                 
      <div className="cart">                                                                                                                                            
        <h2>Shopping Cart </h2>                                                                                                                                         
        {cart.length === 0 ? (                                                                                                                                          
          <p>Cart is empty</p>                                                                                                                                          
        ) : (                                                                                                                                                           
          <>                                                                                                                                                            
            <ul>                                                                                                                                                        
              {cart.map((item, index) => (                                                                                                                              
                <li key={index}>                                                                                                                                        
                    <img src={item.image} alt={item.name} height="50px"/>{item.name} - ₹{item.price}                                                                    

                  <button className="remove" onClick={() => removeFromCart(index)}> Remove</button>                                                                     
                </li>                                                                                                                                                   
              ))}                                                                                                                                                       
            </ul>                                                                                                                                                       
            <h3>Total: ₹{totalAmount}</h3>                                                                                                                              
            <button className="buy" onClick={buyNow}>Buy Now </button>                                                                                                  
            <button className="reset" onClick={resetCart}>Reset Cart </button>                                                                                          
          </>                                                                                                                                                           
        )}                                                                                                                                                              
      </div>  
      </center>                                                                                                                                                          

      {}                                                                                                                                                                
      <style>{`                                                                                                                                                         
      body {                                                                                                                                                            
    background-color: rgb(255, 190, 117);                                                                                                                               
      }                                                                                                                                                                       
        .container {                                                                                                                                                    
          text-align: center;                                                                                                                                           
          font-family: Arial, sans-serif;                                                                                                                               
          padding: 20px;                                                                                                                                                
        }                                                                                                                                                               
        .products {                                                                                                                                                     
          display: flex;                                                                                                                                                
          justify-content: center;                                                                                                                                      
          gap: 20px;                                                                                                                                                    
          flex-wrap: wrap;                                                                                                                                              
          margin-top: 20px;                                                                                                                                             
        }                                                                                                                                                               
        .product-card {                                                                                                                                                 
          border: 1px solid #ddd;                                                                                                                                       
          padding: 15px;                                                                                                                                                
          max-width: 200px;                                                                                                                                             
          text-align: center;                                                                                                                                           
          border-radius: 10px;                                                                                                                                          
          background:rgb(255, 143, 51);                                                                                                                                
        }                                                                                                                                                               
        .product-card img {                                                                                                                                             
          width: 100px;                                                                                                                                                 
          height: 100px;                                                                                                                                                
        }                                                                                                                                                               
        .cart {                                                                                                                                                         
          margin-top: 30px;                                                                                                                                             
          padding: 20px;                                                                                                                                                
          border-top: 2px solid #ddd;                                                                                                                                   
        }                                                                                                                                                               
        .cart ul {                                                                                                                                                      
          list-style-type: none;                                                                                                                                        
          padding: 0;                                                                                                                                                   
        }                                                                                                                                                               
        .cart li {                                                                                                                                                      
          margin: 10px 0;                                                                                                                                               
        }                                                                                                                                                               
        button {                                                                                                                                                        
          margin-top: 10px;                                                                                                                                             
          padding: 8px 12px;                                                                                                                                            
          border: none;                                                                                                                                                 
          cursor: pointer;                                                                                                                                              
          font-weight: bold;                                                                                                                                          
        }                                                                                                                                                               
        button:hover {                                                                                                                                                  
          opacity: 0.8;                                                                                                                                                 
        }                                                                                                                                                               
        .remove {                                                                                                                                                       
          background-color: red;                                                                                                                                        
          color: white;                                                                                                                                                 
          margin-left: 10px;                                                                                                                                            
        }                                                                                                                                                               
        .buy {                                                                                                                                                          
          background-color: rgb(88, 180, 255);                                                                                                                                      
          color: white;                                                                                                                                                 
        }                                                                                                                                                               
        .reset {                                                                                                                                                        
          background-color: gray;                                                                                                                                       
          color: white;                                                                                                                                                 
        }                                                                                                                                                               
      `}</style>                                                                                                                                                        
    </div>                                                                                                                                                              
  );                                                                                                                                                                    
}                                                                                                                                                                 
      