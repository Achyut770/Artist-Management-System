import React, { useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const UserRow = ({ user, headings, deleteData, action, redirect }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const deletes = async (id) => {
    setDeleteIsLoading(() => true);
    await deleteData(id);
    setDeleteIsLoading(() => false);
  };

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <tr>
      {headings.map((heading) => (
        <td key={heading.key} data-label={heading.key}>
          {user[heading.key]}
        </td>
      ))}
      <td className="action_body" data-label="Action">
        <button onClick={() => deletes(user.id)} disabled={!action}>
          {deleteIsLoading ? <FaSpinner /> : <MdDelete />}
        </button>
        <button
          disabled={!action}
          onClick={() => navigateTo(`${pathname}/edit/${user.id}`)}
        >
          <MdEdit />
        </button>
        {redirect && (
          <button onClick={() => navigateTo(`${pathname}/${user.id}/songs`)}>
            <FaEye />
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
