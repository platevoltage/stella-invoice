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
            <button className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg></button>
            {client.name}
        </div>
        )}
        {clientMetaData.length < 1 && <div className="no-file">No File Selected</div>}

    </div>
  )
}
