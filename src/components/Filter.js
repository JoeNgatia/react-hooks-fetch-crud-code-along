import React from 'react';

function Filter({ category, onCategoryChange }) {
  function handleCategoryChange(e) {
    onCategoryChange(e.target.value);
  }

  return (
    <div className="Filter">
      <select value={category} onChange={handleCategoryChange}>
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="Snacks">Snacks</option>
      </select>
    </div>
  );
}

export default Filter;
