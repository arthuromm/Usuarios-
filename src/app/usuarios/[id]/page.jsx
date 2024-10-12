"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap"; // Para usar un spinner de carga de Bootstrap

export default function Usuario() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });
    }
  }, [id]);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Información del Usuario</h2>
          <div className="row">
            <div className="col-md-6">
              <h5><strong>ID:</strong> {user.id}</h5>
              <h5><strong>Nombre:</strong> {user.name}</h5>
              <h5><strong>Username:</strong> {user.username}</h5>
              <h5><strong>Email:</strong> <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></h5>
            </div>
            <div className="col-md-6">
              <h5><strong>Teléfono:</strong> {user.phone}</h5>
              <h5><strong>Sitio Web:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">{user.website}</a></h5>
              <h5><strong>Compañía:</strong> {user.company.name}</h5>
              <h5><strong>Dirección:</strong> {`${user.address.street}, ${user.address.city}`}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
