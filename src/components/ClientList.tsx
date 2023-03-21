import React from 'react'
import { Client } from '../interfaces';

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
    </div>
  )
}
