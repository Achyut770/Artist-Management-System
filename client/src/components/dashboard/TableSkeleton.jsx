import React from 'react'
import "./styles/tableSkeleton.css"

const TableSkeleton = ({ headings }) => {
    return (
        <table className="table table-skeleton">
            <thead>
                <tr>
                    {headings.map((item) => (
                        <th key={item.key} className="loading">
                            <div className="pulse"></div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                        {headings.map((heading, i) => (
                            <td key={i} data-label={heading.key} className="loading">
                                <div className="pulse"></div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableSkeleton