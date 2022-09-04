import React from "react";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux"
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ShoppingCard from "../components/ShoppingCard";
import {
	addUnitToCart,
	delUnitFromCart,
	delProduct,
	emptyCart,
	setBuying,
} from "../store/slices/guestShoppingCart/guestShoppingCartSlice";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { hasJWT } from "../store/thunks.js";
import {
	setShoppingHistory,
	deleteProductCart,
	clearCartShop,
} from "../store/slices/users/thunks";
import { useEffect } from "react";
import { checkoutPaypal } from "../components/Paypal/";
import loadingBuy from "../assets/loading.gif";
import {
	cartCleanedNotification,
	productRemovedNotification,
	youAreUnloggedProducts,
} from "../components/Notifications";
import { ToastContainer } from "react-toastify";

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const { cart, buying } = useSelector((state) => state.guestShoppingCart);
	const { user } = useSelector((state) => state.user);
	const userLocalStorage = JSON.parse(window.localStorage.getItem("user"));

	let userProfile;
	function setUserProfile() {
		if (Object.keys(user).length) {
			userProfile = user;
		} else {
			userProfile = userLocalStorage;
		}
	}

	setUserProfile();

	window.sessionStorage.setItem("carrito", JSON.stringify([...cart]));
	const sessionStorageCart = JSON.parse(
		window.sessionStorage.getItem("carrito")
	);

	const shoppingCart = !sessionStorageCart.length ? cart : sessionStorageCart;

	// console.log(sessionStorageCart);

	const pricesCart = shoppingCart?.map((p) => p.price * p.amount);
	const totalPrice = pricesCart?.reduce((prev, act) => prev + act, 0);

	const addUnits = (id) => {
		dispatch(addUnitToCart(id));
	};

	const subUnits = (id) => {
		dispatch(delUnitFromCart(id));
	};

	const removeProduct = (id) => {
		dispatch(delProduct(id));
		productRemovedNotification();
	};

	const HandleClickBuy = async () => {
		// const productsId = cart.map((p) => ({ id: p.id, date: Date() }));
		// console.log(productsId);
		// dispatch(setShoppingHistory(productsId));

		console.log("userProfile", userProfile);
		if (userProfile === null || Boolean(!Object.keys(userProfile).length)) {
			return youAreUnloggedProducts();
		}

		const cartBuy = cart.map((p) => ({
			reference_id: p.id,
			amount: {
				currency_code: "USD",
				value: p.amount * p.price,
			},
			description: p.name,
		}));

		dispatch(setBuying(true));
		const { data } = await checkoutPaypal(cartBuy);
		window.localStorage.setItem("productsPaypal", JSON.stringify(cart));
		window.location.href = data;
		dispatch(setBuying(false));
	};

	useEffect(() => {
		// if (hasJWT()) {
		// 	return () => {
		// 		if (cart.length !== 0) {
		// 			const productsId = cart.map((p) => p.id);
		// 			dispatch(setCartShop(productsId));
		// 		} else {
		// 			const productsId = [""];
		// 			dispatch(setCartShop(productsId));
		// 		}
		// 	};
		// }
	}, []);

	return (
		<div>
			<Header />
			<div className="flex flex-col items-center justify-center gap-2">
				{cart.length === 0 ?
				<h1 className="flex gap-2 text-4xl justify-center font-bold text-gray-400 mt-10 ml-12">
					
					Your <AiOutlineShoppingCart /> its empty! 
				</h1>
					
				: null}
			</div>
			{cart.length !== 0 ? 
			<div className="flex flex-row justify-around items-start border-2 m-1">
				<section className="flex flex-row justify-around items-center">
					<div className="mt-4">
						{/* RENDER de cartas de productos */}
						{/* {hasJWT()
							? cartShop?.map((p, i) => {
									<ShoppingCard
										key={p.id}
										id={i}
										name={p.name}
										img={p.img}
										totalProductPrice={Math.round(p.price * p.amount)}
										units={p.amount}
										addUnits={() => addUnits(p.id)}
										subUnits={() => subUnits(p.id)}
										delProduct={() => removeProduct(i)}
									/>;
							  })
							: cart.map((p, i) => (
									<ShoppingCard
										key={p.id}
										id={i}
										name={p.name}
										img={p.img}
										totalProductPrice={Math.round(p.price * p.amount)}
										units={p.amount}
										addUnits={() => addUnits(p.id)}
										subUnits={() => subUnits(p.id)}
										delProduct={() => removeProduct(i)}
									/>
							  ))} */}
						{cart.map((p, i) => (
							<ShoppingCard
								key={p.id}
								id={i}
								name={p.name}
								img={p.img}
								totalProductPrice={Math.round(p.price * p.amount)}
								units={p.amount}
								price={p.price}
								onDiscount={p.onDiscount}
								discountPercentage={p.discountPercentage}
								stock={p.stock}
								addUnits={() => addUnits(p.id)}
								subUnits={() => subUnits(p.id)}
								delProduct={() => {
									removeProduct(i);
									let producDelete = cart.map((a) => a.id);
									producDelete = producDelete.filter((a) => a !== p.id);
									dispatch(deleteProductCart(producDelete));
								}}
							/>
						))}
					</div>
				</section>
				{cart.length > 0 && (
					<div className="flex flex-col justify-center gap-5 mt-4 items-center text-2xl font-bold">
						<button
							type="button"
							className="flex gap-1 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => {
								dispatch(emptyCart());
								cartCleanedNotification();
								dispatch(clearCartShop());
							}}
						>
							<BsFillTrashFill /> Clear Cart
						</button>
						<button
							type="button"
							className="flex gap-2 px-6 py-2.5 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-700 hover:shadow-lg focus:bg-pink-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-800 active:shadow-lg transition duration-150 ease-in-out"
							onClick={() => {
								HandleClickBuy();
							}}
						>
							{buying ? (
								<img className="h-4 w-4" src={loadingBuy} alt="buying" />
							) : (
								<FaMoneyCheckAlt />
							)}{" "}
							Buy Now!
						</button>

						<h2 className="flex flex-col justify-center items-center bg-slate-100 rounded-lg p-3">
							🛒 Total Price:
							<span className="text-green-500 underline">
								${Math.round(totalPrice)}
							</span>
						</h2>
						<h2 className="flex flex-col justify-center items-center bg-slate-100 rounded-lg p-3">
							🛒 For you:
							<span className="text-green-500 underline">
								${Math.round(totalPrice)}
							</span>
						</h2>
					</div>
				)}
			</div> : null } 
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				false
			/>
		</div>
		
	);
};

export default ShoppingCart;
