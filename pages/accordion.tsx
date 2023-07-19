import React, { ChangeEvent, useState } from "react";
import CommentData from "./components/interface";

const accordion = ({ data }: CommentData): JSX.Element => {
  const [limitedData, setLimitedData] = useState<number>(10);
  const [fetchedData, setFetchedData] = useState<CommentData>(data);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let search = event.target.value;
    setSearchValue(search);
  };

  const handleSortData = () => {
    const sorted = [...fetchedData].sort((a, b) =>
      a.body.localeCompare(b.body)
    );

    setIsSorted(true);
    setFetchedData(sorted);
    setActiveIndex(0);
  };

  const handleUnsortData = () => {
    setIsSorted(false);
    setFetchedData(data);
    setActiveIndex(0);
  };

  const handleShowMore = () => {
    setLimitedData(limitedData == data.length ? limitedData : limitedData + 5);
    setIsSorted(isSorted === false ? false : true);
    setActiveIndex(0);
  };

  const handleShowLess = () => {
    setLimitedData(limitedData == 5 ? limitedData : limitedData - 5);

    setIsSorted(isSorted === false ? false : true);
    setActiveIndex(0);
  };

  const handleIndex = (currIndex: number) => {
    setActiveIndex((prevIndex: number) =>
      prevIndex == currIndex ? 0 : currIndex
    );
  };
  console.log("data count" + limitedData);

  return (
    // main start
    <div className="container my-4 ">
      <div className="row ">
        <div className="col-12 p-2 text-center fw-bolder fs-3">Comments</div>
        <div className="col-12">
          {/* search */}
          <form className="d-flex">
            <input
              className="form-control"
              onChange={handleChange}
              type="search"
              value={searchValue}
              placeholder="Search here"
            />
          </form>
        </div>
        <div className="col-12 d-flex justify-content-between mt-3">
          <button
            className="col-md-3 col-5 btn btn-primary"
            disabled={isSorted}
            onClick={handleSortData}
          >
            Sort Data
          </button>
          <button
            className="col-md-3 col-5 btn btn-primary"
            disabled={!isSorted}
            onClick={handleUnsortData}
          >
            Unsort Data
          </button>
        </div>
        <div className="mt-3">
          {fetchedData
            .filter((comments: CommentData) =>
              comments.body
                .toLowerCase()
                .includes(
                  searchValue.length >= 3 ? searchValue.toLowerCase() : ""
                )
            )
            .slice(0, limitedData)
            .map((comment: CommentData, index: number) => {
              // console.log(index);

              return (
                <div key={index} className={` col-12 bg-white `}>
                  <button
                    onClick={() => handleIndex(comment.id)}
                    className={` mx-auto w-100 row justify-content-center py-2 px-0  border border-2 ${
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
        <div className="col-12 d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-success col-md-3 col-5"
            onClick={handleShowMore}
          >
            Show More
          </button>
          <button
            className="btn btn-outline-success col-md-3 col-5"
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
