import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 text-center fw-bolder fs-2">404-Page not found</div>
        <div className="col-12 text-center fs-4 mt-3">Sorry, This page doesn't exist. Go to <Link href={"/"} className="text-decoration-none fw-bold">Home Page</Link></div>
      </div>
</div>
  )
};

export default NotFound;
