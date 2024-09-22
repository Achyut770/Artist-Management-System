import React from "react";
import "./styles/table.css";
import TableRow from "./tableRow";
import TableSkeleton from "./TableSkeleton";

const Table = ({
  headings,
  data,
  deleteData,
  redirect = false,
  action = true,
  isloading,
}) => {
  if (isloading) return <TableSkeleton headings={headings} />;

  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((item) => (
            <th key={item.key}>{item.label}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && !!data.length ? (
          data.map((user) => (
            <TableRow
              key={user.id}
              headings={headings}
              deleteData={deleteData}
              user={user}
              action={action}
              redirect={redirect}
            />
          ))
        ) : (
          <tr>
            <td colSpan={headings.length + 1} className="no_data">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
