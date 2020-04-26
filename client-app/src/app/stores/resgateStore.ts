import { observable, action, configure, runInAction } from "mobx";
import { createContext, FormEvent } from "react";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { IPaciente } from "../modelos/Paciente";
import IVaga from "../modelos/Vaga";
import { IEntidadeResponsavel } from "../modelos/EntidadeResponsavel";
import { Link, RouteComponentProps } from "react-router-dom";


configure({ enforceActions: "always" });

class ResgateStore {
  @observable formularioPaciente = false;
  @observable submitting = false;
  @observable loadingInitial = false;
  @observable vaga: IVaga = {
    nomeDoHospital: "",
    endereco: ""
  };

  @observable entidadeResponsavel: IEntidadeResponsavel = {
    nome: "",
    profissionalResponsavel: "",
  };
  @observable paciente: IPaciente = {
    id: "",
    nome: "",
    sexo: "",
    peso: "",
    idade: "",
    tipoSanguineo: "",
    altura: "",
    quadroClinico: "",
    observacoes: "",
    entidadeResponsavel: this.entidadeResponsavel,
  };

  @action limparVaga = () => {
    this.vaga = {
      nomeDoHospital: "",
      endereco: ""
    }
  }

  @action limparEntidadeResponsavel = () => {
    this.entidadeResponsavel = {
      nome: "",
      profissionalResponsavel: "",
    };
  };

  @action limparPaciente = () => {
    //problema
    runInAction("limpando", () => {
      this.paciente = {
        id: "",
        nome: "",
        sexo: "",
        peso: "",
        idade: "",
        tipoSanguineo: "",
        altura: "",
        quadroClinico: "",
        observacoes: "",
        entidadeResponsavel: this.entidadeResponsavel,
      };
    });
  };

  @action handleInputChangePaciente = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    this.paciente = { ...this.paciente, [name]: value };
  };

  @action handleInputChangeEntidadeResponsavel = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    this.entidadeResponsavel = { ...this.entidadeResponsavel, [name]: value };
  };

  @action enviarFormulario = async () => {
    /* this.submitting = true; */
    this.loadingInitial = true;
    this.paciente.entidadeResponsavel = this.entidadeResponsavel;
    this.paciente.id = uuid();
    try {
      this.vaga = await agent.Paciente.create(this.paciente);
      runInAction("enviando formulario", () => {
        /* this.submitting = false; */
        this.loadingInitial = false;
        this.limparEntidadeResponsavel();
        this.limparPaciente();
      });
    } catch (error) {
      runInAction("erro de envio de formulario", () => {
        this.loadingInitial = false;
        /* this.submitting = false; */
      });
      console.log(error);
    }
  };
}

export default createContext(new ResgateStore());
