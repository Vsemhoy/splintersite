import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px'
      }}>
        <p><strong>{payload[0].name}:</strong> <span>{payload[0].value}</span></p>
        <p><strong>Угол:</strong> {label}</p>
      </div>
    );
  }

  return null;
};

 const RadialRechart = (props) => {

    const [data, setData] = useState([{ angle: '0°', value: 0 }]);

    useEffect(() => {
      if (props.values.length){
        setData(props.values.map((item, index)=>(
            {angle: `${index * 10}°`, value: item }
        )))
    }
    console.log('props', props)
    }, [props.values]);

  return (
    <RadarChart outerRadius={190} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="angle" />
      <PolarRadiusAxis domain={[-30, 6]} />
      <Radar name="Pattern" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  );
}

export default RadialRechart;