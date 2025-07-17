import React, { useEffect, useState } from 'react';
import DiagramEditor from './components/DiagramEditor';
import { Canvas } from '@react-three/fiber'
import Diagram3D from './components/Diagram3D';
import RadialSlider from './components/RadialSlider';
import { Input, Select } from 'antd';
import RadialRechart from './components/RadialRechart';
// import { label } from 'three/tsl';

const diagramOptions = [
      {"frequency": 63,    "value": -6},
      {"frequency": 125,   "value": -4},
      {"frequency": 250,   "value": -2},
      {"frequency": 500,   "value": -1},
      {"frequency": 1000,  "value":  0},
      {"frequency": 2000,  "value": +1},
      {"frequency": 4000,  "value": -2},
      {"frequency": 8000,  "value": -5},
      {"frequency": 16000, "value": -9}
];

const EmitterEditorPage = (props) => {

    const [vertDiagramAngle, setVertDiagramAngle] = useState(90);
    const [minDiagramValue, setMinDiagramValue] = useState(-18);
    const [maxDiagramValue, setMaxDiagramValue] = useState(6);
    const [stepAccuracy, setstepAccuracy] = useState(1);

    const [horizontalPattern, setHorizontalPattern] = useState([]);

    const [selectedFrequency, setSelectedFrequency] = useState(1000);


    // useEffect(() => {
    //   console.log('hori', horizontalPattern)
    // }, [horizontalPattern]);

const [diagramData, setDiagramData] = useState([
    0,-0.1,-0.5,-1.1,-2,-2,-2,-3.3,-4.4,-6,
    -7.3,-9.5,-13.6,-15.5,-15.5,-17.9,-18.1,-19.4,-19.9,-19.4,
    -18.1,-17.9,-15.5,-15.5,-13.6,-9.5,-7.3,-6,-4.4,-3.3,
    -2,-2,-2,-1.1,-0.5,-0.1
  ])

  return (
    <div className={'spf-page-body'}>
      <div className={'sp-mw-1600'}>


    <div className={'sp-section'}>
      <div className={'sp-pa-12'}>
        <Input value={"HELLO"} ></Input>
      </div>
      <div className={'sp-pa-12'}>
        <Select value={selectedFrequency} 
          options={diagramOptions.map((item) => ({ value: item.frequency, label: item.frequency + ' Hz'}))}
          onChange={setSelectedFrequency}
        ></Select>
      </div>
    </div>

    <div className={'sp-section'}>
      <div className={'sp-pa-12'}>
        <div className={'col-3-3-1'}>
            <RadialSlider
              label={`Vertical pattern`}
              data={diagramData}
              onChange={setHorizontalPattern}
            />
        </div>
      </div>
    </div>

    <div className={'sp-section'}>
      <div className={'sp-pa-12'}>
        <div className={'col-3-3-1'}>
            <RadialSlider
              label={`Horizontal pattern`}
              data={diagramData}
              onChange={setHorizontalPattern}
            />
        </div>
      </div>
    </div>


    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        {/* <DiagramEditor data={diagramData} onDataChange={setDiagramData} /> */}

      </div>

      <div>
        {/* <Input type="range" min={-180} max={180} value={vertDiagramAngle} step={90} onChange={(ev)=>{setVertDiagramAngle(ev.target.value)}} />
        <Input type="number" min={-180} max={-18} step={6} value={minDiagramValue} onChange={(ev)=>{setMinDiagramValue(ev.target.value)}} />
        <Input type="number" min={0} max={36} step={6} value={maxDiagramValue} onChange={(ev)=>{setMaxDiagramValue(ev.target.value)}} />
        <Input type="number" min={0.01} max={1} step={0.01} value={stepAccuracy} onChange={(ev)=>{setstepAccuracy(ev.target.value)}} /> */}
      {/* <RadialRechart values={horizontalPattern} /> */}
      </div>

    </div>


      </div>
    </div>
  );
};

export default EmitterEditorPage;