import React from 'react';
import "../styles/table.css";
import UserRow from './userRow';


const Table = ({ userHeadings, data, deleteData }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    {userHeadings.map((item) => {
                        return <th key={item.key}>{item.label}</th>
                    })}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map(user => (
                    <UserRow userHeadings={userHeadings} deleteData={deleteData} user={user} />
                ))}

            </tbody>
        </table>)
}

export default Table