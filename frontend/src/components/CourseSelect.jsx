import React from 'react';

const CourseSelect = ({ label, options, value, onChange, disabled }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select value={value} onChange={onChange} disabled={disabled}>
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.code}>
                        {option.code} - {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CourseSelect;
