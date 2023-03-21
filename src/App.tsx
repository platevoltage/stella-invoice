import {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import Papa from 'papaparse';
import { Columns, Tag, columnDef } from './interfaces';

function App() {
  const [inputCSV, setInputCSV] = useState<Tag[]>([]);
  const [outputCSVs, setOutputCSVs] = useState<string[]>([]);
  const [clientIds, setClientIds] = useState<number[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<Columns>({
    jobId: true,
    billingReference: true,
    orderPlacer: true,
    clientName: true,
    clientId: true,
    courier: true,
    courierId: true,
    originName: true,
    originStreet: true,
    originPostalCode: true,
    destinationStreet: true,
    destinationFloorStreetApt: true,
    destinationPostalCode: true,
    destinationZone: true,
    deliveryStatus: true,
    creationTime: true,
    readyTime: true,
    dueTime: true,
    service: true,
    rate: true,
    paymentMethod: true,
    deliveryFee: true,
    extras: true,
    deliveryNotes: true,
    pod: true,
    specialInstructions: true,
  });

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
  const parseConfig: Papa.ParseConfig = {
    delimiter: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    comments: "#",
    step: undefined,
    skipEmptyLines: false,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    complete: (result: Papa.ParseResult<string>) => {
      const table: Tag[] = [];
      const _clientIds: number[] = [];
      for (let tag of result.data) {
        const x: Tag = {
          jobId: +tag[0],
          billingReference: tag[1].trim(),
          orderPlacer: tag[2].trim(),
          clientName: tag[3].trim(),
          clientId: +tag[4],
          courier: tag[5].trim(),
          courierId: +tag[6],
          originName: tag[7].trim(),
          originStreet: tag[8].trim(),
          originPostalCode: tag[9].trim(),
          destinationStreet: tag[10].trim(),
          destinationFloorStreetApt: tag[11].trim(),
          destinationPostalCode: tag[12].trim(),
          destinationZone: tag[13].trim(),
          deliveryStatus: tag[14].trim(),
          creationTime: tag[15].trim(),
          readyTime: tag[16].trim(),
          dueTime: tag[17].trim(),
          service: tag[18].trim(),
          rate: tag[19].trim(),
          paymentMethod: tag[20].trim(),
          deliveryFee: tag[21].trim(),
          extras: tag[22].trim(),
          deliveryNotes: tag[23].trim(),
          pod: tag[24].trim(),
          specialInstructions: tag[25].trim(),
        };
        table.push(x);
        if (!(_clientIds.includes(x.clientId)) && !isNaN(x.clientId)) {
          _clientIds.push(x.clientId);
        }

      }

      setClientIds(_clientIds);
      setInputCSV(table);
    }
  }
  // async function getCSV() {
  //   const res = await fetch(`${process.env.PUBLIC_URL}/data.csv`);
  //   if (!res.ok) {
  //     throw res;
  //   }
  //   return (await res.text()).trim();
  // }

  function processInvoices() {
    const csvArray = [];
    console.log(inputCSV);
    for (let clientId of clientIds) {
      //filter by clientID
      const filtered: Tag[] = inputCSV.filter((x: Tag) => x.clientId === clientId);
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
    setOutputCSVs(csvArray);
    window.localStorage.setItem("invoiceItems", JSON.stringify(invoiceItems));
    return csvArray;
  }

  function handleDownload() {
    const csvArray = processInvoices();
    for (let i in clientIds) {
      setTimeout(() => {
        let csv = "";
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Columns]) {
            csv += columnDef[key as keyof Columns] + ',';
          }
        }
        csv += "\n";
        csv += csvArray[i];
        const blob = new Blob([csv], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${clientIds[i]} - ${new Date().toDateString()}.csv`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, +i*300);
    }
  };

  function handleLoad(e: ChangeEvent<HTMLInputElement>) {
          
    let fileList = e.target.files || [];
    if (fileList.length > 0) {
        console.log(fileList[0]);
        const reader = new FileReader();
        reader.readAsText(fileList[0]);
        reader.onload = async function(e) {
            const csv = reader.result as string;
            Papa.parse(csv, parseConfig);
        };
    }

  }

  useEffect(() => {
    if (window.localStorage.getItem('invoiceItems')) {
      setInvoiceItems(JSON.parse(window.localStorage.getItem('invoiceItems') || ""))
    }
    // (async () => { 
    //   Papa.parse(await getCSV(), parseConfig);
    // })();
  },[]);

  // useEffect(() => {
  //   processInvoices();
  // },[inputCSV]);

  return (
    <div className="App">
      <label className="file-upload">
      <input type="file" id="csvupload" name="csvupload" accept="text/csv" onChange={handleLoad}></input>Load
      </label>
      <button className="button" onClick={handleDownload}>Download</button>

      {Object.keys(invoiceItems).map( (key, i) => 
        <div key={i}>
          <label htmlFor="vehicle1">{columnDef[key as keyof Columns]}</label>
          <input type="checkbox" id={key} name={key} value={key} checked={invoiceItems[key as keyof Columns]} onChange={() => {
            invoiceItems[key as keyof Columns] = !invoiceItems[key as keyof Columns];
            setInvoiceItems({...invoiceItems});
          }}></input>
        </div>
      )}

    </div>
  );
}

export default App;
