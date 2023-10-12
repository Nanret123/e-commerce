import React from 'react';
import { useSelector } from "react-redux";

const Error = () => {
	const error = useSelector((state) => state.auth.error);

	return (
		<div>
			{error && <h1>Sorry an Error Occured!</h1>}
		</div>
		
	)
}

export default Error