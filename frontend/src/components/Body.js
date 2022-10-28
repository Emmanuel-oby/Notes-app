import React from "react";
import Sidebar from "./Sidebar";
import Note from "./Note";

function Body() {
	return (
		<div className="body">
			<Sidebar />
			<Note />
		</div>
	);
}

export default Body;
