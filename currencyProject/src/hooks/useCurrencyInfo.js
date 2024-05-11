import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
	const [apiData, setApiData] = useState({});
	console.log(currency);
	useEffect(() => {
		fetch(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
		)
			.then((res) => res.json())
			.then((res) => setApiData(res[currency]));
		console.log(apiData);
		return apiData;
	}, [currency]);
}

export default useCurrencyInfo;
