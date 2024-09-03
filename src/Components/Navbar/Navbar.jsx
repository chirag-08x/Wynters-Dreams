import styled from "styled-components";
import { deviceMin } from "../../styles/size";
import { navLinks } from "../../helpers/NavLinks";
import Logo from "../../assets/Logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const {
    state: { user },
    logoutUser,
  } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Wrapper>
      <section className="section-center">
        <Link to={"https://wyntersdreams.com"} className="hero">
          <img src={Logo} alt="" />
          <h2>Wynter's Dreams</h2>
        </Link>

        <div className="nav-links">
          {navLinks.map(({ id, name, href }, index) => {
            return (
              <NavLink
                style={({ isActive }) => {
                  return { color: isActive ? "#0EA1E0" : "#050162" };
                }}
                className="link"
                key={`${index + 1}`}
                to={href}
              >
                {name}
              </NavLink>
            );
          })}
          {user ? (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to={"/register"} className="btn">
                Sign Up
              </Link>
              <Link to={"/login"} className="btn">
                Log In
              </Link>
            </>
          )}
          {user && (
            <>
              {user.admin && (
                <Link to={"/admin"} className="btn user-btn">
                  Admin
                </Link>
              )}
              <Link to={"/dashboard"} className="btn user-btn">
                <FaUserCircle />
              </Link>
              <Link to={"/cart"} className="btn user-btn">
                <FaCartShopping />
              </Link>
            </>
          )}
          {user && !user?.subscription && (
            <Link to={"/subscription"} style={{}} className="btn btn-dark">
              Subscribe
            </Link>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  display: none;
  box-shadow: 0px 0px 18px 0px rgba(5, 1, 98, 0.55);

  @media ${deviceMin.tablet} {
    display: block;
    > section {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      justify-items: flex-end;
      padding: 1rem 0;

      .hero {
        display: flex;
        align-items: center;
        gap: 0 0.5rem;

        h2 {
          color: var(--clr-dark-blue);
          font-size: 1.125rem;
        }

        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 0 2rem;
        text-transform: capitalize;

        .link {
          color: var(--clr-dark-blue);
        }

        .btn {
          color: var(--clr-dark-blue);
          border: 1px solid var(--clr-dark-blue);
        }

        .btn-dark {
          color: #fff;
          background-color: var(--clr-dark-blue);
          border: 0px solid var(--clr-dark-blue);
        }

        .user-btn {
          border: none;
          padding: 0;
          * {
            font-size: 2rem;
          }
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    > section {
      .hero {
        h2 {
          font-size: 1.5rem;
        }
      }
    }
  }
  border-bottom: 4px solid var(--clr-yellow-light);
`;
