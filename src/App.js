import './App.css';
import Listar from './componentes/Listar';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";


import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";

function App() {
  return (

    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>Home <span className="sr-only">(current)</span></Link>
          <Link className="nav-item nav-link" to={"/Crear"}>Crear registro</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path='/' element={<Listar></Listar>}> </Route>
          <Route path='/Crear' element={<Crear></Crear>}> </Route>
          <Route path='/Editar/:id' element={<Editar></Editar>}> </Route>
        </Routes>
      </div>
    </Router>

  );
}
export default App;
