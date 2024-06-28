import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

import 'react-datepicker/dist/react-datepicker.css';

function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      category,
      price,
      selectedDate,
    };
    console.log(formData);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingInput" label="Category">
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingInput" label="Price">
              <Form.Control
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              customInput={<Form.Control />}
              className="form-control"
              placeholderText="Date"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default AddExpense;
