import "./Category.css";
import NavBar from "../../components/navBar/NavBar";
import { EllipsisVertical } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ModalGastos from "../../components/modalGastos/ModalGastos";

const ExpensesDetail = () => {
  const location = useLocation();

  const [gastos, setGastos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const tipoGastoId = location.state?.tipoGastoId;
  const nomeTipo = location.state?.nomeTipo;
  const vehicleId = location.state?.vehicleId;

  const getExpenses = async () => {
    try {
      const response = await api.get(
        `gasto/veiculo/${vehicleId}/gasto/${tipoGastoId}`
      );

      setGastos(response.data.data.gasto);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      const payload = {
        data_gasto: expenseData.date,
        valor: Number(expenseData.value),
        fk_id_veiculo: vehicleId,
        fk_id_categoria: Number(expenseData.category),
      };

      await api.put(
        `gasto/${selectedExpense.id}`,
        payload
      );

      await getExpenses();

      setSelectedExpense(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar gasto:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir este gasto?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`gasto/${id}`);

      setGastos((prev) =>
        prev.filter(
          (gasto) => gasto.id !== id
        )
      );

      setSelectedExpense(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Erro ao excluir gasto:",
        error
      );
    }
  };

  useEffect(() => {
    if (vehicleId && tipoGastoId) {
      getExpenses();
    }
  }, [vehicleId, tipoGastoId]);

  return (
    <div className="expenseCard">
      <h1>Gastos com {nomeTipo}</h1>

      <div className="expensesBox">
        {gastos.length === 0 ? (
          <div className="emptyExpenses">
            <h2>Nenhum gasto encontrado</h2>

            <p>
              Adicione um gasto nesta categoria
              para visualizar os registros aqui.
            </p>
          </div>
        ) : (
          gastos.map((gasto, index) => (
            <div
              key={gasto.id}
              className="expenseItemContainer"
            >
              <div className="expenseRow">
                <span>
                  {new Date(
                    gasto.data
                  ).toLocaleDateString(
                    "pt-BR"
                  )}
                </span>

                <div className="expenseValueContainer">
                  <span>
                    R${" "}
                    {Number(
                      gasto.valor
                    ).toFixed(2)}
                  </span>

                  <EllipsisVertical
                    size={20}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedExpense(
                        gasto
                      );
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              </div>

              {index !==
                gastos.length - 1 && (
                <div className="expenseDivider" />
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <ModalGastos
          expense={selectedExpense}
          onClose={() => {
            setSelectedExpense(null);
            setIsModalOpen(false);
          }}
          onSave={handleUpdateExpense}
          onDelete={handleDeleteExpense}
        />
      )}

      <NavBar />
    </div>
  );
};

export default ExpensesDetail;