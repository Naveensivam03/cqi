import React from 'react';

const CourseDetails = ({ course }) => {
    if (!course) return null;

    return (
        <div className="course-details">
            <div className="course-header">
                <h2>{course.course_title}</h2>
                <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{course.course_code}</span>
            </div>

            <div className="course-meta-grid">
                <div className="meta-item">
                    <span className="meta-label">Type</span>
                    <span className="meta-value">{course.course_type}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Semester</span>
                    <span className="meta-value">{course.semester}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Credits</span>
                    <span className="meta-value">{course.credits}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Hours</span>
                    <span className="meta-value">L:{course.hours.L} T:{course.hours.T} P:{course.hours.P}</span>
                </div>
            </div>

            {/* Mapping Matrix Table */}
            <div className="mapping-table-container card" style={{ marginTop: '2rem', overflowX: 'auto' }}>
                <h3 style={{ marginBottom: '1rem' }}>CO-PO & PSO Mapping Matrix</h3>
                <table className="aesthetic-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">COs</th>
                            <th colSpan="12">Program Outcomes (POs)</th>
                            <th colSpan="2">Program Specific Outcomes (PSOs)</th>
                        </tr>
                        <tr>
                            {[...Array(12)].map((_, i) => <th key={`po-${i}`}>PO{i + 1}</th>)}
                            {[...Array(2)].map((_, i) => <th key={`pso-${i}`}>PSO{i + 1}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {course.course_outcomes.map((co, index) => (
                            <tr key={index}>
                                <td className="co-header">{co.co_code}</td>
                                {/* POs 1-12 */}
                                {[...Array(12)].map((_, i) => {
                                    const poKey = `PO${i + 1}`;
                                    return <td key={poKey}>{co.po_mapping[poKey] || ''}</td>;
                                })}
                                {/* PSOs 1-2 */}
                                {[...Array(2)].map((_, i) => {
                                    const psoKey = `PSO${i + 1}`;
                                    return <td key={psoKey}>{co.pso_mapping[psoKey] || ''}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="outcomes-container">
                <h3>Course Outcomes (COs)</h3>
                <div className="outcomes-list">
                    {course.course_outcomes.map((co, index) => (
                        <div key={index} className="outcome-card">
                            <h4>{co.co_code}</h4>
                            <p>{co.description}</p>

                            <div className="mappings-group">
                                <div className="mappings-row">
                                    <span className="meta-label">PO Mapping</span>
                                    <div className="mapping-tags">
                                        {Object.entries(co.po_mapping).map(([key, val]) => (
                                            <span key={key} className="tag po">{key}: {val}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mappings-row" style={{ marginTop: '1rem' }}>
                                    <span className="meta-label">PSO Mapping</span>
                                    <div className="mapping-tags">
                                        {Object.entries(co.pso_mapping).map(([key, val]) => (
                                            <span key={key} className="tag pso">{key}: {val}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
