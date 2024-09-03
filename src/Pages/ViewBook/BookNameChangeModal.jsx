import React from "react";
import Modal from "../../Components/Modal/Modal";
import { ModalWrapper } from "./ViewBook";

export default function BookNameChangeModal({
  openNameReplaceModal,
  setReplaceName = () => {},
  setOpenNameReplaceModal = () => {},
}) {
  return (
    <Modal
      isModalOpen={openNameReplaceModal}
      closeModal={() => {
        setReplaceName(false);
        setOpenNameReplaceModal(false);
      }}
    >
      <ModalWrapper>
        <h3>Character Name Change!</h3>

        <div className="info-box">
          <p>
            The main character's name magically adapts to match the child
            reading the book.
          </p>
        </div>
        <div className="info-box">
          <p className="p-xs">
            The main character’s name does not change if gender specified for
            your child does not correspond to the character in the story.
          </p>
        </div>
        <div className="btns-container">
          <button
            onClick={() => {
              setOpenNameReplaceModal(false);
              setReplaceName(false);
            }}
            className="btn btn-outline"
          >
            Don't Change Name
          </button>
          <button
            onClick={() => {
              setOpenNameReplaceModal(false);
              setReplaceName(true);
            }}
            className="btn btn-yellow"
          >
            Start Reading
          </button>
        </div>
      </ModalWrapper>
    </Modal>
  );
}
