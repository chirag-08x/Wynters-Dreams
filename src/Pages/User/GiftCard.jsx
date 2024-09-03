import React, { forwardRef, useEffect } from "react";
import { styled } from "styled-components";

const GiftCard = forwardRef(({ voucher }, targetRef) => {
  return (
    <div>
      <Voucher ref={targetRef}>
        <img src="/images/user-dashboard/gift.png" alt={voucher?.id} />
        <div className="details-container">
          <div>
            <div>Voucher Code: {voucher?.code}</div>
            <div>Number of books: {voucher?.numberOfBooks}</div>
          </div>
        </div>
      </Voucher>
    </div>
  );
});

export default GiftCard;

const Voucher = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px dashed #050162;
  background: var(--Grey-Scale-grey-scale-0, #fff);
  box-shadow: 0px 0px 9.7px 3px rgba(5, 1, 98, 0.1);
  max-width: 432px;
  margin: auto;
  margin-top: 10rem;
  /* position: fixed;
  left: -100vw; */

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  img {
    width: 112px;
    height: 112px;
    flex-shrink: 0;
  }
`;
