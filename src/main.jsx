import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Overview from './paiges/overview/Overview.jsx';
import Schedule from './paiges/Schedule/Schedule.jsx';
import Budget from './paiges/budget/Budget.jsx';
import ExamQustion from './paiges/examQustion/ExamQustion.jsx';
import StudyPlan from './paiges/StudyPlan/StudyPlan.jsx';
import TabOverview from './paiges/budget/Tabs/TabOverview.jsx';
import TabCategories from './paiges/budget/Tabs/TabCategories.jsx';
import Transection from './paiges/budget/Tabs/Transection.jsx';
import Subjects from './paiges/examQustion/ExamRouts/Subjects.jsx';
import Quiz from './paiges/examQustion/ExamRouts/Quiz.jsx';
import History from './paiges/examQustion/ExamRouts/History.jsx';
import Question from './paiges/examQustion/ExamRouts/Question.jsx';
import SignIn from './paiges/Authintaction paige/SignIn.jsx';
import SignUP from './paiges/Authintaction paige/SignUP.jsx';
import AuthProvider from './paiges/Authintaction paige/AuthProvider.jsx';
import TodayTask from './paiges/StudyPlan/Today\'s Task/TodayTask.jsx';
import OverDue from './paiges/StudyPlan/Today\'s Task/OverDue/OverDue.jsx';
import ActiveGole from './paiges/StudyPlan/Active Gole/ActiveGole.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Overview></Overview>
      },
      {
        path: "/schedule",
        element: <Schedule></Schedule>
      },
      {
        path: '/budget',
        element: <Budget></Budget>,
        children: [
          {
            path: '/budget',
            element: <TabOverview></TabOverview>
          },
          {
            path: '/budget/catagoris',
            element: <TabCategories></TabCategories>
          },
          {
            path: '/budget/tranction',
            element: <Transection></Transection>
          }
        ]
      },
      {
        path: '/examQustion',
        element: <ExamQustion></ExamQustion>,
        children: [
          {
            path: '/examQustion',
            element: <Subjects></Subjects>
          },
          {
            path: '/examQustion/quiz',
            element: <Quiz></Quiz>
          },
          {
            path: '/examQustion/history',
            element: <History></History>
          },
          {
            path: '/examQustion/qustion',
            element: <Question></Question>
          }
        ]
      },
      {
        path: '/studyPlan',
        element: <StudyPlan></StudyPlan>,
        children:[
          {
            path: '/studyPlan',
            element: <TodayTask></TodayTask>
          },
          {
            path: '/studyPlan/overDue',
            element: <OverDue></OverDue>
          },
          {
            path: '/studyPlan/activeGole',
            element: <ActiveGole></ActiveGole>
          }
        ]
      },

    ]
  },
  {
    path: '/signin',
    element: <SignIn></SignIn>
  },
  {
    path: '/signup',
    element: <SignUP></SignUP>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
