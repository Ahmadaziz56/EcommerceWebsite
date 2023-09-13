import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState("");

    return (
        <Fragment>
            <form className="searchBox">
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Link to={`/products/${keyword}`}>
                    <button className="forserch">Search</button>
                </Link>
            </form>
        </Fragment>
    );
};

export default Search;


