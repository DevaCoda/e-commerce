import React from "react";
import "../style/cart.css";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem("Product : "));
    this.setState({ products: cart });
    console.log(cart);
  }

  render() {
    return (
      this.state.products &&
      this.state.products.map((product) => {
        return (
          <div className="panier" style={{ marginTop: "100px" }}>
            <h1>{product.name}</h1>
            <img className="images" src={product.image} alt="Produits" />
            <p> {product.price}</p>
          </div>
        );
      })
    );
  }
}
