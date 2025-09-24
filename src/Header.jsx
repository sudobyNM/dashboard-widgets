import React from "react";


function Header({ search, onSearch }) {
  return (
    <header>
      <div
       className="header"
      >
        <div>
          <h4>Dashboard V2</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <div >
            <input
            style={{ width:'300px'}}
              className="input"
              type="search"
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search all widgets..."
              aria-label="Search widgets"
            />
          </div>
          <div style={{display:'flex', gap:'1.5rem', marginLeft:'1.5rem' , alignItems:'center'}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
