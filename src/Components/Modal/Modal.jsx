import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { deviceMin } from "../../styles/size";

const Modal = ({ isModalOpen, children, closeModal }) => {
  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <Wrapper>
      <div className="container">
        <button className="close-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        {children}
      </div>
    </Wrapper>,
    document.getElementById("modal")
  );
};

export default Modal;

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: grid;
  place-items: center;

  .container {
    width: 90vw;
    max-width: 30rem;
    margin: 0 auto;
    position: relative;
    background-color: white;
    padding: 2.25rem 1.5rem;
    border-radius: 0.2rem;

    @media ${deviceMin.tablet} {
      padding: 3rem 2rem;
    }

    h3 {
      color: var(--clr-dark-blue);
      margin-bottom: 1rem;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      * {
        color: rgba(240, 0, 0, 0.7);
        font-size: 1.25rem;
      }
    }
  }
`;
