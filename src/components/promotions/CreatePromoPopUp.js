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
} from "antd";
import get from "lodash/get";
import moment from "moment";

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const rules = [{ required: true, message: "champs obligatoire!!" }];

function CreatePromoPopUp() {
  const [enseignants, setEnseignants] = useState([]);
  useEffect(async () => {
    const mockApi = new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            no_Enseignant: `${i}`,
            nom: "SALIOU",
            prenom: "Philippe",
            sexe: "H",
            type: "PRAG",
            pays: "FR",
            ville: "Brest",
            adresse: "Adresse Brest",
            email_Perso: "philippe.saliou@gmail.com",
            email_Ubo: "philippe.saliou@univ_brest.com",
            mobile: "+33 7 43 34 25 76",
            telephone: "+33 6 32 00 85 19",
            code_Postal: "29 200",
          });
        }
        resolve(data);
      }, 1000);
    });
    await mockApi.then((data) => setEnseignants(data));
  }, []);
  console.log("enseignants :>> ", enseignants);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const {
      anneeUniversitaire,
      dateReponseLalp,
      dateReponseLp,
      dateRentree,
      ...rest
    } = values;

    console.log("values :>> ", values);
  };


  return (
    <div className="container__antd p-top-20">
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
                    label="Processus Stage"
                    name="processusStage"
                    rules={rules}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    rules={rules}
                    label="Sigle Promotion"
                    name="siglePromotion"
                  >
                    <Input size="large" />
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

                  <Item label="Enseignant" name="enseignant" rules={rules}>
                    <Select size="large">
                      {enseignants.map(({ no_Enseignant, nom, prenom }) => (
                        <Option key={no_Enseignant}>
                          {nom} {prenom}
                        </Option>
                      ))}
                    </Select>
                  </Item>
                  <Item label="Formation" name="formation" rules={rules}>
                    <Input size="large" disabled />
                  </Item>
                </Col>
              </Row>

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
