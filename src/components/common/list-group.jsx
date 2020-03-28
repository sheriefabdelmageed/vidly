import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemChange,
  selectedItemId
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemChange(item)}
          style={{ cursor: "pointer" }}
          className={
            item[valueProperty] === selectedItemId
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action "
          }
          id="list-home-list"
          data-toggle="list"
          role="tab"
          aria-controls="home"
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
