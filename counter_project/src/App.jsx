import { useState } from "react";

function App() {
	const [counter, setCounter] = useState(0);
	const [error, setError] = useState("");

	const handleCount = (val) => {
		if (val == "addition") {
			if (counter < 20) {
				setError(null);
				setCounter(counter + 1);
			} else {
				setError("You can not increase value...");
			}
		} else if (val == "removal") {
			if (counter >= 1) {
				setError(null);
				setCounter(counter - 1);
			} else {
				setError("you can not decrease value...");
			}
		}
		return (
			<>
				<button onClick={() => handleCount("addition")}>Add Button</button>
				<h1>{error ? error : counter}</h1>
				<button onClick={() => handleCount("removal")}>Remove Button</button>
			</>
		);
	};
}

export default App;
