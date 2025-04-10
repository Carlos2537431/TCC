import React, { useState } from "react";
import "./sitepm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    carModel: "",
    licensePlate: "",
    incidentType: "furto", // Valor padrão
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Boletim de Ocorrência Registrado:", formData);
    alert("Boletim de Ocorrência registrado com sucesso!");
    setFormData({
      name: "",
      cpf: "",
      carModel: "",
      licensePlate: "",
      incidentType: "furto",
      description: "",
    });
  };

  return (
    <div className="container">
      <h1>Registrar Boletim de Ocorrência</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Modelo do Carro:</label>
          <input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Placa do Carro:</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Ocorrência:</label>
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            required
          >
            <option value="furto">Furto</option>
            <option value="roubo">Roubo</option>
          </select>
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default ReportForm;