import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = ({ added, updated }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      const localOrders = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        localOrders.push(value);
      }
      setOrders(localOrders);
    };
    getOrders();
  }, [added]);

  const groupedOrders = orders.reduce(
    (acc, order) => {
      acc[order.tableNo]?.push(order);
      return acc;
    },
    { table1: [], table2: [], table3: [] }
  );

  const deleteOrder = (id) => {
    localStorage.removeItem(id);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    updated();
  };

  return (
    <div className="table">
      <div className="table1">
        <h2>Table 1:</h2>
        <ul>
          <OrderItem items={groupedOrders.table1} onDelete={deleteOrder} />
        </ul>
      </div>
      <div className="table2">
        <h2>Table 2:</h2>
        <ul>
          <OrderItem items={groupedOrders.table2} onDelete={deleteOrder} />
        </ul>
      </div>
      <div className="table3">
        <h2>Table 3:</h2>
        <ul>
          <OrderItem items={groupedOrders.table3} onDelete={deleteOrder} />
        </ul>
      </div>
    </div>
  );
};

const OrderItem = ({ items, onDelete }) => {
  return (
    <>
      {items.length > 0 &&
        items.map((order) => (
          <li key={order.id} className="orderList">
            <div>Dish : {order.dish}</div>
            <div>Price : ${order.price}</div>
            <button className="deleteBtn" onClick={() => onDelete(order.id)}>
              Cancel order
            </button>
          </li>
        ))}
    </>
  );
};

export default Orders;
