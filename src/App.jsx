import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Chart from './components/Chart';
import Filter from './components/Filter';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { PuffLoader } from 'react-spinners';

function App() {
  const [datas, setDatas] = useState(undefined)


  useEffect(() => {
    fetch("https://assignment-6fdaf-default-rtdb.firebaseio.com/orders.json")
      .then(res => res.json())
      .then(data => setDatas(data))
      .catch(err => console.log("Xəta:", err))


  }, [])

  const [mostSale, setMostSale] = useState({
    product: '',
    date: '',
  })
  useEffect(() => {
    if (datas) {
      const amounts = datas.map(({ amount }) => amount)
      const max = Math.max(...amounts)
      const most = datas.filter(({ amount }) => amount === max)
      if (most) {
        setMostSale({
          product: most[0].product[0].name,
          date: new Date(most[0].date).toISOString().split('T')[0],
        })
      }
    }
  }, [datas])








  return (
    <>
      {
        datas === undefined && <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
          <PuffLoader color="#ffb326" size={150}/>
        </div>
      }

      {
        datas !== undefined && <div>
          <div>
            <Navbar />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <Filter data={datas} />
                </div>
                <div className="col-md-6 pt-5">
                  <div className="chart-box border rounded p-4">
                    <h4>Statistika (Son 1 ay)</h4>
                    <p className='fst-italic'>Ən çox satılan məhsul: {mostSale.product}</p>
                    <p className='fst-italic'>Ən çox satış olunan gün: {mostSale.date} </p>
                    <Chart data={datas} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }




    </>
  );
}

export default App;
