import React,{ useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
  
export default function Etudiants({ codeFormation,anneUniversitaire }) {
    const [etudiants, setEtudiants] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9000/etudiants?codeformation=${codeFormation}&anneeuniversitaire=${anneUniversitaire}`)
            .then(res => {
                 setEtudiants(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const columns = [
        {field: 'noetudiant', headerName: 'Numero Etudiant', width:130 },
        {field: 'nom', headerName: 'Nom', width: 130 },
        {field: 'prenom', headerName: 'Prenom', width: 130 },
        {field: 'telephone',headerName: 'Telephone',width: 130,},
        {field: 'email',headerName: 'Email',minWidth:300},
        {field: 'universiteorigine',headerName: "Universite d'origine",width: 200,},
        {field: 'groupetp',headerName: "Groupe TP",type: Number,width: 130,},
        {field: 'groupeanglais',headerName: "Groupe Angalis",type: Number,width: 130,}
    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={etudiants}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.noetudiant}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
        </div>
    )
}
