import {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import Papa from 'papaparse';


interface Tag {
  jobId: number;
  billingReference: string;
  orderPlacer: string;
  clientName: string;
  clientId: number;
  courier: string;
  courierId: number;
  originName: string;
  originStreet: string;
  originPostalCode: string;
  destinationStreet: string;
  destinationFloorStreetApt: string;
  destinationPostalCode: string;
  destinationZone: string;
  deliveryStatus: string;
  creationTime: string;
  readyTime: string;
  dueTime: string;
  service: string;
  rate: string;
  paymentMethod: string;
  deliveryFee: string;
  extras: string;
  deliveryNotes: string;
  pod: string;
  specialInstructions: string;

}

interface Columns {
  jobId: boolean;
  billingReference: boolean;
  orderPlacer: boolean;
  clientName: boolean;
  clientId: boolean;
  courier: boolean;
  courierId: boolean;
  originName: boolean;
  originStreet: boolean;
  originPostalCode: boolean;
  destinationStreet: boolean;
  destinationFloorStreetApt: boolean;
  destinationPostalCode: boolean;
  destinationZone: boolean;
  deliveryStatus: boolean;
  creationTime: boolean;
  readyTime: boolean;
  dueTime: boolean;
  service: boolean;
  rate: boolean;
  paymentMethod: boolean;
  deliveryFee: boolean;
  extras: boolean;
  deliveryNotes: boolean;
  pod: boolean;
  specialInstructions: boolean;
}
//job id,billing reference,order placer,client name,client id,courier,courier number,origin name,origin street,origin postal code,destination street,destination floor/suite/apt.,destination postal code,destination zone,delivery status,creation time,ready time,due time,service,rate,payment method as string,delivery fee,extras,delivery notes,pod,special instructions
const columnDef = {
    jobId: "job id",
    billingReference: "billing reference",
    orderPlacer: "order placer",
    clientName: "client name",
    clientId: "client id",
    courier: "courier",
    courierId: "courier number",
    originName: "origin name",
    originStreet: "origin street",
    originPostalCode: "origin postal code",
    destinationStreet: "destination street",
    destinationFloorStreetApt: "destination floor/suite/apt.",
    destinationPostalCode: "destination postal code",
    destinationZone: "destination zone",
    deliveryStatus: "delivery status",
    creationTime: "creation time",
    readyTime: "ready time",
    dueTime: "due time",
    service: "service",
    rate: "rate",
    paymentMethod: "payment method as string",
    deliveryFee: "delivery fee",
    extras: "extras",
    deliveryNotes: "delivery notes",
    pod: "pod",
    specialInstructions: "special instructions",
}
function App() {
  const [inputCSV, setInputCSV] = useState<Tag[]>([]);
  const [outputCSVs, setOutputCSVs] = useState<string[]>([]);
  const [clientIds, setClientIds] = useState<number[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<Columns>({
    jobId: true,
    billingReference: false,
    orderPlacer: false,
    clientName: false,
    clientId: false,
    courier: false,
    courierId: false,
    originName: false,
    originStreet: false,
    originPostalCode: false,
    destinationStreet: false,
    destinationFloorStreetApt: false,
    destinationPostalCode: false,
    destinationZone: false,
    deliveryStatus: false,
    creationTime: false,
    readyTime: false,
    dueTime: false,
    service: false,
    rate: false,
    paymentMethod: false,
    deliveryFee: false,
    extras: false,
    deliveryNotes: false,
    pod: false,
    specialInstructions: false,
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
  async function getCSV() {
    const res = await fetch(`${process.env.PUBLIC_URL}/data.csv`);
    if (!res.ok) {
      throw res;
    }
    return (await res.text()).trim();
  }

  function handleDownload() {
    for (let i in clientIds) {
      setTimeout(() => {
        let csv = "";
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Columns]) {
            csv += columnDef[key as keyof Columns] + ',';
          }
        }
        csv += "\n";
        csv += outputCSVs[i];
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
    (async () => { 
      // Papa.parse(await getCSV(), parseConfig);
    })();
  },[]);

  useEffect(() => {
    const csvArray = [];

    for (let clientId of clientIds) {
      //filter by clientID
      let filtered: any = inputCSV.filter((x: any) => x.clientId === clientId);
      //remove unwanted columns
      for (let tag of filtered) {
        for (let key in invoiceItems) {
          if (invoiceItems[key as keyof Tag] === false ) delete tag[key];
        }
      }
      const csv = Papa.unparse(filtered, unparseConfig);
      csvArray.push(csv);
    }
    setOutputCSVs(csvArray);
  },[inputCSV]);

  return (
    <div className="App">
      <label className="file-upload">
      <input type="file" id="csvupload" name="csvupload" accept="text/csv" onChange={handleLoad}></input>Load
      </label>
      <button className="button" onClick={handleDownload}>Download</button>
      {Object.keys(invoiceItems).map( (key, i) => 
        <div key={i}>
          <label htmlFor="vehicle1">{key}</label>
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
