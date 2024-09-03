import styled from "styled-components";
import logo from "../../assets/video_logo.svg";
import { deviceMin } from "../../styles/size";

const Video = ({ paddingBottom }) => {
  return (
    <Wrapper style={{ paddingBottom }}>
      <section className="section-center">
        <div className="video-container">
          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/avBBlHIQM_M?si=BWlIgJiF3CqrZVJb&controls=0&rel=0"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            controls={0}
          ></iframe> */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MtWPUwvC_MI?si=GeN3dp1140fJ42DU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </section>
    </Wrapper>
  );
};

export default Video;

const Wrapper = styled.div`
  padding-bottom: 4rem;
  border-radius: 1rem;
  overflow: hidden;

  .section-center {
    display: grid;

    .video-container {
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 20rem;

      iframe {
        height: 100%;
        width: 100%;
      }
    }

    .logo {
      display: none;
      padding: 2rem 4rem;
      background-color: var(--clr-blue);

      img {
        width: 15rem;
      }
    }

    @media ${deviceMin.tablet} {
      grid-template-columns: 1fr 1fr;

      .logo {
        display: grid;
        place-items: center;
      }
    }
  }
`;
