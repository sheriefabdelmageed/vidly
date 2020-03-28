import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = columnName => {
    const sortedItem = { ...this.props.sortedItem };
    if (sortedItem.path === columnName) {
      sortedItem.order = sortedItem.order === "asc" ? "desc" : "asc";
    } else {
      sortedItem.path = columnName;
      sortedItem.order = "asc";
    }

    this.props.onSort(sortedItem);
  };

  renderSortIcon = column => {
    if (column.columnPath !== this.props.sortedItem.path) return null;
    if (this.props.sortedItem.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    if (this.props.sortedItem.order === "desc")
      return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(c => (
            <th
              key={c.columnName || c.key}
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort(c.columnPath)}
            >
              {c.columnName} {this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
