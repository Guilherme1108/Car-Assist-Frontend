import React, { useState } from "react";
import "./NewMaintenence.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from "../../components/navBar/NavBar";

const NewMaintenence = () => {
  const [formData, setFormData] = useState({
    dataManutencao: "",
    quilometragem: "",
    valor: "",
    oficina: "",
    pecas: "",
    observacoes: ""
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("Máximo de 3 fotos.");
      return;
    }
    const newImages = files.map(file => ({ url: URL.createObjectURL(file) }));
    setImages([...images, ...newImages]);
  };

  return (
    <div className="newMaintenenceScreen">

      <main className="mainContent">
        <header className="headerMain">
          <h1>Nova Manutenção no <span className="carName">Civic SI</span></h1>
          <p>Data de criação: 27/04/2026</p>
        </header>

        <div className="formMaintenence">
          <section className="cardSection leftColumn">
            <h3>Dados da Manutenção</h3>
            <div className="inputGroup">
              <label>Tipo da Manutenção</label>
              <select className="typeMaintenanceOption" name="typeMaintenance">
                <option value="">Selecione...</option>
              </select>
            </div>

            <div className="dataGrid">
              <div className="inputGroup">
                <label>Data</label>
                <Input name="dataManutencao" value={formData.dataManutencao} onChange={handleChange} />
              </div>
              <div className="inputGroup">
                <label>KM</label>
                <Input name="quilometragem" value={formData.quilometragem} onChange={handleChange} />
              </div>
              <div className="inputGroup">
                <label>Valor</label>
                <Input name="valor" value={formData.valor} onChange={handleChange} />
              </div>
              <div className="inputGroup">
                <label>Oficina</label>
                <Input name="oficina" value={formData.oficina} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* COLUNA DIREITA: Detalhes e Fotos */}
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
              <i className="icon-paperclip">📎</i>
            </label>
            <input id="file-upload" type="file" multiple onChange={handleImageChange} style={{display: 'none'}} />

            <div className="imagePreviewGrid">
              {images.map((img, index) => (
                <div key={index} className="imageItem">
                  <img src={img.url} alt="Preview" />
                  <button className="removeBtn" onClick={() => {/* função remover */}}>X</button>
                </div>
              ))}
            </div>
          </section>

          {/* LINHA INFERIOR: Observações */}
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
              <Button className="btnExcluir"></Button>
              <Button className="btnSalvar"></Button>
            </div>
          </section>
        </div>
      </main>
      
      <NavBar></NavBar>
    </div>
  );
};

export default NewMaintenence;