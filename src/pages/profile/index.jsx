import { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../common/context/firebase'
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

  const firectx = useContext(FirebaseContext)

  useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d')

    const gdt = ctx.createLinearGradient(100, 0, 100, 380)

    gdt.addColorStop(0, '#0EB1D2')
    gdt.addColorStop(1, '#0EB1D200')

    setGradient(gdt)
  }, [])

  const getData = () => {
    console.log('entro')
    firectx.db.collection('Test').where('user', '==', firectx.id)
      .get()
      .then(query => {
        let ids = []
        const dats = {}

        query.forEach((doc) => {
          ids.push(doc.id)

          if (selected === 'err') { dats[doc.id] = doc.data().errors }
          if (selected === 'wpm') { dats[doc.id] = doc.data().wpm }
          if (selected === 'pcs') { dats[doc.id] = doc.data().precision }

          console.log(doc.data())
        })

        ids = ids.sort()

        console.log(ids)

        const newData = []

        for (let i = 0; i < ids.length; i++) {
          newData.push(dats[ids[i]])

          if (i >= 5) {
            break
          }
        }

        setData(newData.reverse())
      })
      .catch(err => { console.log(err) })
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
