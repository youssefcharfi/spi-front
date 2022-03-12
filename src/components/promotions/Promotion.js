import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Promotion({ codeFormation, anneeUniversitaire }) {

    const [promotion, setPromotion] = useState({})

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8034/promotion/${codeFormation}/${anneeUniversitaire}`)
            .then(res => {
                setPromotion(res.data)
            })
            .catch(err => {
                if(!err.response) navigate("/erreur.jsp")
                else if(err.response.status === 404) navigate("*", { replace: true })
            })
    }, [])


    return (
        <div className="card-body">
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Enseignant</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.enseignantByNoEnseignant?.prenom} {promotion.enseignantByNoEnseignant?.nom}
                </div>
            </div>
            <hr />
            {promotion.commentaire !== null ? (
                <>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Commentaire</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {promotion.commentaire}
                        </div>
                    </div>
                    <hr />
                </>
            ) : null}
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Date Rentrée</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.dateRentree}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Date Reponse Lalp</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.dateReponseLalp}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Lieu Rentrée</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.lieuRentree}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Nbr Max Etudiant</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.nbMaxEtudiant}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Processus Stage</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.git}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Single Promotion</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.siglePromotion}
                </div>
            </div>
        </div>
    )
}

export default Promotion