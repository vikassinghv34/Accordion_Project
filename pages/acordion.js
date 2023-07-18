import React, { useEffect, useState } from "react";

const acordion = () => {
  const [fetchedData, setfetchedData] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const fetched = async () => {
    const res = await fetch("https://dummyjson.com/comments");
    const comments = await res.json();
    const data = await comments.comments.slice(0, 5);
    setfetchedData(data);
  };
  useEffect(() => {
    fetched();
  }, []);

  const handleIndex = (currIndex) => {
    setActiveIndex((prevIndex) => (prevIndex == currIndex ? null : currIndex));
  };
  return (
    <div className="container">
      {console.log(fetchedData)}
      <div className="row">
        {fetchedData.map((comment, index) => {
          return (
            <div key={index} className={`col-12 bg-white border border-2 py-2`}>
              <button
                onClick={() => handleIndex(comment.id)}
                className={` mx-auto w-100 row  justify-content-center py-2 px-0  border border-2 d-flex ${
                  activeIndex == comment.id
                    ? "text-dark rounded-top bg-light"
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
                        transition:'transform 0.5s ease'
                  }}
                >
                  &gt;
                </div>
              </button>
              <div
                className={`row text-dark text-start mx-auto min-h-max`} style={{transition:"height 2s ease-in-out"}}
              >
                {activeIndex == comment.id && (
                  <div
                    className={`fw-bold fs-6 py-2 col-12 border bg-light ${
                      activeIndex == comment.id
                        ? "border-2 border-top-0 rounded-bottom animate__animated animate__flipInX"
                        : "border-0"
                    }`}
                    // style={{ overflow: "hidden" }}
                  >
                    User Id:- {comment.user.id}<br />
                    Username:- <span>{comment.user.username}</span>
                  </div>
                 )} 
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default acordion;
