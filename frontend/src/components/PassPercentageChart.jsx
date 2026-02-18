import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PassPercentageChart = ({ data, selectedBatch }) => {
    // Determine bar color based on selection
    const getBarColor = (entry) => {
        if (selectedBatch && entry.batch === selectedBatch) {
            return '#0071e3'; // Selected color (Primary Blue)
        }
        return '#d2d2d7'; // Unselected color (Gray)
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis
                        dataKey="batch"
                        tick={{ fill: '#86868b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: '#86868b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '0.9rem'
                        }}
                    />
                    <Bar dataKey="percentage" radius={[8, 8, 0, 0]} barSize={50}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PassPercentageChart;
