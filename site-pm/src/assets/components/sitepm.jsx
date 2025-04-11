import React, { useState } from "react";
import "./sitepm.css";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    carModel: "",
    licensePlate: "",
    anoCarro: "",
    incidentType: "furto", // Valor padrão
    description: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    return secondCheck === parseInt(cpf.charAt(10));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Atualiza o estado com o novo valor do campo
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      cpf: "",
      carModel: "",
      licensePlate: "",
      anoCarro: "",
      incidentType: "furto",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validação do formulário
    if (!isFormValid()) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos corretamente." });
      return;
    }
  
    if (!isValidCPF(formData.cpf)) {
      setMessage({ type: "error", text: "Por favor, insira um CPF válido." });
      return;
    }
  
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
  
    try {
      // Simula envio de dados
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage({ type: "success", text: "Boletim de Ocorrência registrado com sucesso!" });
      resetForm();
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao registrar o boletim. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const isLicensePlateValid = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(formData.licensePlate);
    const isCarYearValid =
      /^\d{4}$/.test(formData.anoCarro) &&
      formData.anoCarro >= 1886 &&
      formData.anoCarro <= new Date().getFullYear();

    return (
      formData.name &&
      isValidCPF(formData.cpf) &&
      formData.carModel &&
      isCarYearValid &&
      isLicensePlateValid &&
      formData.description
    );
  };

  return (
    <div className="container">
      <h1>Registrar Boletim de Ocorrência</h1>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Nome Completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="Digite seu CPF (somente números)"
            required
          />
        </div>
        <div>
          <label htmlFor="carModel">Modelo do Carro:</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            placeholder="Digite o modelo do carro"
            required
          />
        </div>
        <div>
          <label htmlFor="anoCarro">Ano do carro:</label>
          <input
            type="number"
            id="anoCarro"
            name="anoCarro"
            value={formData.anoCarro}
            onChange={handleChange}
            placeholder="Digite o ano do carro"
            min="1886"
            max={new Date().getFullYear()}
            required
          />
        </div>
        <div>
          <label htmlFor="licensePlate">Placa do Carro:</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="Digite a placa do carro"
            required
          />
        </div>
        <div>
          <label htmlFor="incidentType">Tipo de Ocorrência:</label>
          <select
            id="incidentType"
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
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva o ocorrido"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting || !isFormValid()}>
          {isSubmitting ? "Enviando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;