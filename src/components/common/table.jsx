import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = ({ data, onSort, sortedItem, columns }) => {
  return (
    <table className="table table-striped table-sm">
      <TableHeader onSort={onSort} sortedItem={sortedItem} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
