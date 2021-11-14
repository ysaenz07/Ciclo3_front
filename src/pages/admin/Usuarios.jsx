
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { editarUsuario } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log('usuarios', respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full">
          <h2 className="text-6xl font-extrabold text-gray-900">
            Administración de Usuarios
          </h2>
        </div>    
      <table className='tabla'>
      <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
          </tr>
        </thead>
          <tbody>
              {usuarios.map(user=>{
                  return(
                    <tr key={nanoid()}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <EstadoUsuario user={user} />
                        </td>
                        <td>
                          <RolesUsuario user={user} />
                        </td>
                    </tr>
                  );    
              })}
          </tbody>
      </table>
      
    </div>
  );
};

const RolesUsuario=({user})=>{
    const [rol,setRol]=useState(user.rol);

    useEffect(()=> {
        const editUsuario=async ()=>{
            await editarUsuario(
                user._id,
                { rol }, 
                (res)=>{
                    console.log(res);
                },
                (err)=>{
                    console.log(err);
                }
            );
        };
        if (user.rol !== rol){
            editUsuario();
        }
    },[rol, user]);

    return(
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="" disable>
              Seleccione un rol
            </option>
            <option value="admin">Admin</option>
            <option value="vendedor">Vendedor</option>
            <option value="inactivo">Inactivo</option>
        </select>
    );
};


const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? '');

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value='' disabled>
        Seleccione un estado
      </option>
      <option value='autorizado' className='text-green-500'>
        Autorizado
      </option>
      <option value='pendiente' className='text-yellow-500'>
        Pendiente
      </option>
      <option value='rechazado' className='text-red-500'>
        Rechazado
      </option>
    </select>
  );
};

export default Usuarios;
