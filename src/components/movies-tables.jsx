import React, { Component } from "react";
import Table from "./common/table";

class MoviesTable extends Component {
  render() {
    const { movies, columns, sortedItem, onSort } = this.props;

    return (
      <Table
        data={movies}
        onSort={onSort}
        sortedItem={sortedItem}
        columns={columns}
      />
    );
  }
}

export default MoviesTable;
