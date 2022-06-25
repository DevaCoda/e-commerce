import React from "react";
import { withRouter } from "react-router";
import "../style/Product.css";

class product extends React.Component {
  state = {
    product: "",
  };
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.Click_Buy_Stockage = this.Click_Buy_Stockage.bind(this);

    const { id } = this.props.match.params;
    console.log(id);
    this.handleData(id);

    console.log(this.state.product);
  }

  componentDidMount() {}

  handleData = (id) => {
    fetch(`https://otakod.es/hetic/ecommerce-api/products/${id}`)
      .then((response) => response.json())
      .then((product) => {
        this.setState({
          product: product,
        });
        console.log(product);
        console.log(this.state.product);
        this.Click_Buy_Stockage();
      });
  };

  Click_Buy_Stockage() {
    let tab = [];
    console.log(tab);
    let produit = this.state.product;

    let obj = {
      id: produit.id,
      name: produit.title,
      price: produit.price,
      image: produit.images.photos[0],
      count: 1,
    };

    console.log(this.state.product);

    tab.push(obj);

    if (JSON.parse(localStorage.getItem("Product : ")) !== null) {
      let New_data = JSON.parse(localStorage.getItem("Product : "));
      New_data.push(obj);
      localStorage.setItem("Product : ", JSON.stringify(New_data));
      console.log(New_data);
    }

    if (JSON.parse(localStorage.getItem("Product : ")) === null) {
      localStorage.setItem("Product : ", JSON.stringify(tab));
    }
  }

  render() {
    return (
      <div className="allitems" style={{ marginTop: "100px" }}>
        {this.state.product && (
          <>
            {this.state.product &&
              this.state.product.images.photos.map((image) => {
                return <img className="images" src={image} alt="Produits" />;
              })}
            <div className="details">
              <h1>{this.state.product.title}®</h1>
              <h2>{this.state.product.category}</h2>
              <p> Description : {this.state.product.description}</p>
              <h3> Stock :{this.state.product.stock}</h3>
              <p className="pricetag"> Prix : {this.state.product.price}</p>
              <button
                onClick={this.Click_Buy_Stockage}
                className="button"
                type="submit"
              >
                Add To Cart
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(product);
