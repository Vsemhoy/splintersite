import React from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PI } from 'three/tsl'

function Diagram3D({ data }) {
  const degToRad = (degrees) => {
    return PI/180 * degrees;
  }

  const points = React.useMemo(() => {
    // Преобразуем полярные координаты в декартовы
    const radius = 5
    return data.map((value, i) => {
      const angle = degToRad(i * 10)
      const r = radius + (value * 0.2) // Масштабируем значения децибел
      return new THREE.Vector3(
        r * Math.cos(angle),
        r * Math.sin(angle),
        0
      )
    })
  }, [data])

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points]);




  return (
    <>
      {/* Ось Z (вертикальная диаграмма) */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 10, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      
      {/* Горизонтальная диаграмма */}
      <points geometry={geometry}>
        <pointsMaterial color="blue" size={0.1} />
      </points>
      
      {/* Соединительные линии */}
      {points.map((point, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              count={2} 
              array={new Float32Array([
                0, 0, 0,
                point.x, point.y, point.z
              ])} 
              itemSize={3} 
            />
          </bufferGeometry>
          <lineBasicMaterial color="white" />
        </line>
      ))}
    </>
  )
}

export default Diagram3D