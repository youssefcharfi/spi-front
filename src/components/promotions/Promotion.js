import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Promotion({ codeFormation, anneeUniversitaire }) {

    const [promotion, setPromotion] = useState({})

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9000/promotions?anneeUniversitaire=${anneeUniversitaire}&codeFormation=${codeFormation}`)
            .then(res => {
                if (res.data[0] == undefined) navigate("*", { replace: true })
                else setPromotion(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="card-body">
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Enseignant</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    {promotion.enseignant?.prenom} {promotion.enseignant?.nom}
                </div>
            </div>
            <hr />
            {promotion.commentaire !== "" ? (
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
                    {promotion.processusStage}
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