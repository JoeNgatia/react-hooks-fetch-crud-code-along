import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import Item from './Item';
import Filter from './Filter';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:4000/items", { signal })
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => {
        if (error.name === 'AbortError') {
          // Fetch was aborted
        } else {
          // Handle other errors
          console.error("Failed to fetch items:", error);
        }
      });

    return () => {
      controller.abort(); // Abort fetch request on cleanup
    };
  }, []);

  function handleAddItem(newItem) {
    setItems(prevItems => [...prevItems, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    setItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  function handleDeleteItem(deletedItemId) {
    setItems(prevItems => prevItems.filter(item => item.id !== deletedItemId));
  }

  const itemsToDisplay = items.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={setSelectedCategory} />
      <ul className="Items">
        {itemsToDisplay.map(item => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
