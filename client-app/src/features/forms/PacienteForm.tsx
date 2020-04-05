import React, { useState, FormEvent } from "react";
import { Form } from "semantic-ui-react";
import { IPaciente } from "../../app/models/Paciente";

interface IProps {
  createPaciente: (paciente: IPaciente) => void;
  handleInputChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  paciente: IPaciente;
}

export const PacienteForm: React.FC<IProps> = ({ createPaciente,  handleInputChange, paciente }) => {



  return (
    <Form>
      <Form.Group widths={2}>
        <Form.Field>
          <label>Nome</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="nome"
            icon="user"
            placeholder="Nome"
            value={paciente.nome}
          />
        </Form.Field>
        <Form.Field>
          <label>Sexo</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="sexo"
            placeholder="Sexo"
            value={paciente.sexo}
          />
        </Form.Field>
      </Form.Group>

      <Form.Group widths={2}>
        <Form.Field>
          <label>Peso</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="peso"
            icon="weight"
            placeholder="Peso"
            value={paciente.peso}
          />
        </Form.Field>
        <Form.Field>
          <label>Idade</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="idade"
            icon="age"
            placeholder="Idade"
            value={paciente.idade}
          />
        </Form.Field>
      </Form.Group>

      <Form.Group widths={1}>
        <Form.Field>
          <label>Tipo Sanguineo</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="tipoSanguineo"
            placeholder="Tipo Sanguineo"
            value={paciente.tipoSanguineo}
          />
        </Form.Field>
        <Form.Field>
          <label>Altura</label>
          <Form.Input
            onChange={(e) => handleInputChange(e)}
            name="altura"
            value={paciente.altura}
            placeholder="Altura"
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
