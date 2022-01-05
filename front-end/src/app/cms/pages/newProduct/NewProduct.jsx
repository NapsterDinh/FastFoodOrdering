import "./newProduct.css";
import React, { useEffect, useState } from "react";
import { Dropdown, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Doka from "../fileUpload/FileUpload";

export default function NewProduct() {
  const [data, setData] = useState({
    categoryId: "",
    name: "",
    price: "",
    description: "",
    shortDescription: "",
    image: "",
    size: [],
    topping: [],
  });

  const [checkListSize, setCheckListSize] = useState([]);
  const [checkListTopping, setCheckListTopping] = useState([]);
  const onHandleChangeSize = (e) => {
    if (e.target.checked === true) {
      setCheckListSize([...checkListSize, String(e.target.value)]);
    }
  };
  const onHandleChangeTopping = (e) => {
    if (e.target.checked === true) {
      setCheckListTopping([...checkListTopping, String(e.target.value)]);
    }
  };

  const sizes = [
    {
      id: 14341234,
      name: "S",
    },
    {
      id: 2141241,
      name: "M",
    },
    {
      id: 312414,
      name: "L",
    },
    {
      id: 4124124,
      name: "XL",
    },
  ];

  const toppings = [
    {
      id: 1,
      name: "hello",
    },
    {
      id: 2,
      name: "hello2",
    },
    {
      id: 3,
      name: "hello3",
    },
    {
      id: 4,
      name: "hello4",
    },
  ];

  const categorys = [
    {
      id: 1,
      name: "Hambuger1",
    },
    {
      id: 2,
      name: "Hambuger2",
    },
  ];

  const onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let dataChange = { ...data };
    dataChange[name] = value;
    setData(dataChange);
  };

  const onCreateProduct = (event) => {
    event.preventDefault();
    data.size = checkListSize;
    data.topping = checkListTopping;
    console.log("product========", data);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={onCreateProduct}>
        <Doka />
        <div className="productContainer">
          <div className="textContainer">
            <div className="addProductItem">
              <label>Category name</label>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categorys.map((c) => (
                  <Dropdown.Item
                    name="categoryId"
                    value={c.id}
                    onChange={onHandleChange}
                  >
                    {c.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="addProductItem">
              <label>Name</label>
              <input
                type="text"
                placeholder="abc"
                name="name"
                value={data.name}
                onChange={onHandleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                type="number"
                placeholder="123"
                name="price"
                value={data.price}
                onChange={onHandleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Short description</label>
              <input
                type="text"
                placeholder="abc"
                name="shortDescription"
                value={data.shortDescription}
                onChange={onHandleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="abcd"
                name="description"
                value={data.description}
                onChange={onHandleChange}
              />
            </div>
          </div>
          <div className="addProductItemContainer">
            <div className="addProductItem">
              <label>Size</label>
            </div>
            <Form.Group
              as={Row}
              className="mb-3 checkbox"
              controlId="formHorizontalCheck"
            >
              <Col sm={{ span: 10, offset: 12 }}>
                {sizes.map((w) => (
                  <Form.Check
                    type="checkbox"
                    key={w.id}
                    label={w.name}
                    value={w.id}
                    checked={
                      checkListSize.lastIndexOf(String(w.id)) >= 0
                        ? true
                        : false
                    }
                    onChange={onHandleChangeSize}
                  />
                ))}
              </Col>
            </Form.Group>
            <div className="addProductItem">
              <label>Topping</label>
            </div>
            <Form.Group
              as={Row}
              className="mb-3 checkbox"
              controlId="formHorizontalCheck"
            >
              <Col sm={{ span: 10, offset: 12 }}>
                {toppings.map((t) => (
                  <Form.Check
                    label={t.name}
                    value={t.id}
                    onChange={onHandleChangeTopping}
                  />
                ))}
              </Col>
            </Form.Group>
          </div>
        </div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
