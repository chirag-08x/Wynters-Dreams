import React, { memo } from "react";
import ImageComponent from "../../Components/Book/ImageComponent";

function MobileBook({ portraitBookData, currentPortraitPage, flip }) {
  const currentPage = portraitBookData[currentPortraitPage];
  if (!currentPage) {
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
    <div className="portrait-page">
      {currentPage.image ? (
        <div className="book-img">
          <ImageComponent show={true} url={currentPage.image} alt="" />
        </div>
      ) : null}
      <div key={currentPage.heading} className="book-text">
        <h1 className="chapter-name">{currentPage.heading}</h1>
        <div
          className="book-content"
          dangerouslySetInnerHTML={{
            __html: currentPage.text,
          }}
        ></div>

        <div className="book-btns">
          <p className="btn-text">
            {currentPortraitPage === portraitBookData.length - 1
              ? "The End"
              : "Click on the options to move ahead:"}
          </p>
          <div className="btn-container">
            {currentPage.buttons &&
              currentPage.buttons.length > 0 &&
              currentPage.buttons.map(
                ({ text, next_chapter, next_chapter_index }, idx) => {
                  if (text.toLowerCase() == "restart book") {
                    return null;
                  }
                  return (
                    <button
                      className={`btn btn-${idx + 1}`}
                      key={next_chapter}
                      onClick={() => {
                        flip(next_chapter_index);
                      }}
                    >
                      {text}
                    </button>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileBook;
