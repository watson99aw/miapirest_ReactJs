import React from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Api from "../servicios/api";


class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            primerapellido: '',
            segundoapellido: '',
            correo: ''
        }
    }

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }

    enviarDatos = (e) => {
        e.preventDefault();
        const { nombre, primerapellido, segundoapellido, correo } = this.state;
    
        // Verificar que no haya campos en blanco o con espacios
        if (!nombre.trim() || !primerapellido.trim() || !segundoapellido.trim() || !correo.trim()) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingrese todos los campos.',
                icon: 'error'
            });
            return;
        }
    
        const data = {
            nombre: nombre,
            primerapellido: primerapellido,
            segundoapellido: segundoapellido,
            correo: correo
        };
    
        fetch(Api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: datosRespuesta.message,
                    icon: 'success'
                  }).then(() => {
                    this.setState({
                      nombre: '',
                      primerapellido: '',
                      segundoapellido: '',
                      correo: ''
                    });
                  });
            })
            .catch(error => console.error(error));
    }
    
      


    render() {
        const { nombre, primerapellido, segundoapellido, correo } = this.state;

        return (<div className="card">
            <div className="card-header">
                Formulario empleado.
            </div>
            <div className="card-body">
                <form onSubmit={this.enviarDatos}>

                    <div className="form-group">
                        <label>Nombre del empleado:</label>
                        <input type="text" name="nombre" value={nombre} onChange={this.cambioValor} id="nombre" className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label>Primer apellido del empleado:</label>
                        <input type="text" name="primerapellido" value={primerapellido} onChange={this.cambioValor} id="primerapellido" className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label>Segundo apellido del empleado:</label>
                        <input type="text" name="segundoapellido" value={segundoapellido} onChange={this.cambioValor} id="segundoapellido" className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label>Correo del empleado:</label>
                        <input type="text" name="correo" id="correo" value={correo} onChange={this.cambioValor} className="form-control" placeholder="" />
                    </div>
                    <br />
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Agregar empleado</button>
                        <Link to={"/"} className="btn btn-danger">Cancelar</Link>
                    </div>

                </form>
            </div>
            <div className="card-footer text-muted">
                Ingresa la informacion del usuario.
            </div>
        </div>);
    }
}

export default Crear;