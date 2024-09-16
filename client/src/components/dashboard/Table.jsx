import React from 'react';
import "./styles/table.css";
import UserRow from './userRow';


const Table = ({ headings, data, deleteData }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    {headings.map((item) => {
                        return <th key={item.key}>{item.label}</th>
                    })}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map(user => (
                    <UserRow headings={headings} deleteData={deleteData} user={user} />
                ))}

            </tbody>
        </table>)
}

export default Table