import React from "react";
import ReactPaginate from "react-paginate";
import "./styles/pagination.css";

const Pagination = ({ handlePageClick, totalPages }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next "
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages || 1}
      previousLabel={`Previous`}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeLinkClassName="active_pagination"
      disabledClassName="disabled"
    />
  );
};

export default React.memo(Pagination);
