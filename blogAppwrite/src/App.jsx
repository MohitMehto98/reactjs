import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "../store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					console.log("details found");
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
					console.log("details not found");
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return loading ? (
		<div className="w-full min-h-screen flex justify-center items-center bg-slate-400">
			<p>Loading...</p>
		</div>
	) : (
		<div className="w-full min-h-screen flex flex-wrap content-baseline bg-slate-400">
			<div className="w-full block">
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default App;
