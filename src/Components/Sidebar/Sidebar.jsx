import styled from "styled-components";
import { deviceMax } from "../../styles/size";
import Logo from "../../assets/Logo.svg";
import { FaBars } from "react-icons/fa6";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { navLinks } from "../../helpers/NavLinks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Context/UserContext";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    state: { user },
    logoutUser,
  } = useUserContext();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Wrapper>
      <section className="section-center">
        <header>
          <Link to={"/"} className="hero">
            <img src={Logo} alt="" />
            <h1>Wynter's Dreams</h1>
          </Link>

          <div className="sidebar-btn">
            {!showSidebar && (
              <button onClick={toggleSidebar}>
                <FaBars style={{ cursor: "pointer" }} />
              </button>
            )}
            {showSidebar && (
              <button onClick={toggleSidebar}>
                <FaTimes style={{ cursor: "pointer" }} />
              </button>
            )}
          </div>
        </header>

        {showSidebar && (
          <div className="links-container">
            {navLinks.map(({ id, name, href }, index) => {
              return (
                <NavLink
                  style={({ isActive }) => {
                    return { color: isActive ? "#0EA1E0" : "#050162" };
                  }}
                  onClick={toggleSidebar}
                  className="link"
                  key={`${index + 1}`}
                  to={href}
                >
                  {name}
                </NavLink>
              );
            })}
            <NavLink
              style={({ isActive }) => {
                return { color: isActive ? "#0EA1E0" : "#050162" };
              }}
              onClick={toggleSidebar}
              className="link"
              to={"/cart"}
            >
              <FaShoppingCart /> Cart
            </NavLink>
            {user && (
              <Link to={"/dashboard"} className="btn user-btn">
                <FaUserCircle />
              </Link>
            )}
            {user ? (
              <button className="btn" onClick={logoutUser}>
                Logout
              </button>
            ) : (
              <>
                <Link to={"/register"} onClick={toggleSidebar} className="btn">
                  sign up
                </Link>
                <Link to={"/login"} onClick={toggleSidebar} className="btn">
                  Log In
                </Link>
              </>
            )}
          </div>
        )}
      </section>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.aside`
  box-shadow: 0px 0px 18px 0px rgba(5, 1, 98, 0.55);
  @media ${deviceMax.tablet} {
    display: none;
  }

  border-bottom: 4px solid var(--clr-yellow-light);

  .section-center {
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;

      .hero {
        display: flex;
        align-items: center;
        gap: 0 0.5rem;

        img {
          width: auto;
        }

        h1 {
          color: var(--clr-dark-blue);
          font-size: 1.125rem;
        }
      }

      .sidebar-btn {
        position: relative;

        > button {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--clr-dark-blue);
        }
      }
    }

    .links-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: white;
      padding: 1rem 0;

      .btn {
        color: var(--clr-dark-blue);
        border: 1px solid var(--clr-dark-blue);
        width: 6.5rem;
        text-align: center;
      }

      .user-btn {
        border: none;
        padding: 0;
        text-align: left;
        width: auto;
        align-self: flex-start;
        * {
          font-size: 1.5rem;
        }
      }
    }
  }
`;
