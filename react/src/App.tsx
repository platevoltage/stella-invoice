import {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import Papa from 'papaparse';
import { Columns, Tag, invoiceItemsDefaults, Client } from './interfaces';
import Options from './components/Options';
import ClientList from './components/ClientList';
import Logo from './components/Logo';

function App() {
  const [inputCSV, setInputCSV] = useState<Tag[]>([]);
  const [clientMetaData, setclientMetaData] = useState<Client[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<Columns>(invoiceItemsDefaults);

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
      const _clientMetaData: Client[] = [];
      // console.log(result.data);
      for (let tag of result.data) {
        const x: Tag = {
          jobId: +tag[0],//
          billingReference: (tag[1] || "").trim(),//
          orderPlacer: (tag[2] || "").trim(),//
          accountName: (tag[3] || "").trim(),
          clientName: (tag[4] || "").trim(),//
          clientId: +tag[5],//
          courier: (tag[6] || "").trim(),//
          courierId: +tag[7],//
          originName: (tag[8] || "").trim(),//
          originStreet: (tag[9] || "").trim(),//
          originPostalCode: (tag[10] || "").trim(),//
          destinationName: (tag[11] || "").trim(),//
          destinationStreet: (tag[12] || "").trim(),//
          destinationFloorStreetApt: (tag[13] || "").trim(),//
          destinationPostalCode: (tag[14] || "").trim(),//
          destinationZone: (tag[15] || "").trim(),//
          deliveryStatus: (tag[16] || "").trim(),
          creationTime: (tag[17] || "").trim(),
          readyTime: (tag[18] || "").trim(),
          dueTime: (tag[19] || "").trim(),
          service: (tag[20] || "").trim(),
          rate: (tag[21] || "").trim(),
          paymentMethod: (tag[22] || "").trim(),
          deliveryFee: (tag[23] || "").trim(),
          extras: (tag[24] || "").trim(),
          deliveryNotes: (tag[25] || "").trim(),
          pod: (tag[26] || "").trim(),
          specialInstructions: (tag[27] || "").trim(),
          // excludeCanceled: tag[26].trim(),
        };
        table.push(x);
        if (!(_clientIds.includes(x.clientId)) && !isNaN(x.clientId)) {
          const temp: Client = {
            id: x.clientId,
            name :x.clientName
          }
          _clientIds.push(x.clientId);
          _clientMetaData.push(temp);
        }
      }
      setclientMetaData(_clientMetaData);
      setInputCSV(table);
    }
  }

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
  },[]);


  return (
    <div className="App">
      <div className="outer-container">
        <div className="column">

          <label className="file-upload">
          <input type="file" accept="text/csv" onChange={handleLoad}></input>Load CSV
          </label>


          <ClientList clientMetaData={clientMetaData} inputCSV={inputCSV} invoiceItems={invoiceItems} />

        </div>

        <div className="column">
          <Logo />
          <Options invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
