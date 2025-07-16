import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './style/radialslider.css';
import { Button, Input, Slider } from 'antd';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

export const ORIENTATION = {
  'vertical': 1,
  'horizontal': 2,
  'VERTICAL': 1,
  'HORIZONTAL': 2,
};

function RadialSlider({ onChange, data = Array(36).fill(0), min = -36, max = 6, rotation = 90, step = 1 }) {
  const containerRef = useRef(null);
  
  // Используем ref для хранения значений и состояние для форсирования обновления
  const valuesRef = useRef([...data]);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const [rechartData, setRechartData] = useState([]);
  
  const [vertDiagramAngle, setVertDiagramAngle] = useState(rotation);
  const [minDiagramValue, setMinDiagramValue] = useState(min);
  const [maxDiagramValue, setMaxDiagramValue] = useState(max);
  const [stepAccuracy, setStepAccuracy] = useState(step);
  const [widthRange, setWidthRange] = useState(0);

    const chartContainerRef = useRef(null); // Ref для контейнера диаграммы
    const [chartSize, setChartSize] = useState(600); // Начальный размер диаграммы
    

    // Эффект для отслеживания размера контейнера диаграммы
    useEffect(() => {
      const updateChartSize = () => {
        if (chartContainerRef.current) {
          const containerWidth = chartContainerRef.current.clientWidth;
          // Берем 90% от ширины контейнера, чтобы было немного отступов
          const size = Math.min(containerWidth * 0.9, 800); // Ограничиваем максимальный размер
          setChartSize(size);
        }
      };

      updateChartSize();
      
      const resizeObserver = new ResizeObserver(updateChartSize);
      if (chartContainerRef.current) {
        resizeObserver.observe(chartContainerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);


  // Инициализация и обновление при изменении пропса data
  useEffect(() => {
    valuesRef.current = [...data];
    updateRechartData();
    // Форсируем обновление, чтобы слайдеры отобразили новые значения
    setForceUpdate(prev => prev + 1);
  }, [data]);


  const makeSymmetric = () => {
  let tempdiagram = [];
    for (let i = 0 ; i < 19; i++)
      {
        let sor = valuesRef.current[i];
        tempdiagram.push(sor);
      };
      for (let i = 17; i > 0; i--)
      {
        tempdiagram.push(tempdiagram[i]);
      }
      valuesRef.current = [...tempdiagram];
      updateRechartData();
      // patternarrays[currentIndex] = tempdiagram;
      // ChartAddData(myChart);
      // setRangeValuesToRange();
  }



  const countData = useMemo(() => {
    const container = containerRef.current;
    if (!container) return [];
    
    const result_data = [];
    const width = container.clientWidth;
    const height = container.clientHeight;
    const half = Math.min(height, width) / 2;
    const centerX = container.offsetLeft + half;
    const centerY = container.offsetTop + half;
    const radius = Math.min(centerX, centerY) * 0.8;

    const degreecollection = [];
    for (let i = 9; i < 36; i++) degreecollection.push(i * 10);
    for (let i = 0; i < 11; i++) degreecollection.push(i * 10);

    for (let i = 0; i < 36; i++) {
      const realDegree = (i * 10) - vertDiagramAngle;
      const Yoffset = Math.sin((Math.PI / 180) * realDegree);
      const Xoffset = Math.cos((Math.PI / 180) * realDegree);
      const offt = container.offsetTop;
      const offl = container.offsetLeft;

      result_data.push({
        top: (offl * -0.001 + 0.5 * centerY * Yoffset + half - (offt * Yoffset / 2)) + "px",
        left: (half * 0.50 + 0.5 * centerX * Xoffset - (offl * Xoffset / 2)) + "px",
        rotate: realDegree + 'deg',
        rot: realDegree,
        width: half + 'px',
        key: 'rancon_' + degreecollection[i],
        title: degreecollection[i],
        index: i,
      });
    }
    
    return result_data;
  }, [forceUpdate, vertDiagramAngle]); // Добавляем forceUpdate в зависимости



  const handleDataChange = useCallback((index, value, range) => {
    const numValue = parseFloat(value);
    valuesRef.current[index] = numValue;

    if (range > 0){
      let toLeft = 0;
      let toRight = 0;
      for (let x = 0; x < range; x++){
        // console.log('widthRange', event)
        let pickI = +index + +range;
        if (pickI > 36){
          pickI = +pickI - 36; 
        }
        let pickIr = +index - +range;
        if (pickIr < 0){
          pickIr = +pickIr + 36; 
        }
        let goalValue = valuesRef.current[pickI];
        let goalValuer = valuesRef.current[pickIr];

        let additor = (value - goalValue) / range;
        let additorright = (value - goalValuer) / range;     
        
        let leftindex = +index - +x;
        if (leftindex < 0){
          leftindex = 36 + leftindex;
        }
              let rightindex = +index + +x;
        if (rightindex > 36){
          rightindex = rightindex - 36;
        }
        
        //console.log(additor * x);
          valuesRef.current[leftindex] = (+value - +(+additorright * x)).toFixed(2);
          valuesRef.current[rightindex] = (value - (+additor * x)).toFixed(2);
      } 
    }

    updateRechartData();
    if (onChange) {
      onChange([...valuesRef.current]);
    }
    // Форсируем обновление для отображения нового значения
    setForceUpdate(prev => prev + 1);
  }, [onChange]);




  const updateRechartData = useCallback(() => {
    const newData = valuesRef.current.map((item, index) => ({
      angle: `${index * 10}°`,
      value: item
    }));
    setRechartData(newData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Первоначальное создание данных для диаграммы
  useEffect(() => {
    updateRechartData();
  }, []);


  const stepMarks = {
  0.01: '0.01',
  0.1: '0.1',
  1: '1',
  3: '3',
  6: '6',
};

  return (
    <>
      <div className={'radial-container-wrapper'}
      ref={chartContainerRef}
      style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
      
        <RadarChart  outerRadius={chartSize * 0.4} // 40% от размера контейнера
          width={chartSize}
          height={chartSize}
          data={rechartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="angle" />
          <PolarRadiusAxis domain={[-30, 6]} />
          <Radar name="Pattern" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </div>

      <div style={{ padding: '24px' }} className={'radial-container-wrapper'}>
        <div>
          <div className="radial-container" ref={containerRef}>
            {countData.map((item) => (
              <div
                // className={'slider-wrapper'}
                className={`slider-wrapper ${item.index === 0 ? "zero-degree" : item.index === 9 ? "ninety-degree" : ""}`}
                style={{ top: item.top, left: item.left, rotate: item.rotate, width: item.width }}
                title={item.title}
                key={item.key}
              >
                <Input 
                  
                  type='range'
                  onChange={(ev) => handleDataChange(item.index, ev.target.value, widthRange)}
                  value={valuesRef.current[item.index]}
                  min={minDiagramValue}
                  max={maxDiagramValue}
                  title={item.index * 10 + ' deg'}
                  step={stepAccuracy}
                />
                
                <div>
                  <span
                    style={{ rotate: `${-item.rot}deg`, position: 'absolute' }}
                    className="angle-value"
                  >
                    {valuesRef.current[item.index]}
                  </span>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>


      <div className={'radial-container-wrapper'}>
      <div className={'sp-pa-12'}>
        <Input type="range" min={-180} max={180} value={vertDiagramAngle} step={90} onChange={(ev)=>{setVertDiagramAngle(ev.target.value)}} />
        <Input type="number" min={-180} max={-18} step={6} value={minDiagramValue} onChange={(ev)=>{setMinDiagramValue(ev.target.value)}} />
        <Input type="number" min={0} max={36} step={6} value={maxDiagramValue} onChange={(ev)=>{setMaxDiagramValue(ev.target.value)}} />

         <Slider  marks={stepMarks} defaultValue={1} step={null} min={0.01} max={6} value={stepAccuracy} onChange={setStepAccuracy}/>
          <Slider defaultValue={0} min={0} max={18} value={widthRange} onChange={setWidthRange}/>
         <Button onClick={makeSymmetric} >Symmetric</Button>
      </div></div>
    </>
  );
}

export default React.memo(RadialSlider);



