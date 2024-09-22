import React from "react";
import { Form } from "react-bootstrap";
import './Pagination.css';

function Pagination({ currentPage, totalPages, handleNextPage, handlePreviousPage, handlePagination, pageRange, itemsPerPage, setItemsPerPage }) {
  return (
    <div className="custom-pagination">
      <button className="circle-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      <div className="pagination-numbers">
        {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, i) => {
          const page = pageRange[0] + i;
          if (page <= totalPages) {
            return (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePagination(page)}
              >
                {page}
              </button>
            );
          }
          return null;
        })}
      </div>
      <button className="circle-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
      
      {/* Add items per page limit selection next to pagination controls */}
      <Form.Select
        aria-label="Select number of items per page"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        className="w-auto ml-3"
      >
        <option value={12}>12 per page</option>
        <option value={24}>24 per page</option>
      </Form.Select>
    </div>
  );
}

export default Pagination;
