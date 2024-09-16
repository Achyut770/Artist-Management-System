import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaSpinner } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';

const UserRow = ({ user, headings, deleteData }) => {
    const { pathname } = useLocation()
    const [deleteLoading, setDeleteLoading] = useState(false)
    const deletes = async (id) => {
        setDeleteLoading(() => true)
        await deleteData(id)
        setDeleteLoading(() => false)
    }
    return (
        <tr>
            {headings.map(heading => (
                <td key={heading.key} data-label={heading.key}>
                    {user[heading.key]}
                </td>
            ))}
            <td className="action_body" data-label="Action">
                <div onClick={() => deletes(user.id)}>
                    {deleteLoading ? <FaSpinner />
                        : <MdDelete />}
                </div>
                <div>
                    <Link to={`${pathname}/edit/${user.id}`}><MdEdit /></Link>

                </div>
            </td>
        </tr>
    );
};

export default UserRow;
