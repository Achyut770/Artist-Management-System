import React from 'react';
import "./styles/table.css";
import UserRow from './userRow';
import TableSkeleton from '../dashboard/TableSkeleton';

const Table = ({ headings, data, deleteData, redirect = false, action = true, loading }) => {
    if (loading) {
        return <TableSkeleton headings={headings} />;
    }

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
                {data && data.length > 0 ? (
                    data.map(user => (
                        <UserRow
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
                        <td colSpan={headings.length + 1} className="no_data">No data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
