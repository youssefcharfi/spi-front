import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { Container } from "@mui/material";
import axios from 'axios'
import Loader from '../shared/Loader'
import Error from '../shared/Error'
import ServerError from '../ServerError'
import { letterSpacing } from '@mui/system';

function Candidat() {

    const { noCandidat } = useParams()

    const [candidat, setCandidat] = useState({})

    const [errorServer, setErrorServer] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pays, setPays] = useState(new Map());
    const [paysList, setPaysList] = useState();
    const [universite, setUniversite] = useState(new Map());
    const [universiteList, setUniversiteList] = useState([]);

    const [fullName, setFullName] = useState({ nom: "", prenom: "" })

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8034/candidats/" + noCandidat)
            .then((res) => {
                setCandidat(res.data);
                setFullName({ nom: res.data.nom, prenom: res.data.prenom })
                setLoading(false);
                setErrorServer(false);
                setNotFound(false);
            })
            .catch((err) => {
                setLoading(false);
                if (!err.response || err.response.status === 500) {
                    setNotFound(false);
                    setErrorServer(true);
                } else if (err.response.status === 404) setNotFound(true)
            })
    }, [])

    useEffect(() => {

        axios.get(`http://localhost:8034/domaine/pays`)
            .then(res => {
                res.data?.map(p => pays.set(p.abreviation, p.signification))
                setPaysList(res.data)
            });

        axios.get(`http://localhost:8034/domaine/universite`)
            .then(res => {
                res.data?.map(univ => universite.set(univ.abreviation, univ.signification))
                setUniversiteList(res.data)
            })

    }, []);

    let switchSelection = (selection) => {
        switch (selection) {
            case null:
                return null
            case "NR":
                return "Non retenu"
            case "LP":
                return "Liste principale"
            case "LA":
                return "Liste d'attente"
            default:
                break;
        }
    }



    const handleChange = (e) => {

        if (e.target.name === "dateNaissance" || e.target.name === "dateReponseCandidat") {
            let date = e.target.value.split("-").reverse().join("-").split("-").join("/")
            setCandidat({ ...candidat, [e.target.name]: date })
        }
        else if (e.target.name === "selectionNoOrdre") {
            let num = parseInt(e.target.value)
            setCandidat({ ...candidat, [e.target.name]: num })
        }
        else if (e.target.name === "sexe") setCandidat({ ...candidat, [e.target.name]: e.target.id })
        else setCandidat({ ...candidat, [e.target.name]: e.target.value })
    }

    let validate = () => {
        if (candidat.nom?.trim()?.length == 0 || candidat.prenom?.trim()?.length == 0 || candidat.lieuNaissance?.trim()?.length == 0 || candidat.nationalite?.trim()?.length == 0 || candidat.mobile?.trim()?.length == 0 || candidat.email?.trim()?.length == 0
            || candidat.adresse?.trim()?.length == 0 || candidat.codePostal?.trim()?.length == 0 || candidat.ville?.trim()?.length == 0 || !String(candidat.mobile).match(/^[+][0-9]{0,15}$/)
            || !String(candidat.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
            return false
        if (candidat.telephone?.trim()?.length > 0 && !String(candidat.telephone).match(/^[+][0-9]{0,15}$/)) return false
        else return true
    }

    const handleEdit = () => {
        setEdit(true)
        Array.from(document.getElementsByTagName("input")).map(input => {
            input.style = null
            input.readOnly = false
        })
    }

    const handleSave = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8034/candidats/", candidat)
            .then(res => {
                setFullName({ nom: res.data.nom, prenom: res.data.prenom })
                Array.from(document.getElementsByTagName("input")).map(input => {
                    input.style.border = "0px"
                    input.style.outline = "none"
                    input.readOnly = true
                })
            })
            .catch(err => console.log(err))
        setEdit(false)
    }


    if (loading) return <Loader />;
    if (errorServer) return <ServerError />;
    if (notFound)
        return (
            <Error
                message={`Le candidat chérché n'éxiste pas`}
            />
        );

    return (
        <form>
            <Container maxWidth style={{ height: 750 }}>
                <div id="card2" className="p-1 text-center mb-2 card">
                    <div className="card-body">
                        <h5
                            className="card-title"
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            {" "}
                            <i
                                style={{ color: "#0EA0E8" }}
                                className="fas fa-book-reader mx-1"
                            ></i>{" "}
                            Détail du candidat <span className='fw-bold'>{fullName.prenom} {fullName.nom}</span>
                        </h5>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-2" style={{ float: 'right' }}>
                        <button className="btn btn-primary mx-2" disabled={edit} onClick={handleEdit}>Editer</button>
                        <button type='submit' className="btn btn-outline-success" disabled={!edit || !validate()} onClick={handleSave}>Enregistrer</button>
                    </div>
                </div>
                <div className="card-title">
                    <h5 className='fw-bold'> <i className="fa-solid fa-user mx-2"></i> Informations personnelles :</h5>
                </div>
                <div className="card mt-3 shadow">
                    <div className="card-body">
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6> <label style={{ fontWeight: 550 }}> Nom : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly id="nom" name="nom" onChange={(e) => handleChange(e)} value={candidat.nom} /></h6>
                                <div className="row">
                                    <span id='errornom' style={{ color: "red" }}>{candidat.nom?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Prénom : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="prenom" onChange={(e) => handleChange(e)} value={candidat.prenom} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.prenom?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Date de naissance : </label>
                                    {edit ?
                                        <input required type="date" min="1900-08-01" name="dateNaissance" onChange={handleChange} value={candidat.dateNaissance?.split("/").join("-").split("-").reverse().join("-")} />
                                        :
                                        candidat.dateNaissance
                                    }
                                </h6>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Lieu de naissance : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="lieuNaissance" onChange={(e) => handleChange(e)} value={candidat.lieuNaissance} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.lieuNaissance?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Sexe : </label>
                                    {edit ?
                                        <>
                                            {"   "} Homme<input className='mx-1' type="radio" value={candidat.sexe} onChange={handleChange} id="H" defaultChecked={candidat.sexe === "H"} name="sexe" />
                                            {"   "} Femme<input className='mx-1' type="radio" value={candidat.sexe} onChange={handleChange} id="F" defaultChecked={candidat.sexe === "F"} name="sexe" />
                                        </>

                                        :
                                        <input type="text" style={{ border: 0, outline: "none" }} readOnly value={candidat.sexe === "H" ? "Homme" : "Femme"} />
                                    }
                                </h6>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Nationalité : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="nationalite" onChange={(e) => handleChange(e)} value={candidat.nationalite} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.nationalite?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-title mt-4">
                    <h5 className='fw-bold'> <i className="fa-solid fa-address-card mx-2"></i> Coordonnées :</h5>
                </div>
                <div className="card mt-3 shadow">
                    <div className="card-body">
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Mobile : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="mobile" onChange={(e) => handleChange(e)} value={candidat.mobile} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.mobile?.trim()?.length == 0 ? "ce champs est obligatoire" : (
                                        String(candidat.mobile).match(/^[+][0-9]{0,15}$/) ? null
                                            :
                                            "le mobile doit commencer par un + suivi que des numéros"
                                    )}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Téléphone : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="telephone" onChange={(e) => handleChange(e)} value={candidat.telephone} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{
                                        candidat.telephone == null || String(candidat.telephone).match(/^[+][0-9]{0,15}$/) || candidat.telephone?.trim()?.length == 0 ? null
                                            :
                                            "le mobile doit commencer par un + suivi que des numéros"
                                    }</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Email : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="email" onChange={(e) => handleChange(e)} value={candidat.email} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.email?.trim()?.length == 0 ? "ce champs est obligatoire" : (
                                        String(candidat.email).toLowerCase()
                                            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                                            ? null : "cet email est invalide"
                                    )
                                    }</span>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Adresse : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="adresse" onChange={(e) => handleChange(e)} value={candidat.adresse} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.adresse?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Code postal : </label><input type="text" style={{ border: 0, outline: "none" }} readOnly name="codePostal" onChange={(e) => handleChange(e)} value={candidat.codePostal} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.codePostal?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Ville : </label> <input type="text" style={{ border: 0, outline: "none" }} readOnly name="ville" onChange={(e) => handleChange(e)} value={candidat.ville} /></h6>
                                <div className="row">
                                    <span style={{ color: "red" }}>{candidat.ville?.trim()?.length == 0 ? "ce champs est obligatoire" : null}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Pays d'origine : </label>
                                    {edit ?
                                        <select name="paysOrigine" value={candidat.paysOrigine} onChange={(e) => handleChange(e)}>
                                            {paysList.map(p => (
                                                <option key={p.abreviation} value={p.abreviation}>{p.signification}</option>
                                            ))}
                                        </select>
                                        :
                                        <input type="text" style={{ border: 0, outline: "none" }} readOnly name="paysOrigine" onChange={(e) => handleChange(e)} value={pays.get(candidat.paysOrigine)} />
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-title mt-4">
                    <h5 className='fw-bold'> <i className="fa-solid fa-chart-line mx-2"></i> Situation :</h5>
                </div>
                <div className="card mt-3 mb-2 shadow">
                    <div className="card-body">
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Université d'origine : </label>
                                    {edit ?
                                        <select style={{ width: "50%" }} name="universiteOrigine" value={candidat.universiteOrigine} onChange={(e) => handleChange(e)}>
                                            {universiteList.map(p => (
                                                <option key={p.abreviation} value={p.abreviation}>{p.signification}</option>
                                            ))}
                                        </select>
                                        :
                                        universite.get(candidat.universiteOrigine)
                                    }
                                </h6>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Liste de sélection : </label>
                                    <span>{switchSelection(candidat.listeSelection)}</span>
                                </h6>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Numéro d'ordre : </label>{candidat.selectionNoOrdre}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6><label style={{ fontWeight: 550 }}>Confirmation candidat : </label>
                                    {candidat.confirmationCandidat == null ? candidat.listeSelection === "LP" || candidat.listeSelection === "LA" ? <span className='fst-italic'>En attente</span> : null
                                        :
                                        candidat.confirmationCandidat === "N" ? <span>Refusé</span> : <span>Accepter</span>
                                    }
                                </h6>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-5">
                                <h6><label style={{ fontWeight: 550 }}>Date réponse du candidat : </label>{candidat.dateReponseCandidat == null ? <span className='fst-italic'> pas encore renseigné</span> : candidat.dateReponseCandidat}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </form>
    )
}

export default Candidat