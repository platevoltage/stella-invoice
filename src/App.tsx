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
      for (let tag of result.data) {
        table.push({
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
        });
      }
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

  useEffect(() => {
    (async () => { 
      Papa.parse(await getCSV(), parseConfig);
    })();
  },[]);


  return (
    <div className="App">
      {inputCSV.map((tag: Tag) => 
        <>

        
        <p>{tag.clientId} {tag.clientName}</p>
        </>
      )}
    </div>
  );
}

export default App;
