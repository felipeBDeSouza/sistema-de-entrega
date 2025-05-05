// src/components/MotoristaCadastro.jsx
import React, { useState } from "react";
import "./motorista.css";

const MotoristaCadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnh, setCnh] = useState("");
  const [motoristas, setMotoristas] = useState([]);

  const cadastrarMotorista = () => {
    if (!nome || !cpf || !cnh) return alert("Preencha todos os campos!");

    const novoMotorista = { nome, cpf, cnh };
    setMotoristas([...motoristas, novoMotorista]);

    setNome("");
    setCpf("");
    setCnh("");
  };

  return (
    <div id="motorista" className="tela">
      <h2>Cadastro de Motorista</h2>
      <div className="form-group">
        <label>Nome</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          id="nomeMotorista"
        />
      </div>
      <div className="form-group">
        <label>CPF</label>
        <input
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          id="cpfMotorista"
        />
      </div>
      <div className="form-group">
        <label>CNH</label>
        <input
          value={cnh}
          onChange={(e) => setCnh(e.target.value)}
          id="cnhMotorista"
        />
      </div>
      <button onClick={cadastrarMotorista}>Cadastrar</button>

      <div id="listaMotoristas">
        <h3>Motoristas Cadastrados:</h3>
        <ul>
          {motoristas.map((m, index) => (
            <li key={index}>
              {m.nome} — CPF: {m.cpf} — CNH: {m.cnh}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotoristaCadastro;
