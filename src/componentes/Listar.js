import React from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Api from "../servicios/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: []
        }
    }

    cargarDatos() {
        fetch(Api)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.setState({ datosCargados: true, empleados: datosRespuesta })
            })
            .catch()
    }


    borrarRegistros = (id) => {
        fetch(Api + "/" + id, {
            method: 'Delete'
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {

                Swal.fire({
                    title: 'Eliminado exitoso',
                    text: datosRespuesta.message,
                    icon: 'success'
                });
                this.cargarDatos();

            })
            .catch()
    }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        const { datosCargados, empleados } = this.state
        if (!datosCargados) {
            return (<div>Cargando...</div>);
        }
        else {
            return (

                <div className="card">
                    <div className="card-header">
                        <Link to={"/crear"} className="btn btn-success">Agregar nuevo empleado</Link>
                    </div>
                    <div className="card-body">
                        <h3>Empleados:</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>nombre</th>
                                    <th>correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {empleados.map(
                                    (empleados) => (
                                        <tr key={empleados.id}>
                                            <td>{empleados.id}</td>
                                            <td>{empleados.nombre} {empleados.primerapellido} {empleados.segundoapellido} </td>
                                            <td>{empleados.correo}</td>
                                            <td>
                                                <div className='btn-group' role='group' aria-label=''>
                                                    <Link to={"/editar/" + empleados.id} className="btn btn-primary">Editar</Link>
                                                    <button type='button' className="btn btn-danger" onClick={() => this.borrarRegistros(empleados.id)}>Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        Lista de empleados de mi API: <a href="https://apiexample.asociadosbega.com/public/contactos">Ir a demo API</a>
                    </div>
                </div>

            );
        }
    }
}

export default Listar;