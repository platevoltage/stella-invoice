
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
    escapeChar: '',
    delimiter: ",",
    header: false,
    newline: "\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    // columns: null //or array of strings
}

export default function ClientList({clientMetaData, inputCSV, invoiceItems}: Props) {
  function processInvoices() {
    const csvArray = [];
    for (let client of clientMetaData) {
      //filter by clientID
      const filtered: Tag[] = inputCSV.filter((x: Tag) => x.clientId === client.id);
      //remove unwanted columns
      const output: any[] = []; 
      for (let tag of filtered) {
        const object: object = {};
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Tag] === true ) {
            const value = tag[key as keyof Tag];
            Object.defineProperty(object, key, {
              // value: typeof value === 'string' && value.includes(',') ? `"${value}"` : value ,
              value,
              enumerable: true
            })
          };
        }
        output.push(object);
      }
      console.log(output);
      const csv = Papa.unparse(output, unparseConfig);
      csvArray.push(csv);
    }
    window.localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    return csvArray;
  }

  function handleDownload(_: any, index = -1) {
    const csvArray = processInvoices();
    if (index >= 0) {   //if no id, all files are downloaded
      downloadFile(csvArray, index);
    } 
    else {
      for (let i in clientMetaData) {
        setTimeout(() => {
          downloadFile(csvArray, +i);
        }, +i*300);
      }
    }
  };

  function downloadFile(csvArray: string[], i: number) {
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
  }

  return (
    <div className="client-list">
        {/* {clientMetaData.length < 1 ? 
          <div className="no-file">No File Selected</div> : 
          <button className="button download-all" onClick={handleDownload}><span id={"all"}>Download All</span></button>
        } */}
        {clientMetaData.length < 1 ? 
          <div className="no-file">No File Selected</div> : 
          <></>
        }
        {clientMetaData.map((client, index) => 
        <div key={index}>
            <button className="button" onClick={(e:any) => handleDownload(e, index)}>
              <svg id={index.toString()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </button>

            <button className="button" onClick={(e:any) => handleDownload(e, index)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-receipt" viewBox="0 0 16 16">
                <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            {client.name}
        </div>
        )}
        
    </div>
  )
}
