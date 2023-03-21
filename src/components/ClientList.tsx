import React from 'react'
import { Client } from '../interfaces';
import './ClientList.css'

interface Props {
    clientMetaData: Client[]
}

export default function ClientList({clientMetaData}: Props) {
  return (
    <div className="client-list">
        {clientMetaData.map((client) => 
        <div>
            {client.name}
        </div>
        )}
        {clientMetaData.length < 1 && <div className="no-file">No File Selected</div>}
    </div>
  )
}
