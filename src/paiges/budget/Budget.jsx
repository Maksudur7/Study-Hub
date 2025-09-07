import { useContext, useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Clock, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../Authintaction paige/AuthProvider";

const Budget = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [incomeData, setIncomeData] = useState(0);
    const [expenseData, setExpenseData] = useState(0);
    const [data, setData] = useState([])
    const { user } = useContext(AuthContext)
    console.log(data);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:5000/addTranslation");
            const data = await res.json();
            const filterData = data.filter(e => e.email === user.email)
            setData(filterData)

            const incomeItems = data.filter((t) => t.type === "income");
            const totalIncome = incomeItems.reduce((sum, item) => sum + Number(item.amount), 0);
            setIncomeData(totalIncome);

            const expenseItems = data.filter((t) => t.type === "expense");
            const totalExpense = expenseItems.reduce((sum, item) => sum + Number(item.amount), 0);
            setExpenseData(totalExpense);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const type = e.target.type.value;
        const amount = e.target.amount.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const email = user.email

        const translation = { type, amount, category, description, email };

        try {
            const res = await fetch("http://localhost:5000/addTranslation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(translation),
            });

            if (res.ok) {
                Swal.fire("Success", "Transaction added successfully!", "success");
                toast.success("Transaction added successfully!");
                fetchData();
                handleCloseModal();
                e.target.reset();
            } else {
                toast.error("Failed to add transaction");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding transaction");
        }
    };

    return (
        <div className="min-h-screen mx-14 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <DollarSign className="text-green-600" /> Budget Tracker
                    </h1>
                    <p className="text-gray-600">Keep track of every penny! 💰</p>
                </div>
                <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                    onClick={handleOpenModal}
                >
                    <Plus size={18} /> Add Transaction
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <ArrowUpRight /> <span className="font-semibold">Income</span>
                    </div>
                    <h2 className="text-2xl font-bold">${incomeData}</h2>
                    <p className="text-sm">This month</p>
                </div>
                <div className="bg-red-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <ArrowDownRight /> <span className="font-semibold">Expenses</span>
                    </div>
                    <h2 className="text-2xl font-bold">${expenseData}</h2>
                    <p className="text-sm">This month</p>
                </div>

                <div className="bg-blue-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <DollarSign /> <span className="font-semibold">Remaining</span>
                    </div>
                    <h2 className="text-2xl font-bold">${incomeData - expenseData}</h2>
                    <p className="text-sm">Available to spend</p>
                </div>

                <div className="bg-purple-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <Clock /> <span className="font-semibold">Budget Used</span>
                    </div>
                    <h2 className="text-2xl font-bold">
                        {incomeData > 0 ? Math.round((expenseData / incomeData) * 100) : 0}%
                    </h2>
                    <p className="text-sm">Of total budget</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white p-2 rounded-lg inline-flex px-5 gap-2 mb-6">
                <NavLink to={"/budget"} className="shadow px-4 py-2 rounded-lg font-medium">
                    Overview
                </NavLink>
                <NavLink
                    to={"/budget/catagoris"}
                    className="shadow px-4 py-2 rounded-lg text-gray-600"
                >
                    Categories
                </NavLink>
                <NavLink
                    to={"/budget/tranction"}
                    className="shadow px-4 py-2 rounded-lg text-gray-600"
                >
                    Transactions
                </NavLink>
            </div>

            {/* Monthly Progress */}
            <div>
                <Outlet context={{ income: incomeData, expens: expenseData, transactions: data }} ></Outlet>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg bg-opacity-400 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Add New Transaction</h2>
                            <button onClick={handleCloseModal}>X</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                <select id="type" name="type" className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option value="">Select type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
                                <input type="number" id="amount" name="amount" className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="0.00" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select id="category" name="category" className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                    <option value="">Select category</option>
                                    <option value="food">Food</option>
                                    <option value="books">Books</option>
                                    <option value="transport">Transport</option>
                                    <option value="coffee">Coffee</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input type="text" id="description" name="description" className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="What did you buy?" />
                            </div>

                            <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Add Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Budget;
