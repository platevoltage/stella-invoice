import {useState, useEffect} from 'react';
import './App.css';
import Papa from 'papaparse';

function App() {
  const [inputCSV, setInputCSV] = useState("");
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
      console.log(result);
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
  },[])
  return (
    <div className="App">

    </div>
  );
}

export default App;
