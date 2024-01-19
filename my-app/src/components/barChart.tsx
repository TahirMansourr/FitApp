import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const data = [
{name: 'day 1', cals: 350, pv: 2400, amt: 2400},
{name: 'day 2', cals: 100, pv: 2400, amt: 2400},
{name: 'day 3', cals: 200, pv: 2400, amt: 2400},
{name: 'day 4', cals: 300, pv: 2400, amt: 2400},
];

const RenderBarChart = () => (
  <BarChart width={600} height={200} data={data} className=''>
    <XAxis dataKey="name" stroke="#607274" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    {/* <Legend width={100} wrapperStyle={{ top: 0, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> 
     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
    <Bar dataKey="cals" fill="#607274" barSize={40} />
  </BarChart>
);

export default RenderBarChart;