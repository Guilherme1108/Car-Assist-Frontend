import "./ModalGastos.css";
// 1. CORRIGIDO: Adicionado o useEffect no import do React
import { useState, useEffect } from "react"; 
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import api from "../../services/api";

const ModalGastos = ({ onClose }) => {
  const [expenseData, setExpenseData] = useState({
    category: "",
    date: "",
    value: "",
  });

  // 2. CORRIGIDO: Declarando o estado para guardar as categorias da API
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do gasto salvos:", expenseData);
    onClose();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/categoria-gasto`);
        setCategories(response.data.data.tipo_categoria);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="modalOverlay">
      <div className="modalGastos">
        <div className="topModal">
          <h3 className="titleModalGastos">Inserir Gasto</h3>
          <button className="btnCloseModal" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="formModalGastos">
          <label>Categoria</label>
          
          <select
            name="category" 
            value={expenseData.category}
            onChange={handleChange}
            className="classSelectCor"
          >
            <option value="" disabled>
              Escolha um gasto
            </option>
            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome_categoria}
              </option>
            ))}
          </select>

          <label>Data</label>
          <Input
            type="date"
            placeholder=""
            name="date"
            value={expenseData.date}
            onChange={handleChange}
          />

          <label>Valor(R$)</label>
          <Input
            type="number"
            placeholder="0.00"
            name="value"
            value={expenseData.value}
            onChange={handleChange}
          />

          <div className="bottomModalGastos">
            <Button text="Salvar" variant="primary"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGastos;