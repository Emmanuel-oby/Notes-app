import React from "react";

function Menu() {
	return (
		<div className="menu">
			<span>
				<span class="material-icons-outlined">note</span>
				<h6>Notes</h6>
			</span>
			<span>
				<span class="material-icons-outlined">grade</span>
				<h6>Events</h6>
			</span>
			<span>
				<span class="material-icons-outlined">checklist</span>
				<h6>Todo Lists</h6>
			</span>
			<span>
				<span class="material-icons-outlined">group</span>
				<h6>Friends</h6>
			</span>
		</div>
	);
}

export default Menu;
