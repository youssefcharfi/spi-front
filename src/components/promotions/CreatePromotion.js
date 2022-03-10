import React, { memo, useState } from "react";
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

const View = ({}) => {
  const [teacher, setTeacher] = useState(null);
  const [formation, setFormation] = useState(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const {
      anneeUniversitaire,
      dateReponseLalp,
      dateReponseLp,
      dateRentree,
      ...rest
    } = values;
 
   /*  const data = {
      dateReponseLalp: moment(dateReponseLalp).format("YYYY-MM-DD"),
      dateReponseLp: moment(dateReponseLp).format("YYYY-MM-DD"),
      dateRentree: moment(dateRentree).format("YYYY-MM-DD"),
      ...rest,
      enseignant: teacher,
      formation,
      id: {
        anneeUniversitaire:
          moment(anneeUniversitaire[0]).format("YYYY") +
          "-" +
          moment(anneeUniversitaire[1]).format("YYYY"),
        codeFormation: get(formation, "codeFormation"),
      },
    }; */
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
            >
              <Row justify="space-between">
                <h1>AJOUTER PROMOTION</h1>
              </Row>

              <Divider className="d_10" />
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
                      <Option key={1}>Teacher 1</Option>
                      <Option key={2}>Teacher 2</Option>
                      <Option key={3}>Teacher 3</Option>
                    </Select>
                  </Item>
                  <Item label="Formation" name="formation" rules={rules}>
                    <Select size="large">
                      <Option key={1}>Formation 1</Option>
                      <Option key={2}>Formation 2</Option>
                      <Option key={3}>Formation 3</Option>
                    </Select>
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
};

export default memo(View);
