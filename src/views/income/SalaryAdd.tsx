import { SalaryAddType, SalaryDetailItemType } from 'models/salary';
import React, { useState } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';

const SalaryAdd: React.FC = () => {
    const [formData, setFormData] = useState<SalaryAddType>({
        date: new Date().toISOString().split('T')[0],
        gross_pay: 0,
        total_adjustment: 0,
        total_withheld: 0,
        total_deduction: 0,
        net_pay: 0,
        details: {
            gross_pay: [{
                name: 'Regular HRS',
                value: ''

            }],
            adjustment: [{
                name: "401(K)",
                value: ''
            },
            {
                name: "Disability Ins",
                value: ''
            },
            {
                name: "Healthcare FSA Deduction",
                value: ''
            }],
            withheld: [{
                name: "Federal Income Tax",
                value: ''
            },
            {
                name: "Social Security Tax",
                value: ''
            },
            {
                name: "Medicare Tax",
                value: ''
            },
            {
                name: "WA Cares Fund Ltc Tax",
                value: ''
            }],
            deduction: [{
                name: "Espp",
                value: ''
            },
            {
                name: "Legal Plan",
                value: ''
            },
            {
                name: "Disability Ins",
                value: ''
            },
            {
                name: "Dependent Life Ins",
                value: ''
            }, {
                name: "Ad&d Family Ins",
                value: ''
            }]
        }
    });

    const addNewDetailRow = (type: keyof typeof formData.details) => {
        addNewDetail(type, '', '');
    }

    const addNewDetail = (type: keyof typeof formData.details, name: string, value: number | string) => {
        setFormData({
            ...formData,
            details: {
                ...formData.details,
                [type]: [
                    ...formData.details[type],
                    {
                        name: name, value: value
                    }
                ]
            }
        });
    }

    const handleDetailChange = (e: React.ChangeEvent<any>, field_name: keyof typeof formData.details, key_name: keyof SalaryDetailItemType, index: number) => {
        const { value } = e.target;

        const updatedFormData = {
            ...formData,
            details: {
                ...formData.details,
                [field_name]: formData.details[field_name].map((item, i) => {
                    if (i === index) {
                        if (key_name === 'name') {
                            const new_item = {
                                name: value,
                                value: item.value
                            }
                            return new_item;
                        }
                        else {
                            return {
                                name: item.name,
                                value: isNaN(parseFloat(value)) ? 0 : parseFloat(value)
                            };
                        }
                    } else {
                        return item;
                    }
                })
            }
        };
        updateNumbersAndSet(updatedFormData);
    }

    const handleMinus = (e: React.KeyboardEvent<any>, index: number, detail_type: keyof typeof formData.details) => {
        if (e.key === '-') {
            e.preventDefault();
            const currentValue = parseFloat(e.currentTarget.value);

            const updatedFormData = {
                ...formData,
                details: {
                    ...formData.details,
                    [detail_type]: formData.details[detail_type].map((item, i) => {
                        if (i === index) {
                            return {
                                name: item.name,
                                value: isNaN(currentValue) ? 0 : -currentValue
                            };
                        } else {
                            return item;
                        }
                    })
                }
            };
            updateNumbersAndSet(updatedFormData);
        }
    }

    const updateNumbersAndSet = (updatedFormData: SalaryAddType) => {
        let gross_pay = 0;
        let total_adjustment = 0;
        let total_withheld = 0;
        let total_deduction = 0;

        updatedFormData.details.gross_pay.forEach((item) => {
            gross_pay = typeof item.value !== 'string' ? gross_pay + item.value : gross_pay;
        });

        updatedFormData.details.adjustment.forEach((item) => {
            total_adjustment = typeof item.value !== 'string' ? total_adjustment + item.value : total_adjustment;
        });

        updatedFormData.details.withheld.forEach((item) => {
            total_withheld = typeof item.value !== 'string' ? total_withheld + item.value : total_withheld;
        });

        updatedFormData.details.deduction.forEach((item) => {
            total_deduction = typeof item.value !== 'string' ? total_deduction + item.value : total_deduction;
        });

        const net_pay = gross_pay + total_adjustment + total_withheld + total_deduction;

        setFormData({
            ...updatedFormData,
            gross_pay: gross_pay,
            total_adjustment: total_adjustment,
            total_withheld: total_withheld,
            total_deduction: total_deduction,
            net_pay: net_pay
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h3">Add New Salary</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGrossPay">
                                    <Form.Label>Gross Pay</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="gross_pay"
                                        value={formData.gross_pay}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formNetPay">
                                    <Form.Label>Net Pay</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="net_pay"
                                        value={formData.net_pay}
                                        readOnly
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formTotalAdjustment">
                                <Form.Label>Total Adjustment</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="total_adjustment"
                                    value={formData.total_adjustment}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTotalWithheld">
                                <Form.Label>Total Withheld</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="total_withheld"
                                    value={formData.total_withheld}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTotalDeduction">
                                <Form.Label>Total Deduction</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="total_deduction"
                                    value={formData.total_deduction}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Gross Pay Details</Form.Label>
                            {formData.details.gross_pay.map((pay, index) => (
                                <InputGroup className="mb-3" key={index}>
                                    <Form.Control
                                        type="text"
                                        name={`gross_pay_details_${index}_name`}
                                        value={pay.name}
                                        onChange={(e) => handleDetailChange(e, 'gross_pay', 'name', index)}
                                    />
                                    <Form.Control
                                        type="number"
                                        step={0.01}
                                        name={`gross_pay_details_${index}_value`}
                                        value={pay.value}
                                        onChange={(e) => handleDetailChange(e, 'gross_pay', 'value', index)}
                                        onKeyDown={(e) => handleMinus(e, index, 'gross_pay')}
                                    />
                                    {index == formData.details.gross_pay.length - 1 && <Button onClick={() => addNewDetailRow('gross_pay')}>Add new</Button>}
                                    {index != formData.details.gross_pay.length - 1 && <Button>Delete</Button>}
                                </InputGroup>
                            ))}
                        </Col>
                        <Col md={6}>
                            <Form.Label>Adjustment Details</Form.Label>
                            {formData.details.adjustment.map((pay, index) => (
                                <InputGroup className="mb-3" key={index}>
                                    <Form.Control
                                        type="text"
                                        name={`adjustment_details_${index}_name`}
                                        value={pay.name}
                                        onChange={(e) => handleDetailChange(e, 'adjustment', 'name', index)}
                                    />
                                    <Form.Control
                                        type="number"
                                        step={0.01}
                                        name={`adjustment_details_${index}_value`}
                                        value={pay.value}
                                        onChange={(e) => handleDetailChange(e, 'adjustment', 'value', index)}
                                        onKeyDown={(e) => handleMinus(e, index, 'adjustment')}
                                    />
                                    {index == formData.details.adjustment.length - 1 && <Button onClick={() => addNewDetailRow('adjustment')}>Add new</Button>}
                                    {index != formData.details.adjustment.length - 1 && <Button>Delete</Button>}
                                </InputGroup>
                            ))}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Withheld Details</Form.Label>
                            {formData.details.withheld.map((pay, index) => (
                                <InputGroup className="mb-3" key={index}>
                                    <Form.Control
                                        type="text"
                                        name={`withheld_details_${index}_name`}
                                        value={pay.name}
                                        onChange={(e) => handleDetailChange(e, 'withheld', 'name', index)}
                                    />
                                    <Form.Control
                                        type="number"
                                        step={0.01}
                                        name={`withheld_details_${index}_value`}
                                        value={pay.value}
                                        onChange={(e) => handleDetailChange(e, 'withheld', 'value', index)}
                                        onKeyDown={(e) => handleMinus(e, index, 'withheld')}
                                    />
                                    {index == formData.details.withheld.length - 1 && <Button onClick={() => addNewDetailRow('withheld')}>Add new</Button>}
                                    {index != formData.details.withheld.length - 1 && <Button>Delete</Button>}
                                </InputGroup>
                            ))}
                        </Col>
                        <Col md={6}>
                            <Form.Label>Deduction Details</Form.Label>
                            {formData.details.deduction.map((pay, index) => (
                                <InputGroup className="mb-3" key={index}>
                                    <Form.Control
                                        type="text"
                                        name={`deduction_details_${index}_name`}
                                        value={pay.name}
                                        onChange={(e) => handleDetailChange(e, 'deduction', 'name', index)}
                                    />
                                    <Form.Control
                                        type="number"
                                        step={0.01}
                                        name={`deduction_details_${index}_value`}
                                        value={pay.value}
                                        onChange={(e) => handleDetailChange(e, 'deduction', 'value', index)}
                                        onKeyDown={(e) => handleMinus(e, index, 'deduction')}
                                    />
                                    {index == formData.details.deduction.length - 1 && <Button onClick={() => addNewDetailRow('deduction')}>Add new</Button>}
                                    {index != formData.details.deduction.length - 1 && <Button>Delete</Button>}
                                </InputGroup>
                            ))}
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Card.Body>
            </Card >
        </>
    );
};

export default SalaryAdd;