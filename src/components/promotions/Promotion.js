import React from "react";

function Promotion({ promotion }) {

    let stage = new Map([
        ['EC', 'Stage en cours'],
        ['EVAL', 'Stage evalué'],
        ['RECH', 'Recherche en cours'],
        ['SOUT', 'Sessions de soutenance définies'],
        ['TUT', 'Tuteurs attribués']
    ])

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0 fw-bold">Nombre max d'étudiants :</h6>
                        </div>
                        <div className="col-sm-10 text-secondary fw-bold">{promotion.nbMaxEtudiant}</div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Enseignant :</h6>
                        </div>
                        <div className="col-sm-10 text-secondary">
                            {promotion.enseignantByNoEnseignant?.prenom}{" "}
                            {promotion.enseignantByNoEnseignant?.nom}
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Lieu de rentrée :</h6>
                        </div>
                        <div className="col-sm-2 text-secondary">{promotion.lieuRentree}</div>
                        <div className="col-sm-2">
                            <h6 className="mb-0">Date de rentrée :</h6>
                        </div>
                        <div className="col-sm-6 text-secondary">{promotion.dateRentree}</div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Date de réponse LP :</h6>
                        </div>
                        <div className="col-sm-2 text-secondary">
                            {promotion.dateReponseLalp}
                        </div>
                        <div className="col-sm-2">
                            <h6 className="mb-0">Date de réponse LALP :</h6>
                        </div>
                        <div className="col-sm-6 text-secondary">
                            {promotion.dateReponseLalp}
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Processus de stage :</h6>
                        </div>
                        {promotion.processusStage == null ? (<div className="col-sm-10 text-secondary fst-italic">pas de processus de stage</div>)
                            :
                            (<div className="col-sm-10 text-secondary">{stage.get(promotion.processusStage)}</div>)}
                    </div>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Sigle de promotion :</h6>
                        </div>
                        {promotion.siglePromotion == null ?
                            <div className="col-sm-10 text-secondary fst-italic">
                                pas de sigle de promotion
                            </div> : <div className="col-sm-10 text-secondary">
                                {promotion.siglePromotion}
                            </div>
                        }
                    </div>
                    <>
                        <div className="row my-4">
                            <div className="col-sm-2">
                                <h6 className="mb-0">Commentaire :</h6>
                            </div>
                            {promotion.commentaire == null ?
                                <div className="col-sm-10 text-secondary fst-italic">
                                    pas de commentaire
                                </div> : <div className="col-sm-10 text-secondary">
                                    {promotion.commentaire}
                                </div>
                            }
                        </div>
                    </>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                <div className="row my-2">
                        <div className="col-md-3">
                            <h6 className="fw-bold">Nombre d'heures des :</h6>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-3">
                            <h6>Cours magistraux (CM) :   {promotion.nombreHeureCM} h</h6>
                        </div>
                        <div className="col-md-3">
                            <h6>Travaux pratiques (TP) :   {promotion.nombreHeureTP} h</h6>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-3">
                            <h6>Travaux dirigés (TD) :   {promotion.nombreHeureTD} h</h6>
                        </div>
                        <div className="col-md-3">
                            <h6>Équivalent travaux dirigés (ETD) :   {Number.parseFloat(promotion.nombreHeureETD).toFixed(2)} h</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Promotion;
