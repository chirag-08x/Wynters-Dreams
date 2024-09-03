import React, { forwardRef, memo } from "react";
import HTMLFlipBook from "react-pageflip";
import ImageComponent from "../../Components/Book/ImageComponent";

const MainBook = forwardRef(
  (
    {
      currentAudio,
      setCurrentAudio,
      setCurrentPageIndex,
      setSelectedButton,
      landscapeBookData,
      setPlayingAudioBook,
      flip,
    },
    ref
  ) => {
    return (
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        disableFlipByClick={true}
        drawShadow={true}
        autoSize={true}
        showPageCorners={false}
        useMouseEvents={false}
        minHeight={400}
        maxHeight={1533}
        onFlip={(e) => {
          currentAudio?.pause();
          setCurrentAudio(null);
          setPlayingAudioBook(false);
          if (e.data == 0) {
            setCurrentPageIndex(0);
            setSelectedButton([]);
          } else {
            setSelectedButton((prev) => {
              const updatedData = JSON.parse(JSON.stringify(prev));
              const targetIndex = updatedData.findIndex(
                (p) => p == e.object.pages.currentPageIndex
              );
              if (targetIndex != -1) {
                updatedData.pop();
              } else {
                updatedData.push(e.data);
              }
              return updatedData;
            });
            setCurrentPageIndex(e.data);
          }
        }}
        // maxShadowOpacity={0.5}
        flippingTime={620}
        // showCover={true}
        mobileScrollSupport={true}
        ref={ref}
      >
        {landscapeBookData.map((pageBook, index) => {
          return pageBook.image ? (
            <div className="book-img">
              <ImageComponent show={true} url={pageBook.image} alt="" />
              {/* <img src={pageBook.image} alt={""} /> */}
            </div>
          ) : (
            <div key={pageBook.heading} className="book-text">
              <h2 className="chapter-name">{pageBook.heading}</h2>
              <div
                className="book-content"
                dangerouslySetInnerHTML={{ __html: pageBook.text }}
              ></div>

              <div className="book-btns">
                <p className="btn-text">
                  {pageBook.end_chapter
                    ? "The End"
                    : "Click on the options to move ahead:"}
                </p>
                <div className="btn-container">
                  {pageBook.buttons &&
                    pageBook.buttons.length > 0 &&
                    pageBook.buttons.map(
                      ({ text, next_chapter, next_chapter_index }, idx) => {
                        if (text.toLowerCase() == "restart book") {
                          return null;
                        }
                        return (
                          <button
                            className={`btn btn-${idx + 1}`}
                            key={next_chapter}
                            onClick={() => flip(next_chapter_index * 2)}
                          >
                            {text}
                          </button>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </HTMLFlipBook>
    );
  }
);

export default memo(MainBook);
