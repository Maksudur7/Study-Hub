import React from 'react';
import { ShoppingBag, Book, Coffee, Truck } from 'lucide-react'; // Correct import for available icons

const TabCategories = () => {
    const categories = [
        { name: 'Food', amountSpent: 67.5, budget: 100, icon: <ShoppingBag className="text-red-500" /> }, // Changed to ShoppingBag for Food
        { name: 'Books', amountSpent: 45.0, budget: 80, icon: <Book className="text-blue-500" /> },
        { name: 'Coffee', amountSpent: 23.75, budget: 30, icon: <Coffee className="text-orange-500" /> },
        { name: 'Transport', amountSpent: 28.3, budget: 50, icon: <Truck className="text-green-500" /> },
    ];

    const getProgress = (spent, budget) => {
        return (spent / budget) * 100;
    };

    return (
        <div className="min-h-screen   p-6">
            <h1 className="text-2xl font-bold mb-6">Budget Categories</h1>

            <div className="space-y-6">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white p-4 py-10 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full ${category.icon ? 'bg-gray-100' : ''}`}>
                                    {category.icon} {/* Corrected icon usage */}
                                </div>
                                <span className="font-semibold">{category.name}</span>
                            </div>
                            <span className="text-sm font-semibold">{`$${category.amountSpent.toFixed(2)} of $${category.budget.toFixed(2)}`}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className={`h-2 rounded-full ${category.name === 'Food' ? 'bg-red-600' : category.name === 'Books' ? 'bg-blue-600' : category.name === 'Coffee' ? 'bg-orange-600' : 'bg-green-600'}`}
                                style={{ width: `${getProgress(category.amountSpent, category.budget)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                            <span>{`${Math.round(getProgress(category.amountSpent, category.budget))}%`}</span>
                            <span className="text-gray-400">{`Remaining: $${(category.budget - category.amountSpent).toFixed(2)}`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabCategories;
