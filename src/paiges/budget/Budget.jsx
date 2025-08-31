import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Clock, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Budget = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transaction, setTransaction] = useState({
        type: '',
        amount: '',
        category: '',
        description: '',
    });

    // Open the modal
    const handleOpenModal = () => setIsModalOpen(true);

    // Close the modal
    const handleCloseModal = () => setIsModalOpen(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(transaction);
        setTransaction({ type: '', amount: '', category: '', description: '' });
        handleCloseModal();
        alert("Transaction added successfully!");
    };

    return (
        <div className="min-h-screen mx-14  p-6">
            {/* Header */}
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

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <ArrowUpRight /> <span className="font-semibold">Income</span>
                    </div>
                    <h2 className="text-2xl font-bold">$300.00</h2>
                    <p className="text-sm">This month</p>
                </div>
                <div className="bg-red-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <ArrowDownRight /> <span className="font-semibold">Expenses</span>
                    </div>
                    <h2 className="text-2xl font-bold">$58.55</h2>
                    <p className="text-sm">This month</p>
                </div>

                <div className="bg-blue-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <DollarSign /> <span className="font-semibold">Remaining</span>
                    </div>
                    <h2 className="text-2xl font-bold">$241.45</h2>
                    <p className="text-sm">Available to spend</p>
                </div>

                <div className="bg-purple-500 text-white p-5 rounded-lg shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-8">
                        <Clock /> <span className="font-semibold">Budget Used</span>
                    </div>
                    <h2 className="text-2xl font-bold">23%</h2>
                    <p className="text-sm">Of total budget</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white p-2 rounded-lg inline-flex px-5 gap-2 mb-6">
                <NavLink to={'/budget'} className="shadow px-4 py-2 rounded-lg font-medium">Overview</NavLink>
                <NavLink to={'/budget/catagoris'} className="shadow px-4 py-2 rounded-lg text-gray-600">Categories</NavLink>
                <NavLink to={'/budget/tranction'} className="shadow px-4 py-2 rounded-lg text-gray-600">Transactions</NavLink>
            </div>

            {/* Monthly Progress */}
            <div>
                <Outlet></Outlet>
            </div>


            {/* Modal for Adding Transaction */}
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
                                <select
                                    id="type"
                                    name="type"
                                    value={transaction.type}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                                >
                                    <option value="">Select type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={transaction.amount}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={transaction.category}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                                >
                                    <option value="">Select category</option>
                                    <option value="food">Food</option>
                                    <option value="transport">Transport</option>
                                    <option value="entertainment">Entertainment</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={transaction.description}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500"
                                    placeholder="What did you buy?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
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
