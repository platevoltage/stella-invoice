import React from 'react'
import { Columns, Tag, columnDef, Client } from '../interfaces';
import './ClientList.css'
import Papa from 'papaparse';

interface Props {
    clientMetaData: Client[];
    inputCSV: Tag[];
    invoiceItems: Columns;
}

const unparseConfig: Papa.UnparseConfig = {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",\t",
    header: false,
    newline: "\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    // columns: null //or array of strings
}

export default function ClientList({clientMetaData, inputCSV, invoiceItems}: Props) {
    function processInvoices() {
    const csvArray = [];
    console.log(inputCSV);
    for (let client of clientMetaData) {
      //filter by clientID
      const filtered: Tag[] = inputCSV.filter((x: Tag) => x.clientId === client.id);
      //remove unwanted columns
      const output: any[] = []; 
      for (let tag of filtered) {
        const object: object = {};
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Tag] === true ) {
            Object.defineProperty(object, key, {
              value: tag[key as keyof Tag],
              enumerable: true
            })
          };
        }
        output.push(object);
      }
      const csv = Papa.unparse(output, unparseConfig);
      csvArray.push(csv);
    }
    // setOutputCSVs(csvArray);
    window.localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    return csvArray;
  }

  function handleDownload() {
    const csvArray = processInvoices();
    for (let i in clientMetaData) {
      setTimeout(() => {
        let csv = "";
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Columns]) {
            csv += columnDef[key as keyof Columns] + ',';
          }
        }
        csv += "\n" + csvArray[i];
        const blob = new Blob([csv], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${clientMetaData[i].id} - ${new Date().toDateString()}.csv`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, +i*300);
    }
  };
  return (
    <div className="client-list">
        {clientMetaData.map((client) => 
        <div>
            <button className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg></button>
            {client.name}
        </div>
        )}
        {clientMetaData.length < 1 && <div className="no-file">No File Selected</div>}
        <button className="button" onClick={handleDownload}>Download All</button>
    </div>
  )
}
