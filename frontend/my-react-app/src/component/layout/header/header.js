import React from "react";
const Header = () => {
  return (
    <header>
      <div class="HeaderParts">
        <div class="headerInnerParts">
          <p class="logo">Ecommerce</p>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div class="headerInnerParts rightHeader">
          <div class="Search">
            <a href="/search"><i class="fa-solid fa-magnifying-glass"></i></a>
          </div>
          <div class="Rightheaderinnerparts">
            <a  href="/cart"><i class="fa-solid fa-basket-shopping"></i></a>
          </div>
          <div class="Rightheaderinnerparts">
            <a  href="/login"><i class="fa-solid fa-user"></i></a>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;