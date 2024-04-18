
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import {format} from 'date-fns'

const RenderBarChart = ({response , groupedmeals} : {response : any[] , groupedmeals : Map<Date , number>}) => {

  

  const dataforChart = response.map((item: any) => ({
    name: ` ${format(item.createdAt, 'dd/MM')}`,
    CalsBurnt: item.caloriesBurnt,
}));

const dataFromGroupedMeals = Array.from(groupedmeals, ([date, calories]) => ({
    name: format(date, 'dd/MM'),
    calsIn: calories,
}));

// Merge data for matching dates
const mergedData: { name: string; CalsBurnt?: number; calsIn?: number }[] = [];

dataforChart.forEach((responseItem) => {
    const matchingGroupedMeal = dataFromGroupedMeals.find((groupedMealItem) => groupedMealItem.name === responseItem.name);
    if (matchingGroupedMeal) {
        mergedData.push({ ...responseItem, ...matchingGroupedMeal });
    } else {
        mergedData.push(responseItem);
    }
});

dataFromGroupedMeals.forEach((groupedMealItem) => {
    const matchingResponse = dataforChart.find((responseItem) => responseItem.name === groupedMealItem.name);
    if (!matchingResponse) {
        mergedData.push(groupedMealItem);
    }
});

console.log(mergedData);

  
  // const realdata  = [...dataforChart , ...dataFromGroupedMeals]
  // console.log(dataforChart);
  
  return(
  <BarChart width={600} height={200} data={mergedData} className=''>
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