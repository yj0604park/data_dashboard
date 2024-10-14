import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'store/authContext';

import { useNavigate } from "react-router-dom";
import { Salary } from 'models/salary';
import { Card, Col, Row, Table } from 'react-bootstrap';

interface SalaryDetailItem {
  id: number;
  name: string;
};

const IncomeDefault = () => {
  const [salaryDetailItem, setSalaryDetailItem] = useState<SalaryDetailItem[]>([]);
  const [salary, setSalary] = useState<Salary[]>([]);
  const { isAuthenticated, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!isAuthenticated) navigate('/demos/admin-templates/datta-able/react/free/login');;

    axios.get('http://192.168.50.12:8000/api/salarydetailitem/', { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        setSalaryDetailItem(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    axios.get('http://192.168.50.12:8000/api/salary/', { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        setSalary(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [isAuthenticated]);

  return (
    <>
      <Row>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Basic Table</Card.Title>
              <span className="d-block m-t-5">
                use bootstrap <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Net Pay</th>
                    <th>Gross Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {salary.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.date}</td>
                        <td>{data.net_pay}</td>
                        <td>{data.gross_pay.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                      </tr>
                    );
                  })}

                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {salaryDetailItem.map((data, index) => {
          return (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.name}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        {data.name}
                      </h3>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default IncomeDefault;
