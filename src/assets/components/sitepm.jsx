import React, { useState } from "react";
import "./sitepm.css";
import { db } from "./firebase";
import { ref, push } from "firebase/database";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    carModel: "",
    licensePlate: "",
    incidentType: "furto", 
    description: "",
    phone: "", // campo telefone
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ""); 
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

  // Valida placa padrão antigo e Mercosul
  const isValidLicensePlate = (plate) => {
    const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;
    const antigo = /^[A-Z]{3}[0-9]{4}$/i;
    return mercosul.test(plate) || antigo.test(plate);
  };

  // Validação de telefone: 10 ou 11 dígitos
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/[^\d]/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      cpf: "",
      carModel: "",
      licensePlate: "",
      incidentType: "furto",
      description: "",
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCPF(formData.cpf)) {
      setMessage({ type: "error", text: "Por favor, insira um CPF válido." });
      return;
    }

    if (!isValidLicensePlate(formData.licensePlate)) {
      setMessage({ type: "error", text: "Por favor, insira uma placa válida (ex: ABC1234 ou ABC1D23)." });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setMessage({ type: "error", text: "Por favor, insira um telefone válido (apenas números, com DDD)." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await push(ref(db, "ocorrencias"), formData);
      setMessage({ type: "success", text: "Boletim de Ocorrência registrado com sucesso!" });
      resetForm();
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao registrar o boletim. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      isValidCPF(formData.cpf) &&
      formData.carModel &&
      isValidLicensePlate(formData.licensePlate) &&
      isValidPhone(formData.phone) &&
      formData.description
    );
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/public/pm.png" alt="PM Logo" className="logo" />
        </div>
      <h1>Registrar Boletim de Ocorrência</h1>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="phone">Telefone Para Contato:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Digite seu telefone com DDD"
            required
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

      <footer className="footer">
        <p>© 2025. Todos os direitos reservados.</p>
        <p>
          Acesse o Site Da Policia Militar aqui: <a href="https://www.policiamilitar.sp.gov.br/"> Clique Aqui</a>
        </p>
      </footer>
    </div>
  );
};

export default ReportForm;