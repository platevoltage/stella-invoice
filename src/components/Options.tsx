import React from 'react'
import { Columns, columnDef } from '../interfaces';

interface Props {
    invoiceItems: Columns,
    setInvoiceItems: (invoiceItems: any) => void
}

export default function Options({invoiceItems, setInvoiceItems}: Props) {
  return (
    <div>
        {Object.keys(invoiceItems).map( (key, i) => 
            <div key={i}>
            <label htmlFor={key}>{columnDef[key as keyof Columns]}</label>
            <input type="checkbox" id={key} name={key} value={key} checked={invoiceItems[key as keyof Columns]} onChange={() => {
                invoiceItems[key as keyof Columns] = !invoiceItems[key as keyof Columns];
                setInvoiceItems({...invoiceItems});
            }}></input>
            </div>
        )}
    </div>
  )
}
