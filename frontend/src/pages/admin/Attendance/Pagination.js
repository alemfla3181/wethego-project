import styled from "styled-components";
import React, { useEffect, useState } from "react";

function Pagination({ total, limit, page, setPage }) {

  const numPages = Math.ceil(total / limit);
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 25px;
`;

const Button = styled.button`
  width: 2.55rem;
  height: 2.55rem;
  padding: 9px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;
  border: 1px solid #d3d3d3;

  &:hover {
    border: 1px solid #272a33;
    cursor: pointer;
    transition: .5s;
  }

  &[disabled] {
    background: #d3d3d3;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #272a33;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    border: 1px solid #272a33;
  }
`;

export default Pagination;
