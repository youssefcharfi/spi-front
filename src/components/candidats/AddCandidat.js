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
//import isEmail from "Validator/lib/isEmail";

const { Item } = Form;
const { Option } = Select;

//const rules = [{ required: true, message: "champs obligatoire!!" }];

function AddCandidat({ codeFormation, anneeUniversitaire }) {
  const [form] = Form.useForm();
  const [messageErreur, setMessageErreur] = useState("");
  const rules = [{ required: true, message: "champs obligatoire!!" }];

  //////////////////////////////////////////////

  const validateMessages = {
    required: "${label} est requis!",
    types: {
      email: "l' ${label} n'est pas un mail valid!",
      number: "${label} n'est pas un numero valid",
    },
    number: {
      range: "${label} doit être entre ${min} et ${max}",
    },
  };

  /////////////////////////////////////////////////

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="33" key="33">
          +33
        </Option>
        <Option value="212" key="212">
          +212
        </Option>
        <Option value="213" key="213">
          +213
        </Option>
        <Option value="226" key="226">
          +226
        </Option>
      </Select>
    </Form.Item>
  );
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
        setMessageErreur(error.response.data.errorMeassage);
        console.log(
          "error message errorMeassage ",
          error.response.data.errorMeassage
        );
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
              validateMessages={validateMessages}
            >
              <Row justify="space-between">
                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item label="Code de formation" name="codeFormation">
                    <Input defaultValue={codeFormation} disabled={true} />
                  </Item>
                  <Item
                    label="Nom"
                    name="nom"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Sexe"
                    name="sexe"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select size="large">
                      <Option key={"H"}>Homme</Option>
                      <Option key={"F"}>Femme</Option>
                    </Select>
                  </Item>

                  <Item
                    label="Date de naissance"
                    name="dateNaissance"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Date de naissance"
                      // picker="day"
                    />
                  </Item>

                  <Item
                    label="Nationalité"
                    name="nationalite"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    />
                  </Item>
                  <Item
                    label="Adresse"
                    name="adresse"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Ville"
                    name="ville"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                </Col>

                <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                  <Item label="Année Universitaire" name="anneeUniversitaire">
                    <Input defaultValue={anneeUniversitaire} disabled={true} />
                  </Item>

                  <Item
                    label="Prenom"
                    name="prenom"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                      },
                    ]}
                    id="email"
                    type="email"
                    size="large"
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Lieu de naissance"
                    name="lieuNaissance"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Pays d'origine"
                    name="paysOrigine"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>

                  <Item label="Telephone" name="telephone">
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    />
                  </Item>
                  <Item
                    label="Code postal"
                    name="codePostal"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                  <Item
                    label="Universite d'origine"
                    name="universiteOrigine"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>
                </Col>
              </Row>
              <Item
                label="listeSelection"
                name="listeSelection"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
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
              <Row justify="center">
                <p style={{ color: "red" }}>{messageErreur}</p>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddCandidat;
