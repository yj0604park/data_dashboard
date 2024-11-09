export interface SalaryType {
    id?: number;
    date: string;
    gross_pay: number;
    total_adjustment: number;
    total_withheld: number;
    total_deduction: number;
    net_pay: number;
}

export interface SalaryAddType extends SalaryType {
    details: {
        gross_pay: SalaryDetailItemType[];
        adjustment: SalaryDetailItemType[];
        withheld: SalaryDetailItemType[];
        deduction: SalaryDetailItemType[];
    };
}


export interface SalaryDetailItemType {
    id?: number;
    name: string;
    value: number | string;
};
