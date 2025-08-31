import React from 'react';
import { Truck, DollarSign, Coffee, Book, ForkKnife } from 'lucide-react'; // Importing relevant icons

const transactions = [
    { name: 'Bus fare', category: 'Transport', amount: -12.30, date: '1/13/2025', type: 'expense', icon: <Truck className="text-blue-500" /> },
    { name: 'Monthly allowance', category: 'Income', amount: 300.00, date: '1/1/2025', type: 'income', icon: <DollarSign className="text-green-500" /> },
    { name: 'Morning coffee', category: 'Coffee', amount: -5.75, date: '1/14/2025', type: 'expense', icon: <Coffee className="text-orange-500" /> },
    { name: 'Study materials', category: 'Books', amount: -25.00, date: '1/14/2025', type: 'expense', icon: <Book className="text-blue-700" /> },
    { name: 'Lunch at cafeteria', category: 'Food', amount: -15.50, date: '1/15/2025', type: 'expense', icon: <ForkKnife className="text-red-500" /> },
];

const Transection = () => {
    return (
        <div className="min-h-screen  p-6">
            <h1 className="text-2xl font-bold mb-6">Transactions</h1>

            <div className="space-y-4">
                {transactions.map((transaction, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-gray-100">
                                {transaction.icon} {/* Displaying icon */}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800">{transaction.name}</div>
                                <div className="text-sm text-gray-500">{transaction.category} • {transaction.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`font-semibold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                                {transaction.type === 'expense' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className={`text-xs ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                                {transaction.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transection;
