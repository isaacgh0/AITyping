import { useEffect, useState } from 'react'
import { Chart, CategoryScale } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import './index.sass'

Chart.register(CategoryScale)

const Profile = () => {
  const [selected, setSelected] = useState('')
  const [gradient, setGradient] = useState(null)
  const [data, setData] = useState([])

  const options = [
    { id: 'err', text: 'Errors' },
    { id: 'wpm', text: 'Words PM' },
    { id: 'pcs', text: 'Precision' }
  ]

  useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d')

    const gdt = ctx.createLinearGradient(100, 0, 100, 380)

    gdt.addColorStop(0, '#0EB1D2')
    gdt.addColorStop(1, '#0EB1D200')

    setGradient(gdt)
  }, [])

  const getData = () => {
    // getTestHistory
  }

  const handleChangeSelected = id => {
    setSelected(id)
  }

  useEffect(() => {
    getData()
  }, [selected])

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <div className='content'>
        <ul className='radio'>
          {options.map(option => (
            <li className={`option ${selected === option.id ? 'selected' : ''}`} key={option.id} name={`stat-${option.id}`}>
              <button onClick={() => handleChangeSelected(option.id)}>
                <div className='radio-button' />
                <span>{option.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className='chart'>
          <Line
            data={{
              labels: ['1', '2', '3', '4', '5'],
              datasets: [{
                data,
                fill: true,
                backgroundColor: gradient,
                tension: 0,
                borderColor: '#0EB1D2',
                borderWidth: 2
              }]

            }}
            options={{
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { color: '#FFF', align: 'inner' },
                  border: {
                    color: '#FFF',
                    width: 2
                  }
                },
                y: {
                  grid: { display: false },
                  ticks: { color: 'rgba(255, 255, 255, 0.4)' }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
