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
  Modal
} from "antd";
import 'toastr/build/toastr.css';
import toastr from "toastr";
import axios from "axios";
import get from "lodash/get";
import moment from "moment";
import { Radio } from "antd";
import EnseignantList from "../enseignant/EnseignantList";
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const rules = [{ required: true, message: "champs obligatoire!" }];
const rulesInteger = [{ required: true, message: "champs obligatoire!" },{
  pattern: '^([-]?[1-9][0-9]*|0)$',
  message: "Saisissez une valeur entier"
}]

function CreatePromoPopUp({codeFormation, ajoutPromo, formulaire,resetForm}) {
  const [form] = Form.useForm();
  formulaire(form);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processusStage, setProcessusStage] = useState(null);
  const [enseignant, setEnseignant] = useState(undefined);

  const showModal = () => {
    setIsModalVisible(true);
  };

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
    if(values.noEnseignant == null) {
      toastr.error("Merci de choisir un enseignant !");
    }else{
    values.codeFormation = codeFormation;
    values.dateReponseLalp = moment(values.dateReponseLalp).format("YYYY-MM-DD");
    values.dateReponseLp = moment(values.dateReponseLp).format("YYYY-MM-DD");
    values.dateRentree=  moment(values.dateRentree).format("YYYY-MM-DD");
    values.anneeUniversitaire= moment(values.anneeUniversitaire[0]).format("YYYY") +"-" +moment(values.anneeUniversitaire[1]).format("YYYY")

    axios
      .post(`http://localhost:8034/promotions/`, values)
      .then((res) => {
        ajoutPromo(res.data);
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("error: ", res.error);
      })
      .catch((error) => {
        toastr.error(error.response.data.errorMeassage,"Erreur d'ajout");
      });
    }
  };
  const handleChangeProcessus = (e) => {
    if(e.target.checked)
      setProcessusStage("RECH");
    else
      setProcessusStage(null);
  }
  const handleReAdd = (values) =>{
    form.validateFields()
			.then((values) => {
				onFinish(values);
        resetForm();
			})
			.catch((errorInfo) => {});
  }
  


const recupererEnseignant = (enseignant) => {
  setEnseignant(enseignant.noEnseignant);
  handleCancel();
  document.getElementById("enseignant").value = enseignant.nom + ' ' + enseignant.prenom;
};
  return (
    <div className="container__antd p-top-20">
      <Modal title="Liste des enseignants" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <EnseignantList recupererEnseignant={recupererEnseignant}/>
      </Modal>
      <Row justify="center">
        <Col span={24}>
          <Card className="card">
            <Form
              form={form}
              onFinish={(values) => onFinish(values)}
              layout="vertical"
              initialValues={{ formation: "à recuperer" }}
            >
              <Row justify="space-between">
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item
                    label="Nombre max d'étudiant"
                    name="nbMaxEtudiant"
                    rules={rulesInteger}
                  >
                    <Input
                      size="large"
                      min={0}
                      style={{ width: "100%" }}
                    />
                  </Item>
                  <Item
                    label="Lieu de Rentrée"
                    name="lieuRentree"
                    rules={rules}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Formation"
                    name="codeFormation"
                  >
                    <Input size="large" defaultValue={codeFormation} disabled={true}/>
                  </Item>

                  <Item
                    label="Année Universitaire"
                    name="anneeUniversitaire"
                    rules={rules}
                  >
                    <RangePicker
                      size="large"
                      picker="year"
                      style={{ width: "100%" }}
                    />
                  </Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item label="Date Rentree" name="dateRentree" rules={rules}>
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date de Rentree"
                    />
                  </Item>

                  <Item
                    label="Date Reponse La lp"
                    name="dateReponseLalp"
                    rules={rules}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date Reponse La LP"
                    />
                  </Item>
                  <Item
                    label="Date Reponse LP"
                    name="dateReponseLp"
                    rules={rules}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date Reponse LP"
                    />
                  </Item>

                  <Item
                    label="Enseignant"
                    name="noEnseignant"
                  >
                    <input onClick={showModal} id="enseignant" className="ant-input ant-input-lg" readOnly="true" style={{cursor:"pointer"}}/>
                  </Item>
                </Col>
              </Row>
              <Item name="processusStage">
                <Checkbox  id="processusStage" onChange={handleChangeProcessus}>Avec ou Sans Stage</Checkbox>
              </Item>
              <Item label="Commentaire" name="commentaire">
                <TextArea rows={3} placeholder="commentaire..." />
              </Item>

              <Row>
                <button size="large" onClick={resetForm} className="btn btn-outline-secondary mx-2" style={{float: "left"}}>
                  VIDER
                </button>
                <button  type="submit" size="large" className="btn btn-primary mx-2" style={{float: "right"}}>
                  AJOUTER
                </button>
                <button size="large" onClick={handleReAdd} className="btn btn-primary mx-2" style={{float: "right"}}>
                  RE-ADD
                </button>
              </Row>
              
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreatePromoPopUp;
