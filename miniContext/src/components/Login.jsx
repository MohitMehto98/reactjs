import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [Password, setPassword] = useState("");
	const { setUser } = useContext(UserContext);

	const handleSubmit = () => {
		setUser({ userName, Password });
	};
	return (
		<div>
			Login
			<input
				type="text"
				placeholder="Enter Name"
				onChange={(e) => setUserName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Enter Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="button" onClick={handleSubmit}>
				Login
			</button>
		</div>
	);
};

export default Login;
