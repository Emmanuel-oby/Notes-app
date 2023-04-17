import React from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../assets/note-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/user/userSlice";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <p>
          <span>dot</span>Notes
        </p>
      </div>
      {user && (
        <div className="search">
          <div>
            <Icon icon="material-symbols:search-rounded" className="icon" />
            <input type="text" placeholder="Search Notes" />
          </div>
          <Icon icon="material-symbols:close" className="icon" />
        </div>
      )}

      <div>
        <nav className="nav">
          <div className="nav-inner">
            {!user ? (
              <>
                <Link to="/signup">
                  <h3>Signup</h3>
                </Link>
                <Link to="/login">
                  <h3>Signin</h3>
                </Link>
              </>
            ) : (
              <>
                <Link to="/home">
                  <Icon icon="ion:home-outline" className="icon" />
                </Link>
                <Link to="/notes">
                  <Icon icon="mdi:note-text-outline" className="icon" />
                </Link>
                <Link to="/categories">
                  <Icon icon="tabler:category-2" className="icon" />
                </Link>
                <Link to="/settings">
                  <Icon icon="ant-design:setting-outlined" className="icon" />
                </Link>
                <Link to="/">
                  <Icon
                    icon="tabler:logout"
                    className="icon"
                    onClick={() => {
                      localStorage.clear();
                      dispatch(clearUser());
                    }}
                  />
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
