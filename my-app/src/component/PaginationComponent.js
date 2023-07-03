import React from "react";
import "../main.css";

const PaginationComponent = ({ pagItems, curPage, PAGE_LIM, NUM_CARDS }) => {
  return (
    <>
      <ul className="pagination">
        {pagItems.map((item, index) => (
          <li
            className={`pagination__item ${
              item.isActive ? "pagination__item--active" : ""
            }`}
            key={index}
            onClick={item.onClick}
          >
            {item.content}
          </li>
        ))}
      </ul>
      <p className="pagination-info">
        Showing {Math.min(NUM_CARDS, (curPage - 1) * PAGE_LIM + 1)} - {Math.min(NUM_CARDS, curPage * PAGE_LIM)} out of{" "}
        {NUM_CARDS} instances
      </p>
    </>
  );
};

export default PaginationComponent;
