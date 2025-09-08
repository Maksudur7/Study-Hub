import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authintaction paige/AuthProvider';

const colors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-orange-500",
    "from-purple-400 to-purple-600",
    "from-red-400 to-red-600"
];

const Schedule = () => {
    const [classes, setClasses] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [selectedDay, setSelectedDay] = useState("today");
    const { user } = useContext(AuthContext)


    const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });


    useEffect(() => {
        fetch("https://study-plan-backend-beta.vercel.app/studentHub")
            .then(res => res.json())
            .then(data => {
                const emailAuth = data.filter(valure => valure?.email === user?.email)
                console.log(emailAuth);
                setAllClasses(emailAuth);
            })
            .catch(err => console.error("Error fetching classes:", err));
    }, [user]);

    const [todayClass, setTodayClass] = useState('')
    useEffect(() => {
        let filteredClasses = allClasses;


        const now = new Date();
        filteredClasses = filteredClasses.filter(cls => {
            if (!cls.createdAt) return true;
            const diff = (now - new Date(cls.createdAt)) / (1000 * 60 * 60 * 24);
            return diff < 7;
        });

        if (selectedDay === "all") {
            setClasses(filteredClasses);
        } else if (selectedDay === "today") {
            setClasses(filteredClasses.filter(cls => cls.day === todayName));
            setTodayClass(filteredClasses.filter(cls => cls.day === todayName));
        } else {
            setClasses(filteredClasses.filter(cls => cls.day === selectedDay));
        }
    }, [selectedDay, allClasses, todayName]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const className = e.target.className.value;
        const day = e.target.day.value;
        const time = e.target.time.value;
        const location = e.target.location.value;
        const professor = e.target.professor.value;
        const email = user?.email

        const newClass = {
            className,
            email,
            day,
            time,
            location,
            professor,
            createdAt: new Date()
        };

        try {
            const res = await fetch("https://study-plan-backend-beta.vercel.app/studentHub", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newClass)
            });

            if (res.ok) {
                Swal.fire("Success", "Class added successfully!", "success");
                toast.success("Class added successfully!");


                const updated = await res.json();
                setAllClasses(prev => [...prev, updated]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding class");
        }
    };


    const handleClick = () => {
        toast.info(
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Add New Class</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="className" className="block text-sm font-medium text-gray-700">Class Name</label>
                        <input type="text" id="className" name='className' className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="e.g., Mathematics" />
                    </div>

                    <div className='flex place-content-between'>
                        <div className="mt-4">
                            <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
                            <select id="day" name='day' className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option value="">Select day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input type="time" id="time" name='time' className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" name='location' className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="Room 201" />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="professor" className="block text-sm font-medium text-gray-700">Professor</label>
                        <input type="text" id="professor" name='professor' className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="Dr. Smith" />
                    </div>

                    <div className="mt-6 text-center">
                        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Add Class
                        </button>
                    </div>
                </form>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
            }
        );
    };

    const tabs = [
        { name: "Today", value: "today" },
        { name: "All Classes", value: "all" },
        { name: "Sunday", value: "Sunday" },
        { name: "Monday", value: "Monday" },
        { name: "Tuesday", value: "Tuesday" },
        { name: "Wednesday", value: "Wednesday" },
        { name: "Thursday", value: "Thursday" },
    ];


    return (
        <div className="app-container mx-14" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <header className=' mb-10'>
                <h1 className='text-4xl mb-5'>📅 <strong>Class Schedule Tracker</strong></h1>
                <p className='text-gray-500'>Never miss a class again! 📚</p>
                <button
                    className='-mt-20'
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

            <ToastContainer />

            {/* Tabs */}
            <div className="bg-white p-4 inline-flex rounded-lg shadow-lg  mb-8">
                <div className="flex border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setSelectedDay(tab.value)}
                            className={`py-2 px-4 text-sm font-medium rounded-full 
                ${selectedDay === tab.value ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'} 
                focus:outline-none`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Class Cards */}
            {classes.length === 0 ? (
                <div className=" flex bg-white    rounded-lg shadow-lg  text-center h-40 w-full mb-8 justify-center items-center p-10">
                    <div className="">
                        <h2 className="text-3xl font-bold text-purple-700">
                            Hurra! There are no classes today 🎉
                        </h2>
                    </div>

                </div>
            ) : (
                classes.map((cls, index) => (
                    <div
                        key={cls._id}
                        className="class-card flex bg-white"
                        style={{
                            padding: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <div className="items-start mr-5 inline-flex">
                            <div
                                className={`w-1 h-20 rounded-full bg-gradient-to-b ${colors[index % colors.length]
                                    }`}
                            ></div>
                        </div>
                        <div>
                            <h3 style={{ color: "#1e90ff" }}>
                                <span className="font-bold text-2xl">{cls.className}</span>
                                <span
                                    className="border-1 ml-5 border-black"
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        padding: "2px 6px",
                                        borderRadius: "4px"
                                    }}
                                >
                                    {cls.day}
                                </span>
                            </h3>
                            <p className="py-5">🕒 {cls.time} | 📍 {cls.location}</p>
                            <p>Professor: {cls.professor}</p>
                        </div>
                    </div>
                ))
            )}


            <div className="summary" style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1, backgroundColor: "#1e90ff", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>Today's Classes</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>{todayClass.length}</p>
                    <p>Classes scheduled for today</p>
                </div>
                <div style={{ flex: 1, backgroundColor: "#28a745", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>This Week</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>{allClasses.length}</p>
                    <p>Total classes this week</p>
                </div>
                <div style={{ flex: 1, backgroundColor: "#a020f0", color: "#fff", padding: "20px", borderRadius: "10px" }}>
                    <h4>Attendance</h4>
                    <p className='pt-8 pb-3' style={{ fontSize: "24px", fontWeight: "bold" }}>92%</p>
                    <p>Average attendance rate</p>
                </div>
            </div>
        </div >
    );
};

export default Schedule;
