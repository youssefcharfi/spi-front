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
    <div className="card-body">
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0 fw-bold">Nombre max des étudiants</h6>
        </div>
        <div className="col-sm-10 text-secondary fw-bold">{promotion.nbMaxEtudiant}</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0">Enseignant</h6>
        </div>
        <div className="col-sm-10 text-secondary">
          {promotion.enseignantByNoEnseignant?.prenom}{" "}
          {promotion.enseignantByNoEnseignant?.nom}
        </div>
      </div>
      <hr />
      <>
        <div className="row">
          <div className="col-sm-2">
            <h6 className="mb-0">Commentaire</h6>
          </div>
          {promotion.commentaire == null ?
          <div className="col-sm-10 text-secondary fst-italic">
            commentaire non communiqué 
          </div> : <div className="col-sm-10 text-secondary">
            {promotion.commentaire}
          </div>
        }
        </div>
        <hr />
      </>
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0">Lieu rentrée</h6>
        </div>
        <div className="col-sm-4 text-secondary">{promotion.lieuRentree}</div>
        <div className="col-sm-2">
          <h6 className="mb-0">Date rentrée</h6>
        </div>
        <div className="col-sm-4 text-secondary">{promotion.dateRentree}</div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0">Date réponse lp</h6>
        </div>
        <div className="col-sm-4 text-secondary">
          {promotion.dateReponseLalp}
        </div>
        <div className="col-sm-2">
          <h6 className="mb-0">Date réponse lalp</h6>
        </div>
        <div className="col-sm-4 text-secondary">
          {promotion.dateReponseLalp}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0">Processus stage</h6>
        </div>
        {promotion.processusStage == null ? (<div className="col-sm-10 text-secondary fst-italic">processus stage non communiqué</div>)
          :
          (<div className="col-sm-10 text-secondary">{stage.get(promotion.processusStage)}</div>)}
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-2">
          <h6 className="mb-0">Sigle promotion</h6>
        </div>
        {promotion.siglePromotion == null ?
          <div className="col-sm-10 text-secondary fst-italic">
            sigle promotion non communiqué 
          </div> : <div className="col-sm-10 text-secondary">
            {promotion.siglePromotion}
          </div>
        }
      </div>
    </div>
  );
}

export default Promotion;
