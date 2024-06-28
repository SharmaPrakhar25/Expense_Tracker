import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line import/no-unresolved
import { terminal } from 'virtual:terminal';

function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        user_id: 1,
        category,
        amount: parseInt(price, 2),
        // selectedDate,
        is_shared: false,
      };
      terminal.log(import.meta.env);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/expense/add`,
        // eslint-disable-next-line comma-dangle
        expenseData
      );
      // const { message } = response;
      // Todo: show message back in toast bar
    } catch (error) {
      throw new Error('something went wrong');
    }
  };

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
