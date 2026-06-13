import "./ModalGastos.css";
import { useState, useEffect } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import api from "../../services/api";
import { OctagonX } from "lucide-react";

const ModalGastos = ({
  onClose,
  onSave,
  onDelete,
  expense = null,
}) => {
  const [expenseData, setExpenseData] = useState({
    category: "",
    date: "",
    value: "",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(expenseData);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categoria-gasto");

        setCategories(
          response.data.data.tipo_categoria
        );
      } catch (error) {
        console.error(
          "Erro ao buscar categorias:",
          error
        );
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (expense) {
      setExpenseData({
        category:
          expense.tipo_gasto?.id || "",

        date: expense.data
          ? expense.data.split("T")[0]
          : "",

        value: expense.valor || "",
      });
    }
  }, [expense]);

  return (
    <div className="modalOverlay">
      <div className="modalGastos">
        <div className="topModal">
          <h3 className="titleModalGastos">
            {expense
              ? "Editar Gasto"
              : "Inserir Gasto"}
          </h3>

          <button
            className="btnCloseModal"
            onClick={onClose}
          >
            <OctagonX size={32} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="formModalGastos"
        >
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
              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nome_categoria}
              </option>
            ))}
          </select>

          <label>Data</label>

          <Input
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleChange}
          />

          <label>Valor (R$)</label>

          <Input
            type="number"
            placeholder="0.00"
            name="value"
            value={expenseData.value}
            onChange={handleChange}
          />

          <div className="bottomModalGastos">
            {expense && (
              <Button
                text="Excluir"
                variant="secondary"
                type="button"
                onClick={() =>
                  onDelete &&
                  onDelete(expense.id)
                }
              />
            )}

            <Button
              text={
                expense
                  ? "Atualizar"
                  : "Salvar"
              }
              variant="primary"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGastos;