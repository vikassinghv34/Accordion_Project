import React, { ChangeEvent, useState } from "react";
import CommentData from "./components/interface";

const accordion = ({ data }: CommentData): JSX.Element => {
  const comments = data.slice(0, 10);
  const [limitedData, setLimitedData] = useState(comments);
  // const [sortedData, setSortedData] = useState(limitedData);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let search = event.target.value;
    setSearchValue(search);
  };

  const handleSortData = () => {
    const sorted = [...limitedData].sort((a, b) =>
      a.body.localeCompare(b.body)
    );

    setIsSorted(true);
    setLimitedData(sorted);
    // setSortedData(limitedData);
    setActiveIndex(null);
  };

  const handleUnsortData = () => {
    // setSortedData(limitedData);
    setIsSorted(false);
    setLimitedData(data.slice(0, limitedData.length));
    setActiveIndex(null);
  };

  const handleShowMore = () => {
    const showMoreData = data.slice(0, limitedData.length + 5).sort();
    setLimitedData(showMoreData);
    setIsSorted(false);
    setActiveIndex(null);
  };

  const handleShowLess = () => {
    const showLessData = data.slice(0, limitedData.length - 5);
    setLimitedData(showLessData);
    setIsSorted(false);
    setActiveIndex(null);
  };

  const handleIndex = (currIndex) => {
    setActiveIndex((prevIndex) => (prevIndex == currIndex ? null : currIndex));
  };

  return (
    <div className="container mt-4">
      <div className="row ">
        <div className="col-12 p-2 text-center fw-bolder fs-3">Comments</div>
        <div className="col-12">
          <form className="d-flex">
            <input
              className="form-control me-2"
              onChange={handleChange}
              type="search"
              value={searchValue}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="col-12 d-flex justify-content-between mt-2">
          <button
            className="col-3 btn btn-primary"
            disabled={isSorted}
            onClick={handleSortData}
          >
            Sort Data
          </button>
          <button
            className="col-3 btn btn-primary"
            disabled={!isSorted}
            onClick={handleUnsortData}
          >
            Unsort Data
          </button>
        </div>
        <div className="col-12 mt-2">
          {limitedData
            .filter((comments: CommentData) =>
              comments.body.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((comment: CommentData, index: number) => {
              console.log(index);

              return (
                <div key={index} className={` bg-white `}>
                  <button
                    onClick={() => handleIndex(comment.id)}
                    className={` mx-auto w-100 row  justify-content-center py-2 px-0  border border-2 d-flex ${
                      activeIndex == comment.id
                        ? "text-dark rounded-top border-bottom-0 bg-light"
                        : "text-dark bg-white rounded"
                    }`}
                  >
                    <div className={` fs-6 text-start col-11 `}>
                      {comment.id}:- {comment.body}
                    </div>
                    <div
                      className="fw-bold fs-5 text-center col-1 mx-auto "
                      style={{
                        transform:
                          activeIndex == comment.id
                            ? "rotate(270deg)"
                            : "rotate(90deg)",
                        transition: "transform 0.5s ease",
                      }}
                    >
                      &gt;
                    </div>
                  </button>
                  <div
                    className={`row text-dark text-start mx-auto min-h-max`}
                    style={{ transition: "height 2s ease-in-out" }}
                  >
                    {activeIndex == comment.id && (
                      <div
                        className={`fw-bold fs-6 py-2 col-12 border bg-light ${
                          activeIndex == comment.id
                            ? "border-2 border-top-0 rounded-bottom animate__animated animate__flipInX"
                            : "border-0"
                        }`}
                      >
                        User Id:- {comment.user.id}
                        <br />
                        Username:- <span>{comment.user.username}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-12 d-flex justify-content-between">
          <button
            className="btn btn-outline-success col-3 mt-2"
            onClick={handleShowMore}
          >
            Show More
          </button>
          <button
            className="btn btn-outline-success col-3 mt-2"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        </div>
      </div>
    </div>
  );
};

export default accordion;
