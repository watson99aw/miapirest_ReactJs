import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Api from "../servicios/api";

function Editar() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        fetch(Api + `/${id}`, {
            method: 'GET'
        })
            .then(respuesta => respuesta.json())
            .then(datosRespuesta => {
                setUsuario(datosRespuesta);
            })
            .catch(error => console.error(error));
    }, [id]);

    if (!usuario) {
        return <div>Cargando...</div>
    }

    function cambioValor(e) {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    function enviarDatos(e) {
        e.preventDefault();
        const { id, nombre, primerapellido, segundoapellido, correo } = usuario;

        // Verificar que no haya campos vacíos ni espacios en blanco
        if (!nombre.trim() || !primerapellido.trim() || !segundoapellido.trim() || !correo.trim()) {
            Swal.fire({
                title: 'Campos vacíos',
                text: 'Por favor, rellene todos los campos',
                icon: 'warning'
            });
            return; // Detener el proceso de enviar datos si hay campos vacíos
        }

        const data = {
            id: id,
            nombre: nombre,
            primerapellido: primerapellido,
            segundoapellido: segundoapellido,
            correo: correo
        };

        fetch(Api + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                Swal.fire({
                    title: 'Edicion exitoso',
                    text: datosRespuesta.message,
                    icon: 'success'
                });
            })
            .catch(error => console.error(error));
    }


    return (
        <div className="card">
            <div className="card-header">
                Editar Empleados
            </div>
            <div className="card-body">
                <form onSubmit={enviarDatos}>
                    <div className="form-group">
                        <label>Nombre del empleado:</label>
                        <input type="text" name="nombre" value={usuario.nombre} onChange={cambioValor} className="form-control" placeholder="" />
                        <input type="hidden" name="id" value={id} id="id" />
                    </div>
                    <div className="form-group">
                        <label>Primer apellido del empleado:</label>
                        <input type="text" name="primerapellido" value={usuario.primerapellido} onChange={cambioValor} className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label>Segundo apellido del empleado:</label>
                        <input type="text" name="segundoapellido" value={usuario.segundoapellido} onChange={cambioValor} className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label>Correo del empleado:</label>
                        <input type="text" name="correo" value={usuario.correo} onChange={cambioValor} className="form-control" placeholder="" />
                    </div>
                    <br />
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Actualizar empleado</button>
                        <Link to={"/"} className="btn btn-danger">Cancelar</Link>
                    </div>
                </form>
            </div>
            <div className="card-footer text-muted">
                Footer
            </div>
        </div>
    );
}

export default Editar;
