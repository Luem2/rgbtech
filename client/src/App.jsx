import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CreateUser from "./pages/CreateUser";
import AllProducts from "./pages/AllProducts";
import ShoppingCart from "./pages/ShoppingCart";
import SearchProducts from "./pages/SeachProduct";
import Filters from "./pages/Filters";
import Profile from "./pages/Profile";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<AllProducts />} />
					<Route path="/Search" element={<SearchProducts />} />
					<Route path="/createUser" element={<CreateUser />} />
					<Route path="/filters" element={<Filters />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/shoppingCart" element={<ShoppingCart />} />
					<Route path="/productDetails/:id" element={<ProductDetails />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
