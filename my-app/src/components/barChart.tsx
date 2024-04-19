
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import {format} from 'date-fns'

const RenderBarChart = ({
  response , groupedmeals
} : {
  response : Map<Date , number> ,
  groupedmeals : Map<Date , number>
}) => {

  const dataforChart =Array.from(response ,([date , calories]) => ({
    name: format(date, 'dd/MM'),
    CalsBurnt: calories,
  }));

const dataFromGroupedMeals = Array.from(groupedmeals, ([date, calories]) => ({
    name: format(date, 'dd/MM'),
    calsIn: calories,
}));

// Merge data for matching dates
const mergedDataMap = new Map();

// Merge data from dataforChart
dataforChart.forEach(({ name, CalsBurnt }) => {
    const date = name
    if (mergedDataMap.has(date)) {
        // Date already exists, merge the calories
        const existingData = mergedDataMap.get(date);
        mergedDataMap.set(date, { ...existingData, CalsBurnt });
    } else {
        // Date doesn't exist, add a new entry
        mergedDataMap.set(date, { name, CalsBurnt });
    }
});

// Merge data from dataFromGroupedMeals
dataFromGroupedMeals.forEach(({ name, calsIn }) => {
    const date = name // Extract day from the name
    if (mergedDataMap.has(date)) {
        // Date already exists, merge the calories
        const existingData = mergedDataMap.get(date);
        mergedDataMap.set(date, { ...existingData, calsIn });
    } else {
        // Date doesn't exist, add a new entry
        mergedDataMap.set(date, { name, calsIn });
    }
});

// Convert merged map to array
const mergedDataArray = Array.from(mergedDataMap.values()).reverse();

console.log(mergedDataArray);
  
  // const realdata  = [...dataforChart , ...dataFromGroupedMeals]
  // console.log(dataforChart);
  
  return(
  <BarChart width={600} height={200} data={mergedDataArray} className=''>
    <XAxis dataKey="name" stroke="white" />
    <YAxis stroke='white' />
    <Tooltip wrapperStyle={{ width: 150, backgroundColor: 'blue', color : 'red' }} />
    {/* <Legend width={100} wrapperStyle={{ top: 0, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> 
     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
    <Bar dataKey="calsIn" fill="red" barSize={30} radius={[5, 5, 0, 0]} />
    <Bar dataKey="CalsBurnt" fill="green" barSize={20} radius={[5, 5, 0, 0]} />
  </BarChart>)
};

export default RenderBarChart;