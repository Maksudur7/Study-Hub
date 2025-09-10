import React from "react";
import { Truck, DollarSign, Coffee, Book, ForkKnife } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const categoryIcons = {
    transport: <Truck className="text-blue-500" />,
    income: <DollarSign className="text-green-500" />,
    coffee: <Coffee className="text-orange-500" />,
    books: <Book className="text-blue-700" />,
    food: <ForkKnife className="text-red-500" />,
};

const Transection = () => {
    const { transactions } = useOutletContext();

    return (
        <div className="min-h-screen px-4 md:px-14 py-6">
            <h1 className="text-2xl font-bold mb-6">Transactions</h1>

            <div className="space-y-4">
                {transactions && transactions.length > 0 ? (
                    transactions.map((transaction, index) => {
                        const icon =
                            categoryIcons[transaction.category?.toLowerCase()] ||
                            <DollarSign className="text-gray-500" />;

                        return (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-gray-100">{icon}</div>
                                    <div>
                                        <div className="font-semibold text-gray-800">
                                            {transaction?.description || "Untitled"}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {transaction.category || "Unknown"} •{" "}
                                            {transaction.date || "No date"}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div
                                        className={`font-semibold ${
                                            transaction.type === "expense"
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {transaction.type === "expense" ? "-" : "+"}${Math.abs(
                                            transaction.amount || 0
                                        ).toFixed(2)}
                                    </div>
                                    <div
                                        className={`text-xs ${
                                            transaction.type === "expense"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {transaction.type || "N/A"}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center">No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default Transection;
