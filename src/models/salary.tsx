export interface Salary {
    id: number;
    date: number;
    gross_pay: number;
    total_adjustment: number;
    total_withheld: number;
    total_deduction: number;
    net_pay: number;
    pay_detail: JSON;
    adjustment_detail: JSON;
    tax_detail: JSON;
    deduction_detail: JSON;
}