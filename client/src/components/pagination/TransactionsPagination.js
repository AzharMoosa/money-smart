import React from "react";
import { Link } from "react-router-dom";

const TransactionsPagination = ({ pages, page }) => {
  return (
    pages > 1 && (
      <>
        <div className="pagination">
          <Link
            className={`link`}
            to={page > 1 ? `/transactions/page/${page - 1}` : "/transactions"}
          >
            <h3>{page > 1 ? "Previous" : ""}</h3>
          </Link>
          <div className="pages">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={`link ${page === x + 1 ? "currentPage" : ""}`}
                key={x + 1}
                to={`/transactions/page/${x + 1}`}
              >
                <h4>{x + 1}</h4>
              </Link>
            ))}
            <Link
              className={`link`}
              to={
                page < pages
                  ? `/transactions/page/${page + 1}`
                  : "/transactions"
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

export default TransactionsPagination;
