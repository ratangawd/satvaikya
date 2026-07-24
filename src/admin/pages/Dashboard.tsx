import AdminLayout from "../layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="mt-6 grid grid-cols-4 gap-6">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-gray-500">Categories</h2>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-gray-500">Products</h2>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-gray-500">Enquiries</h2>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-gray-500">Sales Channels</h2>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>
            </div>
        </AdminLayout>
    );
}