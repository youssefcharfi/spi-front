import React, { memo, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Form,
  Select,
  Divider,
  InputNumber,
  DatePicker,
  Checkbox,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import "toastr/build/toastr.css";
import toastr from "toastr";
import axios from "axios";
import moment from "moment";
import EnseignantList from "../enseignant/EnseignantList";
import ReplayIcon from "@mui/icons-material/Replay";
import locale from 'antd/es/date-picker/locale/fr_FR';
import 'moment/locale/fr';

toastr.options = {
  "closeButton": true,
  "positionClass": "toast-top-center",
  "timeOut": 0,
  "extendedTimeOut": 0
};

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const rules = [{ required: true, message: "champs obligatoire!" }];
const rulesInteger = [
  { required: true, message: "champs obligatoire!" },
  {
    pattern: "^([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)$",
    message: "Saisissez un entier entre 0 et 1000",
  },
];


function CreatePromoPopUp({
  codeFormation,
  ajoutPromo,
  formulaire,
  resetForm,
  salles
}) {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  formulaire(form);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processusStage, setProcessusStage] = useState(null);
  const [enseignant, setEnseignant] = useState(undefined);
  const [dateLALP,setDateLALP] = useState(true);
  const [dateRent,setDateRent] = useState(true);
  const [dateLALPValue,setDateLALPValue] = useState(false);
  const [dateRentValue,setDateRentValue] = useState(false);

  // Rules pour la validation des dates

  const rulesLALP= [
    {
      required: dateLALPValue, message: "champs obligatoire!"
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if(value != undefined) {
        if (moment(value).isAfter(moment(getFieldValue('dateReponseLp'),"DD/MM/YYYY"))) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('La date de reponse LALP doit ???tre post??rieur ?? la date reponse LP'));
        } else {
          return Promise.resolve();
        }
      },
    }),
  ]
  const rulesRent = [
    {
      required: dateRentValue, message: "champs obligatoire!"
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if(value != undefined) {
        if (moment(value).isAfter(moment(getFieldValue('dateReponseLalp'),"DD/MM/YYYY"))) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('La date de rentree doit ???tre post??rieur ?? la date reponse LALP'));
        } else {
          return Promise.resolve();
        }
      },
    }),
  ]

  // Fin de validation


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChangeDateLALP = async (e) => {
    await form.validateFields(['dateRentree']);
    setDateRentValue(true);
    setDateRent(false);
  }
  const handleChangeDateLP = async (e) => {
    await form.validateFields(['dateReponseLalp']);
    setDateLALP(false);
    setDateLALPValue(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    values.processusStage = processusStage;
    values.noEnseignant = enseignant;
    /*if (values.noEnseignant == null) {
      toastr.error("Merci de choisir un enseignant !");
    } else {*/
      values.codeFormation = codeFormation;
      values.dateReponseLalp = moment(values.dateReponseLalp).format(
        "DD/MM/YYYY"
      );
      values.dateReponseLp = moment(values.dateReponseLp).format("DD/MM/YYYY");
      values.dateRentree = moment(values.dateRentree).format("DD/MM/YYYY");
      values.anneeUniversitaire =
        moment(values.anneeUniversitaire[0]).format("YYYY") +
        "-" +
        moment(values.anneeUniversitaire[1]).format("YYYY");
      values.siglePromotion = codeFormation + "-" + values.anneeUniversitaire;
      
      console.log(values);
      axios
        .post(`http://localhost:8034/promotions/`, values)
        .then((res) => {
          toastr.info(
            "La promotion a ??t?? ajout?? avec succ??e",
            "Ajout Promotion"
          );

          navigate(
            `/promotions/${res.data.codeFormation}/${res.data.anneeUniversitaire}`
          );
        })
        .catch((error) => {
          toastr.error(error.response.data.errorMeassage, "Ajout Promotion");
        });
    //}
  };

  const onFinishReAdd = (values) => {
    values.processusStage = processusStage;
    values.noEnseignant = enseignant;
    /*if (values.noEnseignant == null) {
      toastr.error("Merci de choisir un enseignant !");
    } else {*/
      values.codeFormation = codeFormation;
      values.dateReponseLalp = moment(values.dateReponseLalp).format(
        "DD/MM/YYYY"
      );
      values.dateReponseLp = moment(values.dateReponseLp).format("DD/MM/YYYY");
      values.dateRentree = moment(values.dateRentree).format("DD/MM/YYYY");
      values.anneeUniversitaire =
        moment(values.anneeUniversitaire[0]).format("YYYY") +
        "-" +
        moment(values.anneeUniversitaire[1]).format("YYYY");
      values.siglePromotion = codeFormation + "-" + values.anneeUniversitaire;
      console.log("PRomotio");
      console.log(values);
      axios
        .post(`http://localhost:8034/promotions/`, values)
        .then((res) => {
          ajoutPromo(res.data);
          //navigate(`/promotions/${res.data.codeFormation}/${res.data.anneeUniversitaire}`)

          toastr.info(
            "La promotion a ??t?? ajout?? avec succ??e",
            "Ajout Promotion"
          );

          resetForm();
        })
        .catch((error) => {
          toastr.error(error.response.data.errorMeassage, "Erreur d'ajout");
        });
    //}
  };

  const handleChangeProcessus = (e) => {
    if (e.target.checked) setProcessusStage("RECH");
    else setProcessusStage(null);
  };
  const handleReAdd = () => {
    form
      .validateFields()
      .then((values) => {
        onFinishReAdd(values);
      })
      .catch((errorInfo) => {});
  };

  const recupererEnseignant = (enseignant) => {
    setEnseignant(enseignant.noEnseignant);
    handleCancel();
    document.getElementById("enseignant").value =
      enseignant.nom + " " + enseignant.prenom;
  };
  return (
    <div className="container__antd p-top-20">
      <Modal
        title="Liste des enseignants"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EnseignantList recupererEnseignant={recupererEnseignant} />
      </Modal>
      <Row justify="center">
        <Col>
          <Card className="card">
            <Form
              form={form}
              onFinish={(values) => onFinish(values)}
              layout="vertical"
              initialValues={{ formation: "?? recuperer" }}
            >
              <Row justify="space-between">
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item
                    label="Nombre max des ??tudiants"
                    name="nbMaxEtudiant"
                    rules={rulesInteger}
                  >
                    <Input size="large" min={0} style={{ width: "100%" }} maxLength={4} max={127}/>
                  </Item>
                  <Item
                    label="Lieu de rentr??e"
                    name="lieuRentree"
                  >
                    <Select size="large">
                      {salles.map((salle,index) => (
                        <Option key={salle.index} value={salle.abreviation}>
                          {salle.signification} {salle.abreviation}
                        </Option>
                      ))}
                    </Select>
                  </Item>
                  <Item label="Formation" name="codeFormation">
                    <Input
                      size="large"
                      defaultValue={codeFormation}
                      disabled={true}
                    />
                  </Item>

                  <Item
                    label="Ann??e universitaire"
                    name="anneeUniversitaire"
                    rules={rules}
                  >
                    <RangePicker
                      size="large"
                      picker="year"
                      style={{ width: "100%" }}
                      placeholder={["Date D??but","Date Fin"]}
                    />
                  </Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                <Item
                    label="Date de r??ponse LP"
                    name="dateReponseLp"
                    rules={rules}
                    tooltip="Date (au plus tard) ?? laquelle les candidats sur la
                    liste principale doivent donner leur r??ponse"
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date Reponse LP"
                      locale={locale}
                      format={dateFormat}
                      onChange={handleChangeDateLP}
                      id="dateReponseLp"
                    />
                  </Item>
                  <Item
                    label="Date de r??ponse LALP"
                    name="dateReponseLalp"
                    rules={rulesLALP}
                    tooltip="Date (au plus tard) ?? laquelle les candidats pass??s de la liste d'attente ?? la
                    liste principale doivent donner leur r??ponse"
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date Reponse La LP"
                      locale={locale}
                      format={dateFormat}
                      onChange={handleChangeDateLALP}
                      id="dateReponseLalp"
                      disabled={dateLALP}
                    />
                  </Item>
                  <Item label="Date de rentr??e" name="dateRentree" rules={rulesRent} 
                  tooltip="Date ?? laquelle la rentr??e est pr??vu">
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date de Rentree"
                      locale={locale}
                      format={dateFormat}
                      disabled={dateRent}
                    />
                  </Item>

                  <Item label="Enseignant" name="noEnseignant">
                    <input
                      onClick={showModal}
                      id="enseignant"
                      className="ant-input ant-input-lg"
                      readOnly="true"
                      style={{ cursor: "pointer" }}
                    />
                  </Item>
                </Col>
              </Row>
              <Item name="processusStage">
                <Checkbox id="processusStage" onChange={handleChangeProcessus}>
                  Stage
                </Checkbox>
              </Item>
              <Item label="Commentaire" name="commentaire">
                <TextArea rows={3} placeholder="commentaire..." />
              </Item>

              <Row>
                <button
                  type="button"
                  size="large"
                  onClick={resetForm}
                  className="btn btn-outline-secondary mx-2"
                  style={{ float: "left" }}
                >
                  Vider
                </button>            
                <button
                  type="button"
                  size="large"
                  onClick={handleReAdd}
                  className="btn btn-primary mx-2"
                  style={{ float: "right" }}
                >
                  Ajouter
                </button>
                <button
                  type="submit"
                  size="large"
                  className="btn btn-primary mx-2"
                  style={{ float: "right" }}
                >
                  Ajouter et fermer
                </button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePromoPopUp;
