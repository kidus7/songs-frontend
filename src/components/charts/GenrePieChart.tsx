/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { GenreStat } from 'models/song'; // Ensure the path is correct

// COLORS array for the pie chart sectors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#b30bff'];

// Custom active shape renderer

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Songs ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`(Rate ${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

interface GenrePieChartProps {
  data: GenreStat[];
}

const GenrePieChart: React.FC<GenrePieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = data.map(genre => ({
    name: genre._id,
    value: genre.totalSongs,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={(data, index) => setActiveIndex(index)}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenrePieChart;
