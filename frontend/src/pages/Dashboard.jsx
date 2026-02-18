import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseSelect from '../components/CourseSelect';
import CourseDetails from '../components/CourseDetails';
import PassPercentageChart from '../components/PassPercentageChart';
import { fetchCourseStructure, fetchCourseDetails } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Data State
    const [courseData, setCourseData] = useState({});
    const [loading, setLoading] = useState(true);

    // Selection State
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedRegulation, setSelectedRegulation] = useState('2021');
    const [selectedBatch, setSelectedBatch] = useState('2021-2025'); // Default Batch
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCourseCode, setSelectedCourseCode] = useState(''); // Store Code now
    const [courseDetails, setCourseDetails] = useState(null);

    const departmentOptions = [
        { value: 'it', label: 'Information Technology' },
        { value: 'cse', label: 'Computer Science and Engineering (CSE)' }
    ];

    const regulationOptions = ['2021', '2024', '2025'];
    const batchOptions = ['2021-2025', '2022-2026', '2023-2027'];

    // Dynamic branch options based on Department
    const getBranchOptions = () => {
        if (selectedDepartment === 'it') {
            return [
                { value: 'btech_it', label: 'B.Tech IT' },
                { value: 'mtech_it', label: 'M.Tech IT' }
            ];
        } else if (selectedDepartment === 'cse') {
            return [
                { value: 'be_cse', label: 'BE CSE' }
            ];
        } else {
            return [];
        }
    };

    const typeOptions = [
        { value: 'theory', label: 'Theory' },
        { value: 'tcp', label: 'TCP' },
        { value: 'project', label: 'Project' },
        { value: 'lab', label: 'Lab' }
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        setUser(JSON.parse(storedUser));
        const loadData = async () => {
            const data = await fetchCourseStructure();
            setCourseData(data);
            setLoading(false);
        };
        loadData();
    }, [navigate]);

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
        setSelectedBranch(''); // Reset Programme
        setSelectedType('');
        setSelectedCourseCode('');
        setCourseDetails(null);
    };

    const handleRegulationChange = (e) => {
        setSelectedRegulation(e.target.value);
        // Persist Batch
    };

    const handleBatchChange = (e) => {
        setSelectedBatch(e.target.value);
        // Persist Other Selections
    };

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
        setSelectedType('');
        setSelectedCourseCode('');
        setCourseDetails(null);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedCourseCode('');
        setCourseDetails(null);
    };

    const handleCourseChange = async (e) => {
        const code = e.target.value;
        setSelectedCourseCode(code);

        if (code) {
            // Find the course object from the available courses
            const availableCourses = getAvailableCourses();
            const selectedCourseObj = availableCourses.find(c => c.code === code);

            if (selectedCourseObj && selectedCourseObj.file) {
                const details = await fetchCourseDetails(selectedCourseObj.file);
                if (details && details.course) {
                    setCourseDetails(details.course);
                }
            } else {
                setCourseDetails(null);
            }
        } else {
            setCourseDetails(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const getAvailableCourses = () => {
        if (selectedRegulation !== '2021') return [];
        if (selectedBranch && selectedType && courseData[selectedType] && courseData[selectedType][selectedBranch]) {
            return courseData[selectedType][selectedBranch];
        }
        return [];
    };

    if (loading) return <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span>🎓 Course Select</span>
                    </div>
                </div>

                <div className="user-profile">
                    <div className="avatar-circle">
                        {user?.username?.[0]?.toUpperCase() || 'T'}
                    </div>
                    <div className="user-info">
                        <h4>{user?.username || 'Teacher'}</h4>
                        <span>{user?.username === 'admin' ? 'Administrator' : 'Faculty Member'}</span>
                    </div>
                </div>

                <nav className="nav-links">
                    <div className="nav-item active">
                        <span>Dashboard</span>
                    </div>
                    <div className="nav-item">
                        <span>My Courses</span>
                    </div>
                    <div className="nav-item">
                        <span>Settings</span>
                    </div>
                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-scrollable">
                    <h1 className="page-title">Course Selection</h1>



                    <div className="card">
                        <div className="filters-grid">
                            {/* 1. Department */}
                            <div className="form-group">
                                <label>Department</label>
                                <select value={selectedDepartment} onChange={handleDepartmentChange}>
                                    <option value="">Select Department</option>
                                    {departmentOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 2. Programme */}
                            <div className="form-group">
                                <label>Programme</label>
                                <select value={selectedBranch} onChange={handleBranchChange} disabled={!selectedDepartment}>
                                    <option value="">Select Programme</option>
                                    {getBranchOptions().map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 3. Regulation */}
                            <div className="form-group">
                                <label>Regulation</label>
                                <select value={selectedRegulation} onChange={handleRegulationChange}>
                                    {regulationOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 4. Batch */}
                            <div className="form-group">
                                <label>Batch</label>
                                <select value={selectedBatch} onChange={handleBatchChange}>
                                    {batchOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 5. Type */}
                            <div className="form-group">
                                <label> Course Type</label>
                                <select value={selectedType} onChange={handleTypeChange} disabled={!selectedBranch}>
                                    <option value="">Select course Type</option>
                                    {typeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* 6. Course */}
                            <CourseSelect
                                label="Course"
                                options={getAvailableCourses()}
                                value={selectedCourseCode}
                                onChange={handleCourseChange}
                                disabled={!selectedType || getAvailableCourses().length === 0}
                            />
                        </div>
                    </div>

                    {/* Pass Percentage Stats - Show only after course selection */}
                    {selectedCourseCode && (
                        <>
                            <div className="stats-grid" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                                {[
                                    { batch: '2021-2025', percentage: '75.3%' },
                                    { batch: '2022-2026', percentage: '77.29%' },
                                    { batch: '2023-2027', percentage: '75.24%' }
                                ].filter(stat => stat.batch === selectedBatch).map((stat) => (
                                    <div key={stat.batch} className="card" style={{ textAlign: 'center', padding: '1.5rem', maxWidth: '300px' }}>
                                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.batch}</h3>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>{stat.percentage}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Pass Percentage</div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Section */}
                            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Batch Performance Trend</h3>
                                <PassPercentageChart
                                    data={[
                                        { batch: '2021-2025', percentage: 75.3 },
                                        { batch: '2022-2026', percentage: 77.29 },
                                        { batch: '2023-2027', percentage: 75.24 }
                                    ]}
                                    selectedBatch={selectedBatch}
                                />
                            </div>
                        </>
                    )}

                    <div className={`results-section ${!selectedCourseCode ? 'hidden' : ''}`} style={{ marginTop: '2rem' }}>
                        {courseDetails ? (
                            <CourseDetails course={courseDetails} />
                        ) : (
                            selectedCourseCode && (
                                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                    <p>No detailed summary available for this course.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main >
        </div >
    );
};

export default Dashboard;
