import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Schedule = () => {
    // const [className, setClassName] = useState('');
    // const [day, setDay] = useState('');
    // const [time, setTime] = useState('');
    // const [location, setLocation] = useState('');
    // const [professor, setProfessor] = useState('');




    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the page from refreshing
        const className = e.target.className.value
        const day = e.target.day.value
        const time = e.target.time.value
        const location = e.target.location.value
        const professor = e.target.professor.value
        // Log the data (you can replace this with actual submit logic)
        console.log({ className, day, time, location, professor });

        // Clear form fields after submission
        // setClassName('');
        // setDay('');
        // setTime('');
        // setLocation('');
        // setProfessor('');

        // Show success message using SweetAlert2
        Swal.fire('Success', 'Class added successfully!', 'success');

        // Show success toast
        toast.success('Class added successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    // Handle opening the "Add New Class" modal as a toast
    const handleClick = () => {
        toast.info(
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Add New Class</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name</label>
                        <input
                            type="text"
                            id="className"
                            name='className'
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Mathematics"

                        />
                    </div>

                    <div className='flex place-content-between'>
                        <div className="mt-4">
                            <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
                            <select
                                id="day"
                                name='day'
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

                            >
                                <option value="">Select day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                id="time"
                                name='time'
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="09:00 - 10:30"

                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name='location'
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Room 201"

                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="professor" className="block text-sm font-medium text-gray-700">Professor</label>
                        <input
                            type="text"
                            id="professor"
                            name='professor'
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Dr. Smith"

                        />
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            value="add class"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Class
                        </button>
                    </div>
                </form>
            </div>,
            {
                position: "top-right",
                autoClose: false, // Keep the toast open until the user submits
                hideProgressBar: true,
                closeOnClick: false, // Disable closing by clicking the toast
                pauseOnHover: false, // Disable pausing on hover to avoid closing the toast
                draggable: false, // Disable dragging to prevent closing
            }
        );
    };
    const [selectedDay, setSelectedDay] = useState("Mon");

    const tabs = [
        { name: "Today (2)", value: "today" },
        { name: "All Classes", value: "all" },
        { name: "Mon", value: "Mon" },
        { name: "Tue", value: "Tue" },
        { name: "Wed", value: "Wed" },
        { name: "Thu", value: "Thu" },
        { name: "Fri", value: "Fri" },
        { name: "Sat", value: "Sat" },
        { name: "Sun", value: "Sun" },
    ];

    return (
        <div className="app-container mx-14" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <header className=' mb-10'>
                <h1 className='text-4xl mb-5'>📅 <strong>Class Schedule Tracker</strong></h1>
                <p className='text-gray-500'>Never miss a class again! 📚</p>
                <button
                    className='-mt-20
                    '
                    onClick={handleClick}
                    style={{
                        float: "right",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    + Add New Class
                </button>
            </header>

            {/* Toast container where the toast notifications will show */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="bg-white p-4 inline-flex rounded-lg shadow-lg  mb-8">
                <div className="flex border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setSelectedDay(tab.value)}
                            className={`py-2 px-4 text-sm font-medium rounded-full 
                            ${selectedDay === tab.value
                                    ? 'bg-gray-200 text-gray-800'
                                    : 'text-gray-500 hover:bg-gray-100'} 
                            focus:outline-none`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Example class card 1 */}
            <div className="class-card flex bg-white" style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "10px" }}>
                <div className="items-start mr-5 inline-flex">
                    <div className="w-1 h-20 rounded-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
                </div>
                <div>
                    <h3 style={{ color: "#1e90ff" }}>
                        <span className='font-bold text-2xl'>Mathematics</span>
                        <span className='border-1 ml-5 border-black' style={{ backgroundColor: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" }}>Monday</span>
                    </h3>
                    <p className='py-5'>🕒 09:00 - 10:30 | 📍 Room 201</p>
                    <p>Professor: Dr. Smith</p>
                </div>
            </div>

            {/* Example class card 2 */}
            <div className="class-card flex bg-white" style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "20px" }}>
                <div className="items-start mr-5 inline-flex">
                    <div className="w-1 h-20 rounded-full bg-gradient-to-b from-green-400 to-green-600" ></div>
                </div>
                <div>
                    <h3 style={{ color: "#28a745" }}>
                        <span className='font-bold text-2xl'>Physics</span>
                        <span className='border-1 ml-5 border-black' style={{ backgroundColor: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" }}>Monday</span>
                    </h3>
                    <p className='py-5'>🕒 11:00 - 12:30 | 📍 Lab 301</p>
                    <p>Professor: Prof. Johnson</p>
                </div>
            </div>

            {/* Summary section */}
            <div className="summary" style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1, backgroundColor: "#1e90ff", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>Today's Classes</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>2</p>
                    <p>Classes scheduled for today</p>
                </div>
                <div style={{ flex: 1, backgroundColor: "#28a745", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>This Week</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>4</p>
                    <p>Total classes this week</p>
                </div>
                <div style={{ flex: 1, backgroundColor: "#a020f0", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>Attendance</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>92%</p>
                    <p>Average attendance rate</p>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
