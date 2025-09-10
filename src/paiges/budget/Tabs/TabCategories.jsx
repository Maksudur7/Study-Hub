import React from 'react';
import { ShoppingBag, Book, Coffee, Truck } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const TabCategories = () => {
    const { income, expens, transactions } = useOutletContext();

    const calculateTotals = (category) => {
        const filtered = transactions.filter(
            (t) => t.category?.toLowerCase() === category.toLowerCase()
        );
        const incomeTotal = filtered
            .filter((t) => t.type === "income")
            .reduce((sum, item) => sum + Number(item.amount), 0);
        const expenseTotal = filtered
            .filter((t) => t.type === "expense")
            .reduce((sum, item) => sum + Number(item.amount), 0);

        return { incomeTotal, expenseTotal };
    };

    const food = calculateTotals("food");
    const books = calculateTotals("books");
    const coffee = calculateTotals("coffee");
    const transport = calculateTotals("transport");

    const categories = [
        { name: "Food", amountSpent: food.expenseTotal, budget: food.incomeTotal, icon: <ShoppingBag className="text-red-500" /> },
        { name: "Books", amountSpent: books.expenseTotal, budget: books.incomeTotal, icon: <Book className="text-blue-500" /> },
        { name: "Coffee", amountSpent: coffee.expenseTotal, budget: coffee.incomeTotal, icon: <Coffee className="text-orange-500" /> },
        { name: "Transport", amountSpent: transport.expenseTotal, budget: transport.incomeTotal, icon: <Truck className="text-green-500" /> },
    ];

    const getProgress = (spent, budget) => {
        if (budget <= 0) return 0;
        const percent = (spent / budget) * 100;
        return Math.min(percent, 100);
    };

    return (
        <div className="min-h-screen px-4 md:px-14 py-6">
            <h1 className="text-2xl font-bold mb-6">Budget Categories</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white p-4 py-8 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <span className="font-semibold">{category.name}</span>
                            </div>
                            <span className="text-sm font-semibold">
                                ${category.amountSpent.toFixed(2)} of ${category.budget.toFixed(2)}
                            </span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className={`h-2 rounded-full ${
                                    category.name === "Food"
                                        ? "bg-red-600"
                                        : category.name === "Books"
                                        ? "bg-blue-600"
                                        : category.name === "Coffee"
                                        ? "bg-orange-600"
                                        : "bg-green-600"
                                }`}
                                style={{ width: `${getProgress(category.amountSpent, category.budget)}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                            <span>{`${Math.round(getProgress(category.amountSpent, category.budget))}%`}</span>
                            <span className="text-gray-400">
                                Remaining: ${Math.max(category.budget - category.amountSpent, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabCategories;
