import React from "react";
import { styled } from "styled-components";

export default function CustomModal({ children, open, onCancel }) {
  return (
    open && (
      <Modal onClick={onCancel}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="card"
        >
          {children}
        </div>
      </Modal>
    )
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #00000030;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    background-color: #fff;
    border-radius: 26px;
    min-width: 40vw;

    .btn {
      color: var(--clr-dark-blue);
      border: 1px solid var(--clr-dark-blue);
      border-radius: 8px;
    }

    .btn-dark {
      color: #fff;
      background-color: var(--clr-dark-blue);
      border: 0px solid var(--clr-dark-blue);
    }

    .btn-dark-outline {
      /* color: #fff; */
      color: var(--clr-dark-blue);
      border: 1px solid var(--clr-dark-blue);
    }
  }
`;
