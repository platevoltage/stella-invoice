import {useState, useEffect} from 'react';
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

function App() {
  const [inputCSV, setInputCSV] = useState<Tag[]>([]);
  const [outputCSVs, setOutputCSVs] = useState<string[]>([]);
  const [clientIds, setClientIds] = useState<number[]>([]);

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
        console.log(i)
        let csv = "job id,billing reference,order placer,client name,client id,courier,courier number,origin name,origin street,origin postal code,destination street,destination floor/suite/apt.,destination postal code,destination zone,delivery status,creation time,ready time,due time,service,rate,payment method as string,delivery fee,extras,delivery notes,pod,special instructions\n";
        csv += outputCSVs[i];
        const blob = new Blob([csv], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${clientIds[i]}.csv`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, +i*100);
    }
};


  useEffect(() => {
    (async () => { 
      Papa.parse(await getCSV(), parseConfig);
    })();
  },[]);

  useEffect(() => {
    const csvArray = [];
    for (let clientId of clientIds) {
      const filtered = inputCSV.filter((x: Tag) => x.clientId === clientId);
      const csv = Papa.unparse(filtered, unparseConfig);
      csvArray.push(csv);
    }
    setOutputCSVs(csvArray);
  },[inputCSV]);

  return (
    <div className="App">
      <button onClick={handleDownload}>download</button>
      {/* {outputCSVs.map( clientData => 
        <>
          <pre>{clientData}</pre>
          <hr></hr>
        </>
      )} */}

    </div>
  );
}

export default App;
