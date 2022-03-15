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
import axios from "axios";
import get from "lodash/get";
import moment from "moment";
import { Radio } from "antd";
import EnseignantList from "../enseignant/EnseignantList";
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const rules = [{ required: true, message: "champs obligatoire!!" }];

function CreatePromoPopUp({codeFormation}) {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processusStage, setProcessusStage] = useState(null);
  const [enseignant, setEnseignant] = useState(0);

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
    values.processusStage = processusStage;
    values.noEnseignant = enseignant;
    values.codeFormation = codeFormation;
    values.dateReponseLalp = moment(values.dateReponseLalp).format("YYYY-MM-DD");
    values.dateReponseLp = moment(values.dateReponseLp).format("YYYY-MM-DD");
    values.dateRentree=  moment(values.dateRentree).format("YYYY-MM-DD");
    values.anneeUniversitaire= moment(values.anneeUniversitaire[0]).format("YYYY") +"-" +moment(values.anneeUniversitaire[1]).format("YYYY")
    console.log("values :>> ", values);

    axios
      .post(`http://localhost:8034/promotions/`, values)
      .then((res) => {
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("error: ", res.error);
      })
      .catch((error) => {
        console.log(error); //Logs a string: Error: Request failed with status code 404
      });
  };
  const handleChangeProcessus = (e) => {
    if(e.target.checked)
      setProcessusStage("RECH");
    else
      setProcessusStage(null);
  }
const recupererEnseignant = (enseignant) => {
  setEnseignant(enseignant.noEnseignant);
  handleCancel();
  document.getElementById("enseignant").value = enseignant.nom + ' ' + enseignant.prenom;
};
  return (
    <div className="container__antd p-top-20">
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                    rules={rules}
                  >
                    <InputNumber
                      type="number"
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
                    <input onClick={showModal} id="enseignant" className="ant-input ant-input-lg" readOnly/>
                  </Item>
                </Col>
              </Row>
              <Item name="processusStage">
                <Checkbox  id="processusStage" onChange={handleChangeProcessus}>Avec ou Sans Stage</Checkbox>
              </Item>
              <Item label="Commentaire" name="commentaire">
                <TextArea rows={3} placeholder="commentaire..." />
              </Item>

              <Row justify="end">
                <Button htmlType="submit" size="large" type="primary">
                  AJOUTER
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePromoPopUp;
