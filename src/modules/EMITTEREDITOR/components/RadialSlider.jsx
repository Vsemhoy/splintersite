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

function RadialSlider({ onChange, data = Array(36).fill(0), min = -36, max = 6, rotation = 90, step = 1, label }) {
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
  let nextarray = [];
    for (let i = 0 ; i < 19; i++)
      {
        let sim_value = valuesRef.current[i];
        nextarray.push(sim_value);
      };
      for (let i = 17; i > 0; i--)
      {
        nextarray.push(nextarray[i]);
      }
      valuesRef.current = [...nextarray];
      updateRechartData();
  }



  const countData = useMemo(() => {
    const container = containerRef.current;
    if (!container) return [];
    const correction = 1;
    const ranges_data = [];
    const width = container.clientWidth * correction;
    const height = container.clientHeight  * correction;
    const half = Math.min(height, width) / 2;
    const centerX = container.offsetLeft + half;
    const centerY = container.offsetTop + half;
    // const radius = Math.min(centerX, centerY) * 0.8;

    const degree_collection = [];
    for (let i = 9; i < 36; i++) degree_collection.push(i * 10);
    for (let i = 0; i < 11; i++) degree_collection.push(i * 10);

    for (let i = 0; i < 36; i++) {
      const realDegree = (i * 10) - vertDiagramAngle;
      const Yoffset = Math.sin((Math.PI / 180) * realDegree);
      const Xoffset = Math.cos((Math.PI / 180) * realDegree);
      const offset_top = container.offsetTop;
      const offset_left = container.offsetLeft;

      ranges_data.push({
        top: (offset_left * -0.001 + 0.5 * centerY * Yoffset + half - (offset_top * Yoffset / 2)) + "px",
        left: (half * 0.50 + 0.5 * centerX * Xoffset - (offset_left * Xoffset / 2)) + "px",
        rotate: realDegree + 'deg',
        rot: realDegree,
        width: half + 'px',
        key: 'slider_' + degree_collection[i],
        title: degree_collection[i],
        index: i,
      });
    }
    
    return ranges_data;
  }, [forceUpdate, vertDiagramAngle]); // Добавляем forceUpdate в зависимости



  const handleDataChange = useCallback((index, value, range) => {
    const numValue = parseFloat(value);
    valuesRef.current[index] = numValue;

    if (range > 0){
      for (let x = 0; x < range; x++){
        // console.log('widthRange', event)
        let p_index_left = +index + +range;
        if (p_index_left > 36){
          p_index_left = +p_index_left - 36; 
        }
        let p_index_right = +index - +range;
        if (p_index_right < 0){
          p_index_right = +p_index_right + 36; 
        }
        let goalValue = valuesRef.current[p_index_left];
        let goalValuer = valuesRef.current[p_index_right];

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

    const degMarks = {
    0: '0°',
    90: '90°',
    180: '180°',
    270: '270°',
  };

  return (
    <>
      <div className={'radial-container-wrapper'}
      ref={chartContainerRef}
      style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
      <div className={'section-label'}>{label}</div>
        <RadarChart  outerRadius={chartSize * 0.42} // 40% от размера контейнера
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

      <div style={{ padding: '44px' }} className={'radial-container-wrapper'}>
        <div>
          <div className="radial-container" ref={containerRef}>
            {countData.map((item) => (
              <div
                // className={'slider-wrapper'}
                className={`slider-wrapper ${item.index === 0 ? "zero-degree" : 
                item.index === 9 ? "ninety-degree" : item.index === 18 ? "eighty-degree" : item.index === 27 ? "twesty-degree" : ""}`}
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
                  title={item.index * 10 + '°'}
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
          <div className={'form-block'}>
            <div className={'form-label'}>Input rotation</div>
            {/* <Input type="range" min={-180} max={180} value={vertDiagramAngle} step={90} onChange={(ev)=>{setVertDiagramAngle(ev.target.value)}} /> */}

            <Slider  marks={degMarks} defaultValue={90} step={null} min={0} max={270}  onChange={setVertDiagramAngle}/>
          </div>

          <div className={'form-block'}>
            <div className={'form-label'}>Min value</div>
              <Input type="number" min={-180} max={-18} step={6} value={minDiagramValue} onChange={(ev)=>{setMinDiagramValue(ev.target.value)}} />
            </div>

          <div className={'form-block'}>
            <div className={'form-label'}>Max value</div>
              <Input type="number" min={0} max={36} step={6} value={maxDiagramValue} onChange={(ev)=>{setMaxDiagramValue(ev.target.value)}} />
            </div>

          <div className={'form-block'}>
            <div className={'form-label'}>Value step</div>
              <Slider  marks={stepMarks} defaultValue={1} step={null} min={0.01} max={6} value={stepAccuracy} onChange={setStepAccuracy}/>
            </div>

            <div className={'form-block'}>
              <div className={'form-label'}>Averaging width</div>
              <Slider defaultValue={0} min={0} max={18} value={widthRange} onChange={setWidthRange}/>
            </div>

          <Button block onClick={makeSymmetric} >Make Symmetric</Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(RadialSlider);



