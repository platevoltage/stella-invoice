import { Columns, columnDef } from '../interfaces';
import './Options.css';

interface Props {
    invoiceItems: Columns,
    setInvoiceItems: (invoiceItems: any) => void
}

export default function Options({invoiceItems, setInvoiceItems}: Props) {
  return (
    <div className="options">
        {Object.keys(invoiceItems).map( (key, i) => 
            <div key={i} style={{display: "flex", width: "50%"}}>
                <input type="checkbox" id={key} name={key} value={key} checked={invoiceItems[key as keyof Columns]} onChange={() => {
                    invoiceItems[key as keyof Columns] = !invoiceItems[key as keyof Columns];
                    setInvoiceItems({...invoiceItems});
                }}></input>
              <label htmlFor={key}>{columnDef[key as keyof Columns]}</label>
            </div>
        )}
    </div>
  )
}
