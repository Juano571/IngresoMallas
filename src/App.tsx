import { Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import IngresoDatos from './pages/IngresoDatos'
import EstimacionGrados from './pages/EstimacionGrados'
import ComprobacionDatos from './pages/ComprobacionDatos'


const App = () => {
    return (
            <div>
                <Routes>
                    <Route path='/' element={
                        <>
                            <Header activeSection1={true} activeSection2={false} activeSection3={false} />
                            <IngresoDatos />
                        </>
                    }>
                    </Route>
                    <Route path='/estimaciongrados' element={
                        <>
                            <Header activeSection1={false} activeSection2={true} activeSection3={false} />
                            <EstimacionGrados />
                        </>
                    }></Route>
                    <Route path='/comprobaciondatos' element={
                        <>
                            <Header activeSection1={false} activeSection2={false} activeSection3={true} />
                            <ComprobacionDatos />
                        </>
                    }></Route>
                </Routes>
            </div>
    )
}

export default App