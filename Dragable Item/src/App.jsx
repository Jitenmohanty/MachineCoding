import { useState } from "react";
import "./App.css";

export default function App() {
  const [content, setContent] = useState({
    column1: ["item1", "item2"],
    column2: ["item3", "item4"],
    column3: ["item5", "item6"],
  });

  const onDrop = (e, toColumn) => {
    const item = e.dataTransfer.getData("item");
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;

    setContent((prev) => {
      const fromData = prev[fromColumn].filter(
        (existData) => existData !== item
      );
      const toData = [...prev[toColumn], item];

      return {
        ...prev,
        [toColumn]: toData,
        [fromColumn]: fromData,
      };
    });
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e, item, fromColumn) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("fromColumn", fromColumn);
  };

  const createNewItemEnries = (e, column) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    // console.log(data);
    setContent((prev) => ({
      ...prev,
      [column]: [...prev[column], data[column]],
    }));

    e.target.reset()
  };

  const createColumn = ()=>{
    let totalcolumn = Object.keys(content).length;
    let newColumnName = `column${totalcolumn+1}`;
    setContent((prev)=>({
      ...prev,
      [newColumnName]:[]
    }))
  }

  return (
    <div className="App">
      {Object.keys(content).map((column, index) => (
        <div
          key={index}
          onDrop={(e) => onDrop(e, column)}
          onDragOver={onDragOver}
          className="box"
        >
          {content[column].map((item,index) => (
            <div
              key={index}
              onDragStart={(e) => onDragStart(e, item, column)}
              className="inner"
              draggable
            >
              {item}
            </div>
          ))}
          <form onSubmit={(e) => createNewItemEnries(e, column)}>
            <input type="text" placeholder="add item..." name={column} />
          </form>
        </div>
      ))}
      <button onClick={createColumn}>+ Add Column</button>
    </div>
  );
}
