import styled from "styled-components";
import Logo from "../../assets/Logo.svg";
import { footerLinks, socials } from "../../helpers/footerLinks";
import { Link } from "react-router-dom";
import { deviceMin } from "../../styles/size";
import { LuLocate } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <Wrapper>
      <section className="section-center">
        <div className="info">
          <div>
            <img src={Logo} alt="" />
            <h1>Wynter's Dreams</h1>
          </div>
          <p className="p-small">&copy; 2023 - {new Date().getFullYear()} </p>
        </div>

        <div>
          <div className="footer-links">
            {footerLinks.map(({ id, name, href }, index) => {
              return (
                <Link className="p-small" key={`${index + 1}`} to={href}>
                  {name}
                </Link>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "#fff", textAlign: "center" }}>
            <FaLocationDot />
            &nbsp; C/2/2, Amit Nagar, Yari Road, Andheri West, Mumbai 400061
          </p>
        </div>

        <div className="socials">
          {socials.map(({ id, logo, href }, index) => {
            return (
              <a key={`${index + 1}`} href={href} target="_blank">
                {logo}
              </a>
            );
          })}
        </div>
      </section>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  padding: 4rem 0;
  background: url("/images/footer/bcg.png");
  background-position: center;
  background-repeat: no-repeat;

  img {
    width: auto;
  }

  .section-center {
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    padding: 1rem 0;

    @media ${deviceMin.tablet} {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
    }

    .info {
      margin-bottom: 1rem;
      > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      h1 {
        font-size: 1.3rem;
        color: white;
      }

      p {
        margin-top: 1rem;
      }
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .socials {
      display: flex;
      gap: 0 1rem;

      a {
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        padding: 0.6rem;
        display: grid;
        place-items: center;
        color: white;
      }
    }
  }
`;
