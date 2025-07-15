import React, { useEffect, useRef, useState } from 'react';
import './style/radialslider.css';
import { rotate } from 'three/tsl';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

/**
 * Orientation horizontal - speaker looks from left to right,
 * vertical - from top to bottom
 */
export const ORIENTATION = {
  'vertical' : 1,
  'horizontal' : 2,
  'VERTICAL' : 1,
  'HORIZONTAL' : 2,
};

function RadialSlider({ onChange, sourceData, min=-36, max=6, rotation=90, step=1  }) {
  const containerRef = useRef(null);
  const [data, setData] = useState(Array(36).fill(0));
  
    const [countData, setCountData] = useState([]);


    useEffect(() => {
      calculatePositions();
    }, [rotation, min, max, step]);

    const handleDataChange = (index, value) => {
        console.log('deg, value', index, value);
            const newData = [...data];
            newData[index] = parseFloat(value);
            // onDataChange(newData);
            setData(newData);
    }

    const setFromTextarea = (val)=>{
        console.log('val', val.target.value)
        if (val.target.value){
            let arr = JSON.parse(val.target.value);
            if (arr.length == 36){
                setData(arr);
            }

        }
    }

    useEffect(() => {
      if (onChange){
        onChange(data);
      }
    }, [data]);


  const calculatePositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const result_data = [];

    const width = container.clientWidth;
    const height = container.clientHeight;

    const half = Math.min(height, width) / 2;

    var centerX = container.offsetLeft  + half;
    var centerY = container.offsetTop  + half;
    
    const radius = Math.min(centerX, centerY) * 0.8;

 
    var degreecollection = [];
        for (var i = 9; i < 36; i++){
        degreecollection.push(i * 10);
    }
    for (var i = 0 ; i < 11; i++){
        degreecollection.push(i * 10);
    }
    var counter = 0;


    for (var i = 0 ; i < 36; i++)
    {
      
        var realDegree = (i * 10) - rotation;
        var Yoffset = Math.sin((Math.PI / 180 ) * realDegree);
        var Xoffset = Math.cos((Math.PI / 180 ) * realDegree);
        let offt = container.offsetTop;
        let offl = container.offsetLeft;

        result_data.push({
            top: (offl * -0.1  + 0.5 * centerY * Yoffset + half - (offt * Yoffset / 2) ) + "px",
            left: (half * 0.50 + 0.5 * centerX * Xoffset - (offl * Xoffset / 2)) + "px",
            rotate: realDegree + 'deg',
            rot: realDegree,
            width: half + 'px',
            key: 'rancon_' + degreecollection[i],
            title: degreecollection[i],
            index: i,
        })

        setCountData(result_data);
  };
}

  useEffect(() => {
    calculatePositions();
    
    // Обновление позиций при изменении размера окна
    window.addEventListener('resize', calculatePositions);
    
    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  return (
    <div style={{padding: '24px'}} className={'radial-container-wrapper'}>
      <div>
        <div className="radial-container" ref={containerRef}>
            {countData.map((item)=>(
                <div className={'slider-wrapper'}
                style={{top: item.top, left: item.left, rotate: item.rotate, width: item.width}}
                title={item.title}
                key={item.key}
                >
                <Input type='range'
                    onChange={(ev)=>{handleDataChange(item.index, ev.target.value)}}
                    value={data[item.index]}
                    min={min}
                    max={max}
                    title={item.index * 10 + ' deg'}
                    step={step}
                ></Input>
                <div>
                <span 
                  style={{ rotate: `${-item.rot}deg`, position: 'absolute'}}
                 className="angle-value">{data[item.index]}</span>
                 </div>
                </div>
            ))}
        </div>
        </div>
            <TextArea value={JSON.stringify(data)}
                onChange={setFromTextarea}
                style={{opacity: '0.3'}}
            >
                
            </TextArea>
            
    </div>
  );
}

export default RadialSlider;