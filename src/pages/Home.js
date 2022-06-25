import React from "react";
import "../style/Home.css";
import panier from "../assets/Icon/panier.png";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      totalPage: 1,
      page: 1,
    };
  }

  componentDidMount() {
    this.handleData(this.state.page);
  }

  handleData = (page) => {
    fetch(
      `https://otakod.es/hetic/ecommerce-api/products?limit=16&page=${page}`
    )
      .then((response) => response.json())
      .then((products) => {
        this.setState({
          products: products.products,
          totalPage: products.total_pages,
        });
        console.log(products);
      });
  };

  render() {
    const handleChange = (event, value) => {
      console.log(value);
      this.setState({ page: value });
      this.handleData(value);
    };

    return (
      <>
        <div className="Products">
          {this.state.products &&
            this.state.products.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <img
                      className="product__img"
                      src={product.images.photos[0]}
                      alt="Produits"
                    />
                  </Link>
                  <span>
                    <img
                      className="panier"
                      src={panier}
                      alt="products_panier"
                    />
                  </span>
                  <h3>
                    {product.title}
                    <hr />
                  </h3>
                  {product.priceDiscount != null ? (
                    <div>
                      <span className="pricediscount">
                        {product.priceDiscount}
                      </span>
                      <span className="price discount">{product.price}</span>
                    </div>
                  ) : (
                    <span className="price">{product.price}</span>
                  )}
                </div>
              );
            })}
        </div>
        <div className="pagination">
          <Pagination
            count={this.state.totalPage}
            page={this.state.page}
            onChange={handleChange}
            color="primary"
          />
        </div>
      </>
    );
  }
}
