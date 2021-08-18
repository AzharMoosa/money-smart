import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "" }) => {
  return (
    pages > 1 && (
      <>
        <div className="pagination">
          <Link
            className={`link`}
            to={
              page > 1
                ? keyword
                  ? `/savings/search/${keyword}/page/${page - 1}`
                  : `/savings/page/${page - 1}`
                : "/savings"
            }
          >
            <h3>{page > 1 ? "Previous" : ""}</h3>
          </Link>
          <div className="pages">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={`link ${page === x + 1 ? "currentPage" : ""}`}
                key={x + 1}
                to={
                  keyword
                    ? `/savings/search/${keyword}/page/${x + 1}`
                    : `/savings/page/${x + 1}`
                }
              >
                <h4>{x + 1}</h4>
              </Link>
            ))}
            <Link
              className={`link`}
              to={
                page < pages
                  ? keyword
                    ? `/savings/search/${keyword}/page/${page + 1}`
                    : `/savings/page/${page + 1}`
                  : "/savings"
              }
            >
              <h3>{page < pages ? "Next" : ""}</h3>
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default Paginate;
