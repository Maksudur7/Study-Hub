import React from 'react';

const TabOverview = () => {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-8">Monthly Progress</h3>
            <p className="text-sm text-gray-700 mb-2">Budget Usage</p>
            <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                <span>$58.55 / $260.00</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div className="h-3 bg-gray-800 w-[23%]"></div>
            </div>
            <p className="text-gray-600 text-sm">Great job! You have $241.45 left this month.</p>
        </div>
    );
};

export default TabOverview;