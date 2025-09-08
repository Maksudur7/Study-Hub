import React from 'react';
import { ShoppingBag, Book, Coffee, Truck } from 'lucide-react'; 
import { useOutletContext } from 'react-router-dom';

const TabCategories = () => {
    const { income, expens, transactions } = useOutletContext();

    // Food
    const foodData = transactions.filter(TData => TData.category?.toLowerCase() === 'food');
    const totalFoodIncome = foodData.filter((t) => t.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);
    const totalFoodExpense = foodData.filter((t) => t.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    // Transport
    const transportData = transactions.filter(TData => TData.category?.toLowerCase() === 'transport');
    const totalTransportIncome = transportData.filter((t) => t.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);
    const totalTransportExpense = transportData.filter((t) => t.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    // Books
    const booksData = transactions.filter(TData => TData.category?.toLowerCase() === 'books');
    const totalBooksIncome = booksData.filter((t) => t.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);
    const totalBooksExpense = booksData.filter((t) => t.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    // Coffee
    const coffeeData = transactions.filter(TData => TData.category?.toLowerCase() === 'coffee');
    const totalCoffeeIncome = coffeeData.filter((t) => t.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);
    const totalCoffeeExpense = coffeeData.filter((t) => t.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    // Categories Array
    const categories = [
        { name: 'Food', amountSpent: totalFoodExpense, budget: totalFoodIncome, icon: <ShoppingBag className="text-red-500" /> },
        { name: 'Books', amountSpent: totalBooksExpense, budget: totalBooksIncome, icon: <Book className="text-blue-500" /> },
        { name: 'Coffee', amountSpent: totalCoffeeExpense, budget: totalCoffeeIncome, icon: <Coffee className="text-orange-500" /> },
        { name: 'Transport', amountSpent: totalTransportExpense, budget: totalTransportIncome, icon: <Truck className="text-green-500" /> },
    ];

    // Progress calculation 
    const getProgress = (spent, budget) => {
        if (budget <= 0) return 0;
        const percent = (spent / budget) * 100;
        return Math.min(percent, 100); 
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Budget Categories</h1>

            <div className="space-y-6">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white p-4 py-10 rounded-lg shadow">
                        {/* Title + Amount */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full ${category.icon ? 'bg-gray-100' : ''}`}>
                                    {category.icon}
                                </div>
                                <span className="font-semibold">{category.name}</span>
                            </div>
                            <span className="text-sm font-semibold">
                                ${category.amountSpent.toFixed(2)} of ${category.budget.toFixed(2)}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className={`h-2 rounded-full ${
                                    category.name === 'Food'
                                        ? 'bg-red-600'
                                        : category.name === 'Books'
                                        ? 'bg-blue-600'
                                        : category.name === 'Coffee'
                                        ? 'bg-orange-600'
                                        : 'bg-green-600'
                                }`}
                                style={{ width: `${getProgress(category.amountSpent, category.budget)}%` }}
                            ></div>
                        </div>

                        {/* Percentage + Remaining */}
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
