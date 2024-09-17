import React from 'react';
import { toast } from 'react-toastify';
import "./styles/importexport.css";

const ImportExportCsv = ({ onImport, fileName, data = [] }) => {
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
        e.target.value = ""
    };

    const csvFileToArray = (string) => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",").map(header => header.trim());
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows
            .filter(row => row.trim())
            .map(row => {
                const values = row.split(",").map(value => value.trim());
                const obj = csvHeader.reduce((object, header, index) => {
                    object[header] = values[index] || '';
                    return object;
                }, {});
                return obj;
            });
        console.log(array);
        onImport(array);
    };

    const convertToCSV = (objArray) => {
        if (!objArray || !objArray.length) {
            console.error("No data to export");
            return '';
        }
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        const headers = Object.keys(array[0] || {});
        if (!headers.length) {
            console.error("No valid headers found in data");
            return '';
        }
        let str = '';
        str += headers.join(",") + "\r\n";
        array.forEach(obj => {
            const line = headers.map(header => obj[header] || '').join(",");
            str += line + "\r\n";
        });
        return str;
    };

    const downloadCSV = () => {
        if (!data || data.length === 0) {
            toast.info("Not Data to Download");
            return;
        }
        const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='importExpostContainer'>
            <label>
                <div className='buttonImport'>
                    <span>Import CSV</span>
                </div>
                <input type='file' accept=".csv" onChange={handleOnChange} />
            </label>
            <button onClick={downloadCSV}>
                <span> Download CSV</span>
            </button>
        </div>
    );
};

export default ImportExportCsv;
