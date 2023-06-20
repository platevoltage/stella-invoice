import {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import Papa from 'papaparse';
import { Columns, Tag, invoiceItemsDefaults, Client, columnDef } from './interfaces';
import Options from './components/Options';
import ClientList from './components/ClientList';
import Logo from './components/Logo';

function App() {
  const [inputCSV, setInputCSV] = useState<Tag[]>([]);
  const [clientMetaData, setClientMetaData] = useState<Client[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<Columns>(invoiceItemsDefaults);

  const parseConfig: Papa.ParseConfig = {
    delimiter: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '',
    header: true,
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
      console.log(result.data);
      const key = columnDef;
      for (let tag of result.data as any) {
        const x: Tag = {
          jobId: +tag[key.jobId],//
          billingReference: (tag[key.billingReference] || "").trim(),//
          orderPlacer: (tag[key.orderPlacer] || "").trim(),//
          // accountName: (tag[key.accountName] || "").trim(),
          clientName: (tag[key.clientName] || "").trim(),//
          clientId: +tag[key.clientId],//
          courier: (tag[key.courier] || "").trim(),//
          courierId: +tag[key.courierId],//
          originName: (tag[key.originName] || "").trim(),//
          originStreet: (tag[key.originStreet] || "").trim(),//
          originPostalCode: (tag[key.originPostalCode] || "").trim(),//
          destinationName: (tag[key.destinationName] || "").trim(),//
          destinationStreet: (tag[key.destinationStreet] || "").trim(),//
          destinationFloorStreetApt: (tag[key.destinationFloorStreetApt] || "").trim(),//
          destinationPostalCode: (tag[key.destinationPostalCode] || "").trim(),//
          destinationZone: (tag[key.destinationZone] || "").trim(),//
          deliveryStatus: (tag[key.deliveryStatus] || "").trim(),
          creationTime: (tag[key.creationTime] || "").trim(),
          readyTime: (tag[key.readyTime] || "").trim(),
          dueTime: (tag[key.dueTime] || "").trim(),
          service: (tag[key.service] || "").trim(),
          rate: (tag[key.rate] || "").trim(),
          paymentMethod: (tag[key.paymentMethod] || "").trim(),
          deliveryFee: (tag[key.deliveryFee] || "").trim(),
          extras: (tag[key.extras] || "").trim(),
          deliveryNotes: (tag[key.deliveryNotes] || "").trim(),
          pod: (tag[key.pod] || "").trim(),
          specialInstructions: (tag[key.specialInstructions] || "").trim(),
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
      _clientMetaData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setClientMetaData(_clientMetaData);
      setInputCSV(table);
      console.log(result)
      console.log(table)
    }
  }

  function handleLoad(e: ChangeEvent<HTMLInputElement>) {      
    let fileList = e.target.files || [];
    if (fileList.length > 0) {
        console.log(fileList[0]);
        const reader = new FileReader();
        reader.readAsText(fileList[0]);
        reader.onload = async function() {
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
