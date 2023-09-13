import React from "react";
const Footer = () => {
    return (
        <footer class="footer">
            <div id="footerDiv" class="footerDiv">
                <div class="footerparts">
                    <div>
                        <p class="logo">Ecommerce</p>
                    </div>
                    <div class="footerIcons">
                        <a href="/"><i class="fa-brands fa-facebook"></i></a>
                        <a href="/"><i class="fa-brands fa-youtube"></i></a>
                        <a href="/"><i class="fa-brands fa-twitter"></i></a>
                        <a href="/"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footerparts">
                    <h4>Products</h4>
                    <a href="/"><h3><i class="fa-solid fa-angle-right"></i>Camera</h3></a>
                    <a href="/"><h3><i class="fa-solid fa-angle-right"></i>Laptop</h3></a>
                    <a href="/"><h3><i class="fa-solid fa-angle-right"></i>Mobile</h3></a>
                    <a href="/"><h3><i class="fa-solid fa-angle-right"></i>Air Buds</h3></a>
                </div>
                <div className="footerparts">
                    <h4>Navigate</h4>
                    <a href="/"><h3><i class="fa-solid fa-angle-right"></i>Home</h3></a>
                    <a href="/about"><h3><i class="fa-solid fa-angle-right"></i>About</h3></a>
                    <a href="/contact"><h3><i class="fa-solid fa-angle-right"></i>Contact</h3></a>
                    <a href="/products"><h3><i class="fa-solid fa-angle-right"></i>Products</h3></a>

                </div>
                <div className="footerparts">
                    <h3><i class="fa-solid fa-envelope"></i> &nbsp;&nbsp;&nbsp;&nbsp; Stay up to date with us</h3>
                    <input class="footerinput" type="text" placeholder="Enter your E-mail address"></input>
                    <div><button > Sign Up</button></div>
                </div>
            </div>
            <div class="copyRight">
                <h4>Copyright © Fonticons, Inc.</h4>
                <h4>Ecommerce</h4>
                </div>
        </footer>
    );
};
export default Footer;
