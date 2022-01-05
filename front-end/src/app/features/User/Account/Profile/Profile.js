import React, { useEffect, useState } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from 'yup'

import './Profile.scss'

let schema = yup.object().shape({
    name: yup.string().trim().min(5).max(20).required('adadad'),
    email: yup.string().required().email(),
    phone: yup.string().trim().min(0).max(10).required(),
    gender: yup.string().required().trim(),
    avatar: yup.object().required()
  });

const Profile = ({setIsActive}) => {
    
    useEffect(() => {
        setIsActive(false)
        return () => {
            setIsActive(true)
        }
    }, [])

    return(
        <Card>
            <Card.Header>
                <h4>Hồ sơ của tôi</h4>
                <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            </Card.Header>
            <Card.Body>
                <Row>
                <Formik
                    validationSchema={schema}
                    // onSubmit={(values) => submitForm(values) }
                    initialValues=''
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        isInvalid,
                        isSubmitting,
                        errors,
                    }) => (
                    <Form noValidate onSubmit={handleSubmit} className='profile'>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                            <Form.Label column sm={3}>
                            Tên
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="text"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                            Email
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="email"  />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
                            <Form.Label column sm={3}>
                            Số điện thoại
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control type="phone"  />
                            </Col>
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={3}>
                                Giới tính
                            </Form.Label>
                            <Col sm={9} className="form-check-container">
                                <Form.Check
                                type="radio"
                                label="Nam"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                />
                                <Form.Check
                                type="radio"
                                label="Nữ"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                />
                                <Form.Check
                                type="radio"
                                label="Không xác định"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                />
                            </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalInput">
                            <Form.Label column sm={3}>Chọn ảnh</Form.Label>
                            <Col sm={9}>
                            <Form.Control type="file" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }} style={{textAlign: 'right'}}>
                            <Button type="submit">Lưu</Button>
                            </Col>
                        </Form.Group>
                        </Form>
                    )}
                    </Formik>
                </Row>
            </Card.Body>
            <Card.Footer>

            </Card.Footer>
        </Card>
    )
}

export default Profile