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
  
  const { id } = useParams(); 
  const isEditMode = !!id;

  const userRole = location.state?.role;
  const isReadOnly = userRole === "Visualizador";

  const [idUsuarioLogado, setIdUsuarioLogado] = useState(null);
  const [idVeiculoAtual, setIdVeiculoAtual] = useState(null); 

  const [tiposManutencao, setTiposManutencao] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  // ESTADO para guardar a data de criação que aparece no topo da tela
  const [dataCriacaoHeader, setDataCriacaoHeader] = useState("");

  const [formData, setFormData] = useState({
    dataManutencao: "",
    quilometragem: "",
    valor: "",
    oficina: "",
    pecas: "",
    observacoes: "",
    fkIdTipoManutencao: ""
  });

  useEffect(() => {
    if (!isEditMode) {
      const hoje = new Date();
      setDataCriacaoHeader(hoje.toLocaleDateString("pt-BR"));
    }
  }, [isEditMode]);

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

  useEffect(() => {
    const carregarDadosManutencao = async () => {
      let dados = location.state?.maintenanceToEdit;

      if (!isEditMode && location.state?.idVeiculo) {
        setIdVeiculoAtual(location.state.idVeiculo);
        return;
      }

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

      if (dados) {
        setIdVeiculoAtual(dados.id_veiculo);

        let dataFormatadaISO = "";
        if (dados.data_manutencao) {
          dataFormatadaISO = dados.data_manutencao.substring(0, 10);
        }

        setFormData({
          dataManutencao: dataFormatadaISO,
          quilometragem: dados.quilometragem?.toString() || "",
          valor: dados.custo || "",
          oficina: dados.oficina || "",
          pecas: dados.pecas || "",
          observacoes: dados.observacoes || "",
          fkIdTipoManutencao: dados.tipo_manutencao?.id?.toString() || ""
        });

        const dataCriacaoOriginal = dados.data || dados.data_criacao;
        if (dataCriacaoOriginal) {
          const dataCriacaoFormatada = new Date(dataCriacaoOriginal.replace(" ", "T"))
                                        .toLocaleDateString("pt-BR", { timeZone: "UTC" });
          setDataCriacaoHeader(dataCriacaoFormatada);
        }

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
    if (isReadOnly) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (isReadOnly) return;
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
    if (isReadOnly) return;
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
    if (isReadOnly) return;
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
    if (isReadOnly) return;
    if (!idUsuarioLogado) return alert("Usuário não identificado.");
    if (!idVeiculoAtual) return alert("Veículo não identificado."); 
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
      payload.append("fk_id_veiculo", idVeiculoAtual); 

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
        alert(isEditMode ? "Manutenção atualizada com sucesso!" : "Manutenção salva com sucesso!");
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
            {isEditMode ? (isReadOnly ? "Detalhes da Manutenção" : "Editar Manutenção") : "Nova Manutenção"}
          </h1>
          <p>Data de criação: {dataCriacaoHeader}</p>
        </header>

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
                disabled={isReadOnly}
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
                <Input type="date" name="dataManutencao" value={formData.dataManutencao} onChange={handleChange} disabled={isReadOnly} />
              </div>
              <div className="inputGroup">
                <label>KM</label>
                <Input type="number" name="quilometragem" value={formData.quilometragem} onChange={handleChange} disabled={isReadOnly} />
              </div>
              <div className="inputGroup">
                <label>Valor</label>
                <Input name="valor" value={formData.valor} onChange={handleChange} placeholder="Ex: 150.00" disabled={isReadOnly} />
              </div>
              <div className="inputGroup">
                <label>Oficina</label>
                <Input name="oficina" value={formData.oficina} onChange={handleChange} disabled={isReadOnly} />
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
                disabled={isReadOnly}
              />
            </div>

            {!isReadOnly && (
              <>
                <label htmlFor="file-upload" className="evidenceUpload">
                  <span>Anexar evidencias</span>
                  <Paperclip />
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
              </>
            )}

            <div className="imagePreviewGrid" style={{ marginTop: isReadOnly ? '1.5rem' : '0' }}>
              {images.map((img, index) => (
                <div key={index} className="imageItem">
                  <img src={img.url} alt="Preview" />
                  {!isReadOnly && (
                    <X className="removeBtn" onClick={() => handleRemoveImage(index)} size={18} />
                  )}
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
              disabled={isReadOnly}
            />

            <div className="buttonActionGroup">
              {isReadOnly ? (
                <Button 
                  className="saveMaintenence" 
                  text="Voltar" 
                  variant="primary" 
                  onClick={() => navigate(-1)} 
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <NavBar />
    </div>
  );
};

export default NewMaintenence;