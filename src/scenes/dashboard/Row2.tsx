import { useGetKPIsQuery, useGetProductsQuery } from "@/state/api"
import DashboardBox from "./DashboardBox"
import BoxHeader from "@/components/BoxHeader";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import FlexBetween from "@/components/FlexBetween";


const pieData = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300}

]


const Row2 = () => {
  const {palette} = useTheme();
  const pieColors = [palette.primary[800],palette.primary[300]]
  const {data:operationalData}= useGetKPIsQuery();

  const {data:productData}= useGetProductsQuery();

  console.log("data:",productData)

  const operationalExpenses = useMemo(() => { 
    return (
      operationalData && 
      operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses})=>{
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses
        }
      })
    )
  },[operationalData])

  return (
    <>
     <DashboardBox gridArea="d" >
     <BoxHeader 
      title='Operational Vs Non Operational Expenses'
      subtitle='top line is Operational, bottom line is Non Operational'
      sideText='+4%'/>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          width={500}
          height={400}
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical={false}
           stroke={palette.grey[800]} />
          <XAxis dataKey="name" 
          tickLine={false} 
          style={{fontSize: "10px"}} />
          <YAxis  
          yAxisId='left'
          orientation="left"
          tickLine={false} 
          axisLine={false}
          style={{fontSize: "10px"}} />
           <YAxis  
          yAxisId='right'
          orientation='right'
          tickLine={false} 
          axisLine={false}
          style={{fontSize: "10px"}} />
          <Tooltip />
      
          <Line
          yAxisId='left'
          type="monotone"
          dataKey="Non Operational Expenses"
          stroke={palette.secondary.main} />
          <Line 
          yAxisId='right'
          type="monotone"
          dataKey="Operational Expenses"
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
     </DashboardBox>
     <DashboardBox gridArea="e" >
     <BoxHeader 
      title='Campaigns and targets'
      sideText='+4%'/>
      <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
     <PieChart 
     width={110} 
     height={100} 
     margin={{
      top: 0,
      right: -10,
      left: 10,
      bottom: 0,
    }}
     >
        <Pie
        stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`}
             fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
        <Typography variant="h5">
            target sales
        </Typography>
            <Typography
            m="0.3rem 0" 
            color={palette.primary[500]} 
            variant="h3">
              83
              </Typography>
              <Typography variant="h6">
              Goal Of the Campaign
              </Typography>
      </Box>
      <Box flexBasis='40%'>
        <Typography variant="h5">
            Losses in revenue
        </Typography>
            <Typography 
            variant="h6">
              Losses are down 25%
              </Typography>
              <Typography mt='0.4rem' variant="h5">
              Profit Margins
              </Typography>
              <Typography variant="h6">
              Margins are up by 20% from last month
              </Typography>
      </Box>
      </FlexBetween>
     </DashboardBox>
     <DashboardBox gridArea="f" >
     {/* <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer> */}
     </DashboardBox>
    </>
  )
}

export default Row2