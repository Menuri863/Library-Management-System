import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './admindashboard.css';
import AddBook from './addbook';
import MemberDirectory from './memberdirectory';
import StaffAdminDirectory from './staffadmindirectory';
import UpdateDeleteBook from './updatedeletebook';
import AddCategory from './addcategory';
import UpdateDeleteCategory from './updatedeletecategory';
import Fines from './fines';
import Reports from './reports';
import IssueBook from './issuebook';
import ReturnBook from './returnbook';
import Reservations from './reservations';
import ContactUsMessage from './contactusmessage';
import GenerateReport from './generatereport';
import ReportDetails from './reportDetail';
// Chart.js components register කිරීම
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = ({ defaultTab = "home" }) => {

    const [activeTab, setActiveTab] = useState( defaultTab);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [dashboardData, setDashboardData] = useState({
    total_books: 0,
    total_members: 0,
    active_reservations: 0,
    reservation_chart: []

});
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = localStorage.getItem("role");
   
    


    

    const getStaffImage = () => {

    if(userRole === "staff") {

        if(user?.gender === "Male"){
            return "/Male-staff.png";
        }

        if(user?.gender === "Female"){
            return "/Female-staff.png";
        }
    }

    return "/Admin-Profile-Picture.avif";
};

    
    const changeTab = (tab) => {
        setActiveTab(tab);
        localStorage.setItem("adminTab", tab);
    };

useEffect(() => {

    if(location.state?.openTab){

        changeTab(location.state.openTab);

    }

    if(location.state?.reportId){

        setSelectedReportId(location.state.reportId);

    }

}, [location]);
useEffect(() => {

    axios.get("http://localhost:8000/api/dashboard-stats")
    .then((res) => {
        console.log(res.data);
        setDashboardData(res.data);
    })
    .catch((error) => {
        console.log(error);
    });

}, []);

   

    const handleLogout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userToken');

    navigate('/', { replace: true });

};
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    // ප්‍රස්තාරය සඳහා දත්ත
   const chartValues = Array(12).fill(0);

dashboardData.reservation_chart.forEach(item => {
    chartValues[item.month - 1] = item.total;
});


const chartData = {

labels:[
'Jan','Feb','Mar','Apr',
'May','Jun','Jul','Aug',
'Sep','Oct','Nov','Dec'
],

datasets:[{

label:'Reservation Statistics',

data: chartValues,

borderColor:'#3498db',

backgroundColor:'rgba(52,152,219,0.2)',

tension:0.4

}]

};

    return (
        <div className="admin-page-wrapper">
            {/* Top Navbar */}
            <nav className="top-navbar">
    <span className="welcome-text">{userRole === "admin" ? "Welcome to Admin Panel" : `Welcome, ${user?.name}`}</span>

    <span className="library-name">Veyangoda Public Library</span>

    <button className="logout-btn" onClick={handleLogout}>
        Logout
    </button>
</nav>

            <div className="admin-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="profile-section">
                        <img 
  src={getStaffImage()}
  alt="Profile"
  className="profile-img"
/>
                        <h3>{userRole === "admin" ? "Admin" : user?.name}</h3>

                        <div className="management-title">

                        </div>
                    </div>
                    
                    <div className={`menu-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => changeTab('home')}>Home</div>
                    
                    <div className="menu-item" onClick={() => toggleDropdown('books')}>Books ▾</div>
                    {openDropdown === 'books' && (
                        <div className="submenu">
                            <div className="submenu-item" onClick={() => changeTab('add-book')}>Add Book</div>
                            <div className="submenu-item" onClick={() => changeTab('update-delete-book')}>Update & Delete Book</div>
                        </div>
                    )}

                    <div className="menu-item" onClick={() => toggleDropdown('category')}>Category ▾</div>
                    {openDropdown === 'category' && (
                        <div className="submenu">
                            <div className="submenu-item" onClick={() => changeTab('add-category')}>Add Category</div>
                            <div className="submenu-item" onClick={() => changeTab('update-delete-category')}>Update & Delete Category</div>
                        </div>
                    )}

                    
                    <div className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => changeTab('reports')}>Reports</div>
                    <div className={`menu-item ${activeTab === 'reservations' ? 'active': ''}`} onClick={() => changeTab('reservations')}>Reservations</div>
                    <div 
 className={`menu-item ${activeTab === 'contactus-messages' ? 'active' : ''}`}
 onClick={() => changeTab('contactus-messages')}
>
    ContactUs Message
</div>
                {userRole === "admin" && (
                        <div className={`menu-item ${activeTab === 'members' ? 'active' : ''}`}onClick={() => changeTab(`members`)}> Members Directory</div>
                
)}
{userRole === "admin" && (
    <div 
      className={`menu-item ${activeTab === 'staff-admin' ? 'active' : ''}`}
      onClick={() => changeTab('staff-admin')}
    >
      Staff & Admin Directory
    </div>
                )}
                    
                    <div className="menu-item" onClick={() => toggleDropdown('transactions')}>Transactions ▾</div>
                    {openDropdown === 'transactions' && (
                    <div className="submenu">
                    <div className="submenu-item" onClick={() => changeTab('issue-book')}>Issue Book</div>
                    <div className="submenu-item" onClick={() => changeTab('return-book')}>Return Book</div>
                    <div className="submenu-item" onClick={() => changeTab('fines')}>Fines</div>
                    </div>
                    
                    )}
                </div>

                {/* Main Content */}
                   {/* Main Content */}
<div className="main-content">

    <div key={activeTab} className="page-content">

        {/* Home Tab */}
        {activeTab === 'home' && (
            <div>
                <h1>Overview System Analytics</h1>

                <div className="analytics-cards">

                    <div className="card">
                        Total Books
                        <p>{dashboardData.total_books}</p>
                    </div>

                    <div className="card">
                        Active Reservations
                        <p>{dashboardData.active_reservations}</p>
                    </div>

                    <div className="card">
                        Registered Members
                        <p>{dashboardData.total_members}</p>
                    </div>

                </div>

                <div className="chart-container">
                    <h3>Reservation Statistics</h3>
                    <Line data={chartData} />
                </div>
            </div>
        )}


        {activeTab === 'add-book' && <AddBook />}

        {userRole === "admin" && activeTab === 'members' && (
            <MemberDirectory />
        )}

        {userRole === "admin" && activeTab === 'staff-admin' && (
            <StaffAdminDirectory />
        )}

        {activeTab === 'update-delete-book' && <UpdateDeleteBook />}

        {activeTab === 'add-category' && <AddCategory />}

        {activeTab === 'update-delete-category' && <UpdateDeleteCategory />}

        {activeTab === 'fines' && <Fines />}

        {activeTab === 'reports' && <Reports />}

        {activeTab === 'issue-book' && <IssueBook />}

        {activeTab === 'return-book' && <ReturnBook />}

        {activeTab === 'reservations' && <Reservations />}

        {activeTab === 'contactus-messages' && (
            <ContactUsMessage />
        )}
        {activeTab === 'generate-report' && (
            <GenerateReport />
        )}   
        
{activeTab === 'report-details' && (
    <ReportDetails reportId={selectedReportId} />
)}
        
        </div>
     </div> {/* main-content අවසානය */}
            </div> {/* admin-container අවසානය */}
        </div> /*admin-page-wrapper අවසානය*/
    );
}; // Component එක අවසානය

export default AdminDashboard;