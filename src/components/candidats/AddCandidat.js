import React, { memo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Form,
  Select,
  // Divider,
  // InputNumber,
  DatePicker,
} from "antd";
// import get from "lodash/get";
// import moment from "moment";
import dateFormat from "dateformat";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;

const rules = [{ required: true, message: "champs obligatoire!!" }];

function AddCandidat({ codeFormation, anneeUniversitaire }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // const {
    //   // anneeUniversitaire,
    //   // dateNaissance,
    //   // ...rest
    // } = values;
    const dateNaissanceFormatee = dateFormat(
      values.dateNaissance,
      "yyyy-mm-dd"
    );
    const candidat = {
      ...values,
      codeFormation: codeFormation,
      anneeUniversitaire: anneeUniversitaire,
      dateNaissance: dateNaissanceFormatee,
    };
    console.log("candidats :>> ", JSON.stringify(candidat));
    console.log("values :>> ", values);

    axios
      .post(`http://localhost:8034/candidats`, candidat)
      .then((res) => {
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("error: ", res.error);
      })
      .catch((error) => {
        console.log(error); //Logs a string: Error: Request failed with status code 404
      });
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
            >
              <Row justify="space-between">
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item label="Code de formation" name="codeFormation">
                    <Input defaultValue={codeFormation} disabled={true} />
                  </Item>
                  <Item label="Nom" name="nom" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Sexe" name="sexe" rules={rules}>
                    <Select size="large">
                      <Option key={"H"}>Homme</Option>
                      <Option key={"F"}>Femme</Option>
                    </Select>
                  </Item>

                  <Item
                    label="Date de naissance"
                    name="dateNaissance"
                    rules={rules}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date de naissance"
                      // picker="day"
                    />
                  </Item>

                  <Item label="Nationalité" name="nationalite" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Mobile" name="mobile" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Adresse" name="adresse" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Ville" name="ville" rules={rules}>
                    <Input size="large" />
                  </Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item label="Année Universitaire" name="anneeUniversitaire">
                    <Input defaultValue={anneeUniversitaire} disabled={true} />
                  </Item>

                  <Item label="Prenom" name="prenom" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Email" name="email" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Lieu de naissance"
                    name="lieuNaissance"
                    rules={rules}
                  >
                    <Input size="large" />
                  </Item>
                  <Item label="Pays d'origine" name="paysOrigine" rules={rules}>
                    <Input size="large" />
                  </Item>

                  <Item label="Telephone" name="telephone" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item label="Code postal" name="codePostal" rules={rules}>
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Universite d'origine"
                    name="universiteOrigine"
                    rules={rules}
                  >
                    <Input size="large" />
                  </Item>
                </Col>
              </Row>
              <Item label="listeSelection" name="listeSelection" rules={rules}>
                <Select size="large">
                  <Option key={"LP"}>Liste Principale</Option>
                  <Option key={"LA"}>Liste d'Attente</Option>
                  <Option key={"NR"}>Non Retenu</Option>
                </Select>
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

export default AddCandidat;
