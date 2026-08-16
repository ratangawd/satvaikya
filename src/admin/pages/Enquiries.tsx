import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminEnquiries, CustomerEnquiryGroup } from "@/services/adminEnquiry.service";
import AdminLayout from "../layouts/AdminLayout";

export default function Enquiries() {
    const [customers, setCustomers] = useState<CustomerEnquiryGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getAdminEnquiries();
                setCustomers(data);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                Loading enquiries...
            </div>
        );
    }

    return (
        <AdminLayout>
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">
                Customer Enquiries
            </h1>

            <div className="overflow-hidden rounded-xl border bg-white">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left">
                                Phone
                            </th>

                            <th className="px-6 py-4 text-center">
                                Enquiries
                            </th>

                            <th className="px-6 py-4 text-center">
                                Last Enquiry
                            </th>

                            <th className="px-6 py-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.map((customer) => (

                            <tr
                                key={customer.customer_id}
                                className="border-t"
                            >

                                <td className="px-6 py-4 font-medium">
                                    {customer.customer_name}
                                </td>

                                <td className="px-6 py-4">
                                    {customer.email}
                                </td>

                                <td className="px-6 py-4">
                                    {customer.phone}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    {customer.enquiryCount}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    {new Date(
                                        customer.lastEnquiry
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <Link
                                        to={`/admin/enquiries/${customer.customer_id}`}
                                        className="rounded-lg bg-brand px-4 py-2 text-white"
                                    >
                                        View
                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
        </AdminLayout>
    );
}