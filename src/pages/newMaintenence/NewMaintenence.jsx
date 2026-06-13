import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./NewMaintenence.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from "../../components/navBar/NavBar";
import { Paperclip, X } from "lucide-react";
import api from "../../services/api";

const NewMaintenence = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  // Captura o ID diretamente da URL (ex: /editar/5)
  const { id } = useParams(); 
  const isEditMode = !!id;

  // Estados para Controle de Usuário e Veículo (AGORA DINÂMICO!)
  const [idUsuarioLogado, setIdUsuarioLogado] = useState(null);
  const [idVeiculoAtual, setIdVeiculoAtual] = useState(null); 

  const [tiposManutencao, setTiposManutencao] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    dataManutencao: "",
    quilometragem: "",
    valor: "",
    oficina: "",
    pecas: "",
    observacoes: "",
    fkIdTipoManutencao: ""
  });

  // 1. Buscar o Usuário Logado do LocalStorage
  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (!storageUser) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/");
      return;
    }
    const loggedUser = JSON.parse(storageUser);
    setIdUsuarioLogado(loggedUser.id);
  }, [navigate]);


  // 2. Carregar/Preencher os dados da manutenção (E pegar o ID do veículo correto)
  useEffect(() => {
    const carregarDadosManutencao = async () => {
      let dados = location.state?.maintenanceToEdit;

      // Se for MODO CRIAÇÃO, o idVeiculo vem direto no state enviado pela tela de histórico
      if (!isEditMode && location.state?.idVeiculo) {
        setIdVeiculoAtual(location.state.idVeiculo);
        return;
      }

      // Se for MODO EDIÇÃO e o usuário deu F5 (perdeu o state), busca direto da API pelo ID da URL
      if (!dados && id) {
        try {
          setIsLoading(true);
          const response = await api.get(`/manutencao/${id}`);
          if (response.data && response.data.status) {
            dados = response.data.data.manutencao || response.data.data;
          }
        } catch (e) {
          console.error("Erro ao carregar dados da manutenção para edição:", e);
        } finally {
          setIsLoading(false);
        }
      }

      // Se temos os dados da manutenção (seja por navegação ou pela API)
      if (dados) {
        // Vincula o veículo dinamicamente baseado nos dados reais da manutenção
        setIdVeiculoAtual(dados.id_veiculo);

        setFormData({
          dataManutencao: dados.data_manutencao ? dados.data_manutencao.split("T")[0] : "",
          quilometragem: dados.quilometragem?.toString() || "",
          valor: dados.custo || "",
          oficina: dados.oficina || "",
          pecas: dados.pecas || "",
          observacoes: dados.observacoes || "",
          fkIdTipoManutencao: dados.tipo_manutencao?.id?.toString() || ""
        });

        if (dados.evidencia && Array.isArray(dados.evidencia)) {
          const urlsAntigas = dados.evidencia.map(item => {
            let urlString = (item && typeof item === 'object' && item.url) ? item.url : item;
            if (typeof urlString === 'string') {
              urlString = urlString.replace("localhost", "127.0.0.1");
            }
            return { url: urlString, file: null };
          }).filter(Boolean);

          setImages(urlsAntigas);
        }
      }
    };

    carregarDadosManutencao();
  }, [id, location.state, isEditMode]);

  // 3. Buscar os tipos de manutenção no select
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await api.get("/tipo-manutencao/");
        if (response.data && response.data.status) {
          setTiposManutencao(response.data.data.tipos_manutencao || []);
        }
      } catch (e) {
        console.error("Erro ao buscar tipos de manutenção", e);
      }
    };
    fetchTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert("Máximo de 3 fotos.");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      alert("Apenas arquivos PNG ou JPEG são permitidos.");
      e.target.value = "";
      return;
    }

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file), 
      file: file 
    }));

    setImages([...images, ...newImages]);
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => {
      const removedImage = prevImages[indexToRemove];
      if (removedImage.file) URL.revokeObjectURL(removedImage.url);
      return prevImages.filter((_, index) => index !== indexToRemove);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Deseja realmente excluir esta manutenção?")) return;
    
    try {
      setIsLoading(true);
      const response = await api.delete(`/manutencao/${id}`);

      if (response.data?.status || response.status === 200) {
        alert("Manutenção excluída com sucesso!");
        navigate(-1); 
      } else {
        alert(response.data?.message || "Erro ao excluir.");
      }
    } catch (e) {
      alert(e.response?.data?.message || "Falha na conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!idUsuarioLogado) return alert("Usuário não identificado.");
    if (!idVeiculoAtual) return alert("Veículo não identificado."); // Validação de segurança adicionada
    if (!formData.fkIdTipoManutencao) return alert("Selecione um tipo de manutenção.");
    if (images.length === 0) return alert("Adicione pelo menos uma evidência.");

    setIsLoading(true);

    try {
      const payload = new FormData();
      
      payload.append("data_manutencao", formData.dataManutencao);
      payload.append("custo", formData.valor);
      payload.append("quilometragem", formData.quilometragem);
      payload.append("oficina", formData.oficina);
      payload.append("observacoes", formData.observacoes);
      payload.append("pecas", formData.pecas);
      payload.append("fk_id_tipo_manutencao", formData.fkIdTipoManutencao);
      payload.append("fk_id_usuario", idUsuarioLogado);
      payload.append("fk_id_veiculo", idVeiculoAtual); // Enviando o ID dinâmico correto

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        
        if (img.file) {
          payload.append("evidencias", img.file);
        } else {
          const response = await fetch(img.url);
          const blob = await response.blob();
          payload.append("evidencias", blob, `evidencia_mantida_${i}.jpg`);
        }
      }

      const url = isEditMode ? `/manutencao/${id}` : `/manutencao-evidencia`;
      const apiResponse = isEditMode ? await api.put(url, payload) : await api.post(url, payload);

      if (apiResponse.data && (apiResponse.data.status === true || apiResponse.status === 200)) {
        alert(isEditMode ? "Manutenção updated com sucesso!" : "Manutenção salva com sucesso!");
        navigate(-1);
      } else {
        alert(`Erro ao salvar: ${apiResponse.data?.message || 'Erro desconhecido'}`);
      }

    } catch (e) {
      alert(`Falha na conexão: ${e.response?.data?.message || e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newMaintenenceScreen">
      <main className="mainContent">
        <header className="headerMain">
          <h1>
            {isEditMode ? "Editar Manutenção" : "Nova Manutenção no"}{" "}
            <span className="carName">Civic SI</span>
          </h1>
          <p>Data de criação: 27/04/2026</p>
        </header>

        {/* ... Restante do JSX continua perfeitamente igual ... */}
        <div className="formMaintenence">
          <section className="cardSection leftColumn">
            <h3>Dados da Manutenção</h3>
            <div className="inputGroup">
              <label>Tipo da Manutenção</label>
              <select 
                className="typeMaintenanceOption" 
                name="fkIdTipoManutencao"
                value={formData.fkIdTipoManutencao}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {tiposManutencao.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                ))}
              </select>
            </div>

            <div className="dataGrid">
              <div className="inputGroup">
                <label>Data</label>
                <Input type="date" name="dataManutencao" value={formData.dataManutencao} onChange={handleChange} />
              </div>
              <div className="inputGroup">
                <label>KM</label>
                <Input type="number" name="quilometragem" value={formData.quilometragem} onChange={handleChange} />
              </div>
              <div className="inputGroup">
                <label>Valor</label>
                <Input name="valor" value={formData.valor} onChange={handleChange} placeholder="Ex: 150.00" />
              </div>
              <div className="inputGroup">
                <label>Oficina</label>
                <Input name="oficina" value={formData.oficina} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="cardSection rightColumn">
            <h3>Detalhes</h3>
            <div className="inputGroup">
              <label>Peças trocadas</label>
              <textarea
                className="detailsArea"
                name="pecas"
                value={formData.pecas}
                onChange={handleChange}
                placeholder="Descreva as peças trocadas"
              />
            </div>

            <label htmlFor="file-upload" className="evidenceUpload">
              <span>Anexar evidencias</span>
              <Paperclip></Paperclip>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <div className="imagePreviewGrid">
              {images.map((img, index) => (
                <div key={index} className="imageItem">
                  <img src={img.url} alt="Preview" />
                  <X className="removeBtn" onClick={() => handleRemoveImage(index)} size={18} />
                </div>
              ))}
            </div>
          </section>

          <section className="cardSection observationsContainer">
            <h3>Observações</h3>
            <textarea
              className="observationsArea"
              name="observacoes"
              placeholder="Adicione observações adicionais."
              value={formData.observacoes}
              onChange={handleChange}
            />

            <div className="buttonActionGroup">
              {isEditMode && (
                <Button 
                  className="deleteMaintenence" 
                  text="Excluir" 
                  variant="secondary" 
                  onClick={handleDelete}
                  disabled={isLoading}
                />
              )}
              <Button 
                className="saveMaintenence" 
                text={isLoading ? "Processando..." : "Salvar"} 
                variant="primary" 
                onClick={handleSave}
                disabled={isLoading}
              />
            </div>
          </section>
        </div>
      </main>

      <NavBar />
    </div>
  );
};

export default NewMaintenence;