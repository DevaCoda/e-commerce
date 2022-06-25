import React from "react";
import "../style/header.css";
import logo from "../assets/logo_otaku_shopuu.png";
import iconsearch from "../assets/Icon/search.png";
import iconpanier from "../assets/Icon/paniers.png";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }

  componentDidMount() {
    fetch("https://otakod.es/hetic/ecommerce-api/categories")
      .then((response) => response.json())
      .then((categories) => {
        this.setState({ categories: categories.categories });
      });
  }
  render() {
    return (
      <header>
        <span>
          <img className="Logo" src={logo} alt="Logoshoppu" />
        </span>
        <nav>
          <ul>
            {this.state.categories &&
              this.state.categories.map((category) => {
                return <li key={category}>{category}</li>;
              })}
          </ul>
        </nav>
        <input
          className="input"
          type="text"
          placeholder="search"
          onChange={this.handleInput}
          value={this.state.search}
          required
        />
        <div className="icons">
          <img className="search" src={iconsearch} alt="search" />
          <Link to="/cart">
            <img className="paniers" src={iconpanier} alt="panier" />
          </Link>
        </div>
      </header>
    );
  }
}
