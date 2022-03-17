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
  InputNumber,
  DatePicker,
} from "antd";
// import get from "lodash/get";
// import moment from "moment";
import dateFormat from "dateformat";
import "toastr/build/toastr.css";
import toastr from "toastr";
import axios from "axios";
//import isEmail from "Validator/lib/isEmail";
import ReplayIcon from "@mui/icons-material/Replay";
/////////////////////////////////////::
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const { Item } = Form;
const { Option } = Select;

//const rules = [{ required: true, message: "champs obligatoire!!" }];

function AddCandidat({
  codeFormation,
  anneeUniversitaire,
  universite,
  ajouterCandidat,
  fermerPopUp,
  pays,
}) {
  const [form] = Form.useForm();
  const [messageErreur, setMessageErreur] = useState("");
  const rules = [{ required: true, message: "champs obligatoire!!" }];
  var AbreviationsUniversite = Array.from(universite.keys());
  console.log("keys: ", AbreviationsUniversite);

  //////////////////////////////////////////////

  const validateMessages = {
    required: "${label} est un champs obligatoire!!",
    types: {
      email: "l'${label} n'est pas valide!",
      integer: "${label} n'est pas valide!",
      string: "${label} n'est pas valide!",
    },
    number: {
      range: "${label} doit être entre ${min} et ${max}",
    },
  };
  const rulesInteger = [
    {
      pattern: "^[+][0-9]{7,12}$",
      message: "${label} n'est pas valide!",
    },
  ];

  /////////////////////////////////////////////////

  const prefixSelector = (
    <Item name="prefix" noStyle>
      <Select defaultValue="+33">
        <Option value="+33" key="+33">
          +33
        </Option>
        <Option value="+212" key="212">
          +212
        </Option>
        <Option value="+213" key="213">
          +213
        </Option>
        <Option value="+226" key="226">
          +226
        </Option>
      </Select>
    </Item>
  );
  const vider = (e) => {
    form.resetFields();
  };
  const handleReAdd = () => {
    form
      .validateFields()
      .then((values) => {
        onFinishReAdd(values);
      })
      .catch((errorInfo) => {});
  };
  var ajoutConfirmationError = false;
  const onFinishReAdd = (values) => {
    // const {
    //   // anneeUniversitaire,
    //   // dateNaissance,
    //   // ...rest
    // } = values;
    const dateNaissanceFormatee = dateFormat(
      values.dateNaissance,
      "yyyy-mm-dd"
    );
    const mobileWithPrefix = values.prefix + values.mobile;
    if (values.telephone == undefined) {
      values.telephone = "";
    }
    const telephoneWithPrefix = values.prefix + values.telephone;
    const candidat = {
      ...values,
      //telephone: telephoneWithPrefix,
      //mobile: mobileWithPrefix,
      codeFormation: codeFormation,
      anneeUniversitaire: anneeUniversitaire,
      dateNaissance: dateNaissanceFormatee,
    };
    console.log("candidats :>> ", JSON.stringify(candidat));
    console.log("values :>> ", values);

    axios
      .post(`http://localhost:8034/candidats`, candidat)
      .then((res) => {
        ajouterCandidat(res.data);

        toastr.success(
          "Candidat : " +
            candidat.prenom +
            " " +
            candidat.nom +
            " est ajouter avec succes",
          "Ajout Candidat"
        );
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("error: ", res.error);
        vider();
      })
      .catch((error) => {
        setMessageErreur(error.response.data.errorMeassage);
        toastr.error(error.response.data.errorMeassage, "Erreur d'Ajout");
        console.log(
          "error message errorMeassage ",
          error.response.data.errorMeassage
        );
        ajoutConfirmationError = true;
      });
  };

  const onFinish = (values) => {
    onFinishReAdd(values);
    if (ajoutConfirmationError) fermerPopUp();
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
                  <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                      },
                      { rulesInteger },
                    ]}
                  >
                    {/* <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    /> */}
                    <PhoneInput placeholder="" />
                  </Form.Item>
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
                    label="Universite d'origine"
                    name="universiteOrigine"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select size="large">
                      {AbreviationsUniversite.map((abreviation) => (
                        <Option key={abreviation}>
                          {universite.get(abreviation)}
                        </Option>
                      ))}
                    </Select>
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
                    <Select size="large">
                      {pays.map((p) => (
                        <Option key={p.abreviation}>{p.signification}</Option>
                      ))}
                    </Select>
                  </Item>

                  {/* <Item
                    label="Telephone"
                    name="telephone"
                    rules={[
                      {
                        pattern: "^[0-9]{9,9}$",
                        message: "${label} n'est pas valide!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    />
                  </Item> */}
                  <Item label="Telephone" name="telephone" rules={rulesInteger}>
                    {/* <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    /> */}
                    <PhoneInput placeholder="" />
                  </Item>

                  <Item
                    label="Ville"
                    name="ville"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Item>

                  <Item
                    label="Code postal"
                    name="codePostal"
                    rules={[
                      {
                        required: true,
                        pattern: "^[0-9a-zA-Z]{5,10}$",
                        message: "${label} est non valide",
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
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
              >
                <Select size="large">
                  <Option key={"LP"}>Liste Principale</Option>
                  <Option key={"LA"}>Liste d'Attente</Option>
                  <Option key={"NR"}>Non Retenu</Option>
                </Select>
              </Item>
              {/* <Row justify="end">
                <Button htmlType="submit" size="large" type="primary">
                  AJOUTER
                </Button>
              </Row> */}
              {/* <Row justify="center">
                <p style={{ color: "red" }}>{messageErreur}</p>
              </Row> */}
              <Row>
                <button
                  type="button"
                  size="large"
                  onClick={vider}
                  className="btn btn-outline-secondary mx-2"
                  style={{ float: "left" }}
                >
                  <ReplayIcon />
                </button>

                <button
                  type="submit"
                  size="large"
                  className="btn btn-primary mx-2"
                  style={{ float: "right" }}
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  size="large"
                  onClick={handleReAdd}
                  className="btn btn-primary mx-2"
                  style={{ float: "right" }}
                >
                  Reajouter
                </button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddCandidat;
