import React from 'react';

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleToggleInCart() {
    const updatedItem = { ...item, isInCart: !item.isInCart };

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then(response => response.json())
      .then(updatedItem => onUpdateItem(updatedItem))
      .catch(error => console.error("Failed to update item:", error));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteItem(item.id))
      .catch(error => console.error("Failed to delete item:", error));
  }

  return (
    <li>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleToggleInCart}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
