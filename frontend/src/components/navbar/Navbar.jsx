import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../assets/note-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/features/user/userSlice";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isActive, setActive] = useState(false);
  const wrapperRef = useRef(null);

  const ToggleClass = () => {
    setActive(!isActive);
  };
function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutside(wrapperRef);

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
            <input
              type="text"
              placeholder="Search Notes"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <Icon
            icon="material-symbols:close"
            className="icon"
            onClick={() => {
              setSearch("");
            }}
          />
        </div>
      )}

      <div>
        <nav className="nav">
          <Icon
            icon="bx:menu-alt-right"
            className={`menu-icon`}
            onClick={ToggleClass}
          />
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
          <div
          ref={wrapperRef}
            className="nav-inner-mobile"
            style={{
              transform: isActive ? "translateY(20px)" : null,
              visibility: isActive ? "visible" : "hidden",
            }}
            onClick={ToggleClass}
          >
            {!user ? (
              <>
                <Link to="/signup" >
                  <h3>Signup</h3>
                </Link>
                <Link to="/login" >
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
