import { useState, useCallback, useEffect, useRef } from "react";

function App() {
	const [length, setLength] = useState(8);
	const [isNumber, setIsNumber] = useState(false);
	const [isSpecialChar, setIsSpecialChar] = useState(false);
	const [passVal, setPassVal] = useState("");
	const passwordRef = useRef(null);
	const passwordGenrator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (isNumber) str += "0123456789";
		if (isSpecialChar) str += "!@#$%&'()*+,-./";
		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassVal(pass);
	}, [length, isNumber, isSpecialChar, setPassVal]);

	const handlePasswordCopyToClipboard = useCallback(() => {
		passwordRef.current.select();
		passwordRef.current.setSelectionRange(0, 7);
		window.navigator.clipboard.writeText(passVal);
	}, [passVal]);

	const handleReset = () => {
		setIsNumber(false);
		setIsSpecialChar(false);
		setLength(8);
	};

	useEffect(() => {
		passwordGenrator();
	}, [length, isNumber, isSpecialChar, passwordGenrator]);

	return (
		<>
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
				<div className="flex justify-between items-center">
					<h1 className="text-white text-center my-3">Password generator</h1>
					<button
						className="outline-none bg-red-500 text-white px-3 py-0.5 shrink-0 rounded-lg"
						onClick={handleReset}
					>
						Reset
					</button>
				</div>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						className="outline-none w-full py-1 px-3"
						placeholder="Password"
						readOnly
						value={passVal}
						ref={passwordRef}
					/>
					<button
						className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
						onClick={() => handlePasswordCopyToClipboard()}
					>
						copy
					</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={6}
							max={100}
							value={length}
							className="cursor-pointer"
							onChange={(e) => setLength(e.target.value)}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="numberInput"
							defaultChecked={isNumber}
							onChange={(prev) => setIsNumber((prev) => !prev)}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="characterInput"
							defaultChecked={isSpecialChar}
							onChange={() => setIsSpecialChar((prev) => !prev)}
						/>
						<label htmlFor="characterInput">Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
