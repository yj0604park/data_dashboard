import { SalaryType } from 'models/salary';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from 'store/authContext';
import { apiCall } from 'views/auth/signin/API';

interface SalaryDetailProps {
    employeeName: string;
    baseSalary: number;
    bonus: number;
    deductions: number;
}

const SalaryDetail: React.FC<SalaryDetailProps> = () => {
    const { salary_id } = useParams<{ salary_id: string }>();
    const { getToken } = useAuth();
    const [salaryDetail, setSalaryDetail] = useState<SalaryType | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        const fetchSalaryDetail = async () => {
            try {
                const response = await apiCall({ url: "/salary/" + salary_id, method: "GET", token: token });
                setSalaryDetail(response);
            } catch (error) {
                console.error('Error fetching salary detail:', error);
            }
        };

        if (salary_id) {
            fetchSalaryDetail();
        }
    }, [salary_id]);

    if (!salaryDetail) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <h1>Salary Detail {salary_id}</h1>
        </>
    );
};

export default SalaryDetail;