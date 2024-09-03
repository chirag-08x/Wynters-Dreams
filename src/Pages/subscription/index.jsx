import React, { useEffect, useState } from "react";
import { Wrapper } from "../Books/Books";
import { styled } from "styled-components";
import SubscriptionCard from "./SubscriptionCard";
import { Video } from "../../Components";
import { deviceMin } from "../../styles/size";
import { useUserContext } from "../../Context/UserContext";

const PLANS_SEQUENCE = [
  "c447c5f6-71c4-4155-8ba1-52cf203d132d",
  "4070b8a8-b040-4dd7-b13c-735b2f697e29",
  "3d4ac867-d19a-4d6b-802d-66f50c3da9fa",
  "a858f3d7-2ab3-4f1b-8c9e-4a7476324750",
];

export default function SubscriptionPage() {
  const [plans, setPlans] = useState(null);
  const { axiosInstance } = useUserContext();

  useEffect(() => {
    if (!plans) {
      (async () => {
        const { data } = await axiosInstance.get("/subscription/plan");
        setPlans(
          data.reduce((prev, curr) => {
            prev[curr.id] = curr;
            return prev;
          }, {})
        );
      })();
    }
  }, []);

  if (!plans) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          color: "#fff",
        }}
      >
        <h1> Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "0rem", margin: 0, backgroundColor: "#f2f2f2" }}>
      <img
        src={
          window.innerWidth < 768
            ? "images/subscription/subscription-banner-mobile.jpg"
            : window.innerWidth < 1024
            ? "/images/subscription/subscription-banner-tablet.jpg"
            : "/images/subscription/subscription-banner-desktop.jpg"
        }
      />
      <Section>
        <h2 className="heading">Pricing</h2>
        <p className="description">
          Choose the subscription plan that best suits your <br /> needs and
          start your child’s adventure today!
        </p>
        <div className="pricing-section">
          {PLANS_SEQUENCE.map((id) => {
            const item = plans[id];
            return <SubscriptionCard item={item} key={item.id} />;
          })}
        </div>
      </Section>

      <Section style={{ background: "#fff" }}>
        <div className="video-section">
          <Video paddingBottom={0} />
        </div>
      </Section>
    </div>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  /* width: 100%; */
  margin: auto;

  .heading {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: var(--clr-dark-blue);
  }

  .description {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--clr-dark-blue);
  }

  .pricing-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media ${deviceMin.tablet} {
    .pricing-section {
      margin: auto;
      width: 90%;
      display: flex;
      flex-direction: row;
    }

    .video-section {
      width: 90%;
      margin: auto;
      overflow: hidden;
    }
  }

  @media ${deviceMin.desktop} {
  }
`;
