import React from "react";

function Header() {
	return (
		<div className="header">
			<h1 className="logo">MyNotes</h1>
			<nav>
				<div className="nav-wrapper">
					<form>
						<div className="input-field">
							<input id="search" type="search" placeholder="Search..." required />
							<label className="label-icon" for="search">
								<i className="material-icons">search</i>
							</label>
							<i className="material-icons">close</i>
						</div>
					</form>
				</div>
			</nav>
			<div>
				<span className="material-icons-outlined">notifications</span>
				<span className="material-icons-outlined">settings</span>
			</div>
			<div className="avatar">
				<img
					style={{ width:"80px", height:"50px"}}
					alt="avatar"
					src="assets/avatar-removebg-preview.png"
				/>
				<p>Hello John!</p>
			</div>
		</div>
	);
}

export default Header;
