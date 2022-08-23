import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo-dibujo-2.png";
import { AuthUserLogin } from "../store/slices/users/thunks";

const Login = ({ closeModal }) => {
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		user: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		// dispatch(AuthUserLogin(input));
		setInput({ user: "", password: "" });
	};
	return (
		<div>
			<div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 text-black">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div>
						<div className="flex items-center lg:justify-center">
							<div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
								<div className="p-4 py-6 text-white bg-pink-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
									<div className="my-3 text-4xl font-bold tracking-wider text-center">
										<span>RGBTech</span>
										<img className="w-40 pt-4" src={logo} alt="logo-rgbtech" />
									</div>
									<p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
										Buy the best products, at the best price available. At
										rgbtech, you will find everything you want..
									</p>
									<p className="flex flex-col items-center justify-center mt-10 text-center">
										<span>Don't have an account?</span>
										<span className="text-xl">
											👨‍🚀
											<Link
												style={{ textDecoration: "underline" }}
												to="/createUser"
											>
												Get Started!
											</Link>
											🚀
										</span>
									</p>
								</div>
								<div className="p-5 bg-white md:flex-1">
									<h3 className="my-4 text-2xl font-semibold text-gray-700">
										Account Login
									</h3>
									<form action="#" className="flex flex-col space-y-5">
										<div className="flex flex-col space-y-1">
											<label
												htmlFor="user"
												className="text-sm font-semibold text-gray-500"
											>
												Username
											</label>
											<input
												type="text"
												id="user"
												name="user"
												value={input.user}
												autoFocus
												onChange={handleInputChange}
												className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-pink-100"
											/>
										</div>
										<div className="flex flex-col space-y-1">
											<div className="flex items-center justify-between">
												<label
													htmlFor="password"
													className="text-sm font-semibold text-gray-500"
												>
													Password
												</label>
												<Link
													to="/createUser"
													className="text-sm text-blue-600 hover:underline focus:text-blue-800"
													tabIndex={-1}
												>
													Forgot Password?
												</Link>
											</div>
											<input
												type="password"
												name="password"
												id="password"
												value={input.password}
												onChange={handleInputChange}
												className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-pink-100"
											/>
										</div>
										<div>
											<button
												type="submit"
												className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-pink-500 rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
												onClick={handleLoginSubmit}
											>
												Log in
											</button>
										</div>
										<div className="flex flex-col space-y-5">
											<span className="flex items-center justify-center space-x-2">
												<span className="h-px bg-gray-400 w-14"></span>
												<span className="font-normal text-gray-500">
													or login with
												</span>
												<span className="h-px bg-gray-400 w-14"></span>
											</span>
											<div className="flex flex-col space-y-4">
												<a
													href="#"
													className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group focus:outline-none"
												>
													<BsGoogle />
													<span className="text-sm font-medium text-black ">
														Google
													</span>
												</a>
												<button
													className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={closeModal}
												>
													Close
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</div>
	);
};

export default Login;
