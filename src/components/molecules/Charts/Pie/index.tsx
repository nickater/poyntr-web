import { FC } from 'react';
import { Cell, PieChart as LibPieChart, Pie, PieLabel } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}`}
    </text>
  );
};

type PieChartProps = {
  votes: Record<string, number>
}
export const PieChart: FC<PieChartProps> = ({ votes }) => {
  return (
    <LibPieChart width={200} height={200}>
      <Pie
        data={Object.entries(votes).map(([key, value]) => ({ name: key, value }))}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}

        fill="#8884d8"
        dataKey="value"
      >
        {Object.entries(votes).map(([key, value], index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </LibPieChart>
  );
}
