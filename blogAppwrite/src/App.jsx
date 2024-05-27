import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "../store/authSlice";

function App() {
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					console.log("details found")
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
					console.log("details not found")
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return loading ? <div> loading...</div> : <div>Test run successfully</div>;
}

export default App;
