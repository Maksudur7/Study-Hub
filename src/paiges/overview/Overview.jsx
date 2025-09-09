import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Authintaction paige/AuthProvider';

const Overview = () => {
    const { logOut, user } = useContext(AuthContext);

    const [schedule, setSchedule] = useState([]);
    const [income, setIncome] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        // Fetch Classes
        fetch("https://study-plan-backend-beta.vercel.app/studentHub")
            .then(res => res.json())
            .then(data => setSchedule(data.filter(item => item.email === user.email)))
            .catch(err => console.error(err));

        // Fetch Budget
        fetch("https://study-plan-backend-beta.vercel.app/addTranslation")
            .then(res => res.json())
            .then(data => {
                const userData = data.filter(item => item.email === user.email);
                const totalIncome = userData
                    .filter(item => item.type === "income")
                    .reduce((sum, item) => sum + Number(item.amount), 0);
                setIncome(totalIncome);
            });

        // Fetch Tasks
        fetch("https://study-plan-backend-beta.vercel.app/addTask")
            .then(res => res.json())
            .then(data => setTasks(data.filter(item => item.email === user.email)));

        // Fetch Goals
        fetch("https://study-plan-backend-beta.vercel.app/addGole")
            .then(res => res.json())
            .then(data => setGoals(data.filter(item => item.email === user.email)));

        // Fetch Quizzes
        fetch("https://study-plan-backend-beta.vercel.app/quizData")
            .then(res => res.json())
            .then(data => setQuizzes(data.filter(item => item.email === user.email)));
    }, [user?.email]);

    return (
        <div className="p-6 mx-14 min-h-screen">

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard 
                    title="Total Classes This Week" 
                    value={schedule.length} 
                    color="blue-600" 
                    emoji="📅" 
                    progress={(schedule.length / 10) * 100} 
                />
                <StatCard 
                    title="Monthly Budget" 
                    value={`$${income}`} 
                    color="green-600" 
                    emoji="$" 
                    progress={(income / 1000) * 100} 
                />
                <StatCard 
                    title="Study Goals" 
                    value={`${tasks.length}/${goals.length}`} 
                    color="orange-600" 
                    emoji="🧠" 
                    progress={goals.length ? (tasks.length / goals.length) * 100 : 0} 
                />
                <StatCard 
                    title="Quiz Score" 
                    value={quizzes.length ? `${Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length)}%` : "0%"} 
                    color="purple-600" 
                    progress={quizzes.length ? (quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) : 0} 
                />
            </div>

            {/* Main Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <DynamicCard 
                    to="/schedule" 
                    bgColor="blue" 
                    title="Class Schedule" 
                    description="Track all your classes and never miss one again!" 
                    info={`${schedule.length} Classes Today`} 
                />
                <DynamicCard 
                    to="/budget" 
                    bgColor="green" 
                    title="Budget Tracker" 
                    description="Know exactly where your pocket money goes!" 
                    info={`$${income} This Month`} 
                />
                <DynamicCard 
                    to="/examQustion" 
                    bgColor="purple" 
                    title="Exam Q&A" 
                    description="Generate practice questions for better preparation!" 
                    info={`${quizzes.length} Subjects Ready`} 
                />
                <DynamicCard 
                    to="/studyPlan" 
                    bgColor="orange" 
                    title="Study Planner" 
                    description="Break big goals into manageable tasks!" 
                    info={`${tasks.length} Tasks Today`} 
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white mt-10 p-6 rounded-lg shadow">
                <h2 className="font-bold mb-4 pb-5">Quick Actions</h2>
                <div className="flex gap-4 flex-wrap">
                    <NavLink to='/schedule' className="bg-blue-500 text-white px-4 py-2 rounded-[10px]">Add New Class</NavLink>
                    <NavLink to='/budget' className="bg-green-500 text-white px-4 py-2 rounded-[10px]">Record Expense</NavLink>
                    <NavLink to='/examQustion' className="bg-purple-500 text-white px-4 py-2 rounded-[10px]">Generate Quiz</NavLink>
                    <NavLink to='/studyPlan' className="bg-orange-500 text-white px-4 py-2 rounded-[10px]">Add Study Goal</NavLink>
                    <button onClick={logOut} className="bg-black cursor-pointer text-white px-4 py-2 rounded-[10px]">Log Out</button>
                </div>
            </div>
        </div>
    );
};

// Reusable stat card
const StatCard = ({ title, value, color, emoji, progress }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">{title} <span>{emoji}</span></p>
        <p className={`text-2xl pt-5 pb-3 font-bold text-${color}`}>{value}</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

// Reusable dynamic card
const DynamicCard = ({ to, bgColor, title, description, info }) => (
    <NavLink to={to} className={`text-start p-6 rounded-lg text-white bg-${bgColor}-500`}>
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-sm pt-8 pb-3 mb-2">{description}</p>
        <span className={`bg-${bgColor}-700 px-3 py-1 rounded`}>{info}</span>
    </NavLink>
);

export default Overview;
