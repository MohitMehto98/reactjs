import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const GitHub = () => {
	const data = useLoaderData();
	// ========== fetch data using useEffect =======================
	// const [data, setData] = useState([]);
	// useEffect(() => {
	//     fetch("https:/api.github.com./users/MohitMehto98")
	//     .then((response) => response.json())
	//     .then((res) => {
	//         setData(res);
	//         console.log(res);
	//     });
	// }, []);
	// ===============================================================

	return (
		<div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
			Github UserName :{data.name}
			<img src={data.avatar_url} alt="github profile photo" width={300} />
		</div>
	);
};

export default GitHub;

// ===== fetching the data using react router loader for more optimization======
export const gitHubLoaderInfo = async () => {
	const response = await fetch("https:/api.github.com/users/MohitMehto98");
	return response;
};
