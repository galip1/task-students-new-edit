import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./admin-students.scss";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import DataGrid, {
  Column,
  Editing,
  Pager,
  Popup,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import { toast } from "../../helpers/swal";
import { getAllUserByPage, postUser } from "../../api/student-service";

const AdminStudents = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const allowedPageSizes = [6, 10, 15, 20, 100];
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    id: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    domain: "",
    company: "",
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getAllUserByPage();
      setData(resp.data.users);
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await postUser(values);
      const updatedData = [values, ...data];
      setData(updatedData);
      setShowModal(false);
      formik.resetForm(initialValues);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    image: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please enter a valid URL!"
      )
      .required("Please enter your image link"),
    firstName: Yup.string().required("Please enter a firstname"),
    lastName: Yup.string().required("Please enter a lastName"),
    email: Yup.string().required("Please enter a email"),
    phone: Yup.string().required("Please enter a phone number"),
    domain: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please enter a valid URL!"
      )
      .required("Please enter a website"),
    company: Yup.string().required("Please enter a company name"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    loadData();
    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        // Enter key
        event.preventDefault();
        formik.handleSubmit();
      } else if (event.keyCode === 27) {
        // Escape key
        event.preventDefault();
        handleCancel();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line
  }, []);

  const handleCancel = () => {
    setShowModal(false);
    formik.resetForm();
    formik.setTouched({});
  };

  return (
    <div className="datagrid">
      {/* Yeni Öğrenci Ekleme Butonu */}
      <div className="table-top">
        <h5>Students List</h5>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <span>ADD NEW STUDENT</span>
        </Button>
      </div>
      {/* Datagrid Bölümü */}
      <Container fluid>
        <DataGrid
          dataSource={data}
          showBorders={false}
          keyExpr="id"
          height={570}
          columnAutoWidth={true}
          showColumnLines={false}
          sorting={{
            mode: "single",
            sortOrder: "desc",
            sortExpr: [{ getter: "id", desc: true }],
          }}
        >
          <SearchPanel
            visible={true}
            highlightSearchText={true}
            searchVisibleColumnsOnly={false}
            width={212}
            placeholder="Search..."
          />
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={false}
            allowDeleting={true}
          >
            <Popup
              title="Edit Student"
              showTitle={true}
              width="60%"
              height="70%"
            />
            <Form>
              <Item itemType="group" colCount={1} colSpan={2}>
                <Item dataField="image" />
                <Item dataField="firstName" />
                <Item dataField="lastName" />
                <Item dataField="email" />
                <Item dataField="phone" />
                <Item dataField="domain" />
                <Item dataField="company" />
              </Item>
            </Form>
          </Editing>
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode="compact"
            showPageSizeSelector={true}
            showInfo={true}
            showNavigationButtons={true}
          />
          <Paging defaultPageSize={6} />
          <Column
            dataField="image"
            caption=""
            visible={true}
            cellRender={(cellData) => (
              <img
                src={cellData.value}
                alt="User"
                style={{
                  width: "4rem",
                  height: "3.5rem",
                  borderRadius: ".5rem",
                }}
              />
            )}
          />
          <Column
            dataField="fullName"
            caption="Name"
            visible={true}
            calculateCellValue={(data) => `${data.firstName} ${data.lastName}`}
          />
          <Column dataField="email" caption="Email" visible={true} />
          <Column dataField="phone" caption="Phone" visible={true} />
          <Column dataField="domain" caption="Website" visible={true} />
          <Column
            caption="Company Name"
            visible={true}
            calculateCellValue={(data) =>
              data.company && data.company.name
                ? data.company.name
                : data.company
            }
          />
        </DataGrid>
      </Container>
      {/* Yeni Öğrenci Ekle Butonuna Basılınca Açılacak Modal Yapı */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          formik.resetForm();
          formik.setTouched({});
        }}
        style={{ border: "none", borderRadius: "22px" }}
      >
        <Modal.Header closeButton>Add New Student</Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit} className="px-3">
          <Modal.Body>
            <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                {...formik.getFieldProps("image")}
                isValid={formik.touched.image && !formik.errors.image}
                isInvalid={formik.touched.image && !!formik.errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.image}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("firstName")}
                isValid={formik.touched.firstName && !formik.errors.firstName}
                isInvalid={
                  formik.touched.firstName && !!formik.errors.firstName
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("lastName")}
                isValid={formik.touched.lastName && !formik.errors.lastName}
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("email")}
                isValid={formik.touched.email && !formik.errors.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("phone")}
                isValid={formik.touched.phone && !formik.errors.phone}
                isInvalid={formik.touched.phone && !!formik.errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="domain">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("domain")}
                isValid={formik.touched.domain && !formik.errors.domain}
                isInvalid={formik.touched.domain && !!formik.errors.domain}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.domain}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("company")}
                isValid={formik.touched.company && !formik.errors.company}
                isInvalid={formik.touched.company && !!formik.errors.company}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.company}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="mb-3">
            <Button variant="secondary" onClick={handleCancel}>
              Vazgeç
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.dirty && formik.isValid) || loading}
            >
              {loading && <Spinner animation="border" size="sm" />} Kaydet
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminStudents;
