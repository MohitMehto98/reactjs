import "./App.css";
import Card from "./components/Card";

function App() {
	const propsInfo = { name: "Mohit Mehto", btnInfo: "click here" };
	return (
		<>
			<Card propsInfo={propsInfo  } />
		</>
	);
}

export default App;
