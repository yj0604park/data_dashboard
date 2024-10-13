import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from 'store/authContext';


import { Row, Col, Card } from 'react-bootstrap';

const dashSalesData = [
  { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
  { title: 'Monthly Sales', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
  { title: 'Yearly Sales', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
];

const IncomeDefault = () => {
  const [salesData, setSalesData] = useState([]);
  const { isAuthenticated, getToken } = useAuth();

  console.log(isAuthenticated);
  const token = getToken();
  console.log(token);

  useEffect(() => {
    if (!isAuthenticated) return;

    axios.get('http://192.168.50.12:8000/api/salarydetail/', { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        setSalesData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <Row>
        {salesData.map((data, index) => {
          return (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} /> $249.95
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default IncomeDefault;
