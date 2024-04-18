
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import {format} from 'date-fns'

const RenderBarChart = ({response} : {response : any[]}) => {

  const dataforChart = response.map((item : any , index) =>({
     name : ` ${format(item.createdAt, 'dd/MM')}`,
     CalsBurnt : item.caloriesBurnt ,
     calsIn : 200}))


  console.log(dataforChart);
  
  return(
  <BarChart width={600} height={200} data={dataforChart} className=''>
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