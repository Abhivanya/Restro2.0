import React, { useState } from "react";
import "./Form.css";
const Form = ({ updated }) => {
  const [enteredDish, setEnteredDish] = useState("");
  const [enteredOrderId, setEnteredOrderId] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [selectedTable, setSelectedTable] = useState("table1");

  const onOrderIdChange = (e) => {
    setEnteredOrderId(e.target.value);
  };

  const onOrderPriceChange = (e) => {
    setEnteredPrice(e.target.value);
  };

  const onOrderDishChange = (e) => {
    setEnteredDish(e.target.value);
  };

  const onOrderTable = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredDish || !enteredOrderId || !enteredPrice || !selectedTable) {
      alert("Please fill all fields before submitting.");
      return;
    }
    const idExists = localStorage.getItem(enteredOrderId);
    if (idExists) {
      alert("ID already exists");
      return;
    }
    const newOrder = {
      id: enteredOrderId,
      price: enteredPrice,
      dish: enteredDish,
      tableNo: selectedTable,
    };
    localStorage.setItem(enteredOrderId, JSON.stringify(newOrder));
    updated();
    setEnteredDish("");
    setEnteredOrderId("");
    setEnteredPrice("");
    setSelectedTable("table1");
  };

  console.log(localStorage.length);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="orderId">Order ID:</label>
        <input
          type="text"
          id="orderId"
          placeholder="Order ID"
          value={enteredOrderId}
          name="orderId"
          required
          onChange={onOrderIdChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          placeholder="$400"
          value={enteredPrice}
          name="price"
          required
          onChange={onOrderPriceChange}
        />

        <label htmlFor="orderDish">Choose Dish:</label>
        <input
          type="text"
          id="orderDish"
          placeholder="e.g., Paratha"
          value={enteredDish}
          name="orderDish"
          onChange={onOrderDishChange}
          required
        />

        <label htmlFor="tableNo">Select Table:</label>
        <select id="tableNo" value={selectedTable} onChange={onOrderTable}>
          <option value="table1">Table 1</option>
          <option value="table2">Table 2</option>
          <option value="table3">Table 3</option>
        </select>

        <button className="btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Form;
