import axios from 'axios';
import { SalaryType } from 'models/salary';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from 'store/authContext';
import BarDiscreteChart from './BarDiscreteChart';

const IncomeDefault = () => {
  const [salary, setSalary] = useState<SalaryType[]>([]);
  const { isAuthenticated, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!isAuthenticated) navigate('/demos/admin-templates/datta-able/react/free/login');

    axios.get('http://minione.local:8000/api/salary/', { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        setSalary(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [isAuthenticated]);

  const dataAscending = salary.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const years = Array.from(new Set(salary.map(item => new Date(item.date).getFullYear()))).sort((a, b) => b - a);

  return (
    <>
      <Row>
        <Col xl={12} xxl={12}>
          <Tabs defaultActiveKey="all">
            <Tab eventKey="all" title="ALL">
              <BarDiscreteChart salaries={dataAscending} />
            </Tab>
            {years.map((year, index) => {
              const data = salary.filter(item => new Date(item.date).getFullYear() === year);
              return (
                <Tab key={index} eventKey={year.toString()} title={year.toString()}>
                  <BarDiscreteChart salaries={data} />
                </Tab>
              );
            })}
          </Tabs>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xl={12} xxl={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Pay List</Card.Title>
              <div className="d-flex justify-content-between align-items-center">
                <span className="d-block m-t-5">
                  Click each item to view more details.
                </span>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>
      {years.length > 0 && (
        <Row>
          <Col xl={12} xxl={12}>
            <Tabs defaultActiveKey={years[0].toString()}>
              {years.map((year, index) => {
                const data = salary.filter(item => new Date(item.date).getFullYear() === year);
                return (
                  <Tab key={index} eventKey={year.toString()} title={year.toString()}>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Net Pay</th>
                          <th>Gross Pay</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((data, index) => {
                          return (
                            <tr key={index} onClick={() => navigate(`/app/income/salary/${data.id}`)} style={{ cursor: 'pointer' }}>
                              <td>{data.id}</td>
                              <td>{data.date}</td>
                              <td>{data.net_pay}</td>
                              <td>{data.gross_pay.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Tab>
                );
              })}
            </Tabs>
          </Col>
        </Row>
      )}
    </>
  );
};

export default IncomeDefault;
