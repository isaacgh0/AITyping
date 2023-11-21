import { useContext, useEffect, useState } from 'react'
import { Chart, CategoryScale } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import UserContext from '../../common/context/user'
import './index.sass'

Chart.register(CategoryScale)

const Profile = () => {
  const [selected, setSelected] = useState('')
  const [gradient, setGradient] = useState(null)
  const [data, setData] = useState([])

  const usrctx = useContext(UserContext)

  const options = [
    { id: 'errors', text: 'Errors' },
    { id: 'cpm', text: 'Words PM' },
    { id: 'precision', text: 'Precision' }
  ]

  useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d')

    const gdt = ctx.createLinearGradient(100, 0, 100, 380)

    gdt.addColorStop(0, '#0EB1D2')
    gdt.addColorStop(1, '#0EB1D200')

    setGradient(gdt)
  }, [])

  const getData = () => {
    fetch(`https://aitypingbackend-dev-qmsf.4.us-1.fl0.io/api/test/history/${selected}/${usrctx.token}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if (!response.status) { return }

        if (response.entries) {
          console.log(response.analytics.test)
          setData(response.analytics.test)
        }
      })
      .catch(err => console.log(err))
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
              labels: ['7', '6', '5', '4', '3', '2', '1'],
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
