import "./Expenses.css";

import NavBar from "../../components/navBar/NavBar";
import { ChevronRight } from "lucide-react";
import Button from "../../components/button/Button";
import ModalGastos from "../../components/modalGastos/ModalGastos";
import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import { useNavigate, useLocation } from "react-router-dom";

const ExpensesScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");

  const vehicleData = location.state?.vehicleData;

  const getCategory = async () => {
    try {
      const response = await api.get("categoria-gasto");

      setCategories(response.data.data.tipo_categoria);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const getExpenses = async (vehicleId) => {
    try {
      const response = await api.get(`gasto/veiculo/${vehicleId}`);

      setExpenses(response.data.data.gasto);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (vehicleData?.id) {
      getExpenses(vehicleData.id);
    }
  }, [vehicleData]);

  const filteredExpenses = useMemo(() => {
    if (filter === "all") {
      return expenses;
    }

    const today = new Date();

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.data);

      const diffTime =
        today.getTime() - expenseDate.getTime();

      const diffDays =
        diffTime / (1000 * 60 * 60 * 24);

      if (filter === "week") {
        return diffDays <= 7;
      }

      if (filter === "month") {
        return diffDays <= 30;
      }

      return true;
    });
  }, [expenses, filter]);

  const totalPorTipo = useMemo(() => {
    const resultado = {};

    categories.forEach((categoria) => {
      resultado[categoria.id] = {
        id: categoria.id,
        nome: categoria.nome_categoria,
        total: 0,
      };
    });

    filteredExpenses.forEach((gasto) => {
      const categoriaId = gasto.tipo_gasto?.id;

      if (resultado[categoriaId]) {
        resultado[categoriaId].total += Number(
          gasto.valor
        );
      }
    });

    return resultado;
  }, [categories, filteredExpenses]);

  const totalGeral = Object.values(
    totalPorTipo
  ).reduce(
    (acc, categoria) => acc + categoria.total,
    0
  );

  const handleCreateExpense = async (
    expenseData
  ) => {
    try {
      const payload = {
        data_gasto: expenseData.date,
        valor: Number(expenseData.value),
        fk_id_veiculo: vehicleData.id,
        fk_id_categoria: Number(
          expenseData.category
        ),
      };

      await api.post("gasto", payload);

      await getExpenses(vehicleData.id);

      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Erro ao cadastrar gasto:",
        error
      );
    }
  };

  const handleInsertExpense = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="expensesScreen">
      <div className="headerExpenseScreen">
        <h1 className="expensesTitle">
          Gastos
        </h1>

        <div className="filterContainer">
          <div className="buttonExpenses">
            <button
              className={`btnFilter ${
                filter === "all"
                  ? "active"
                  : "inactive"
              }`}
              onClick={() =>
                setFilter("all")
              }
            >
              Todos
            </button>

            <button
              className={`btnFilter ${
                filter === "week"
                  ? "active"
                  : "inactive"
              }`}
              onClick={() =>
                setFilter("week")
              }
            >
              Semanal
            </button>

            <button
              className={`btnFilter ${
                filter === "month"
                  ? "active"
                  : "inactive"
              }`}
              onClick={() =>
                setFilter("month")
              }
            >
              Mensal
            </button>
          </div>
        </div>
      </div>

      <div className="expensesList">
        {Object.values(totalPorTipo).map(
          (categoria) => (
            <div
              key={categoria.id}
              className="expenseItem"
              onClick={() =>
                navigate(
                  "/home/veiculo/gastos/categoria",
                  {
                    state: {
                      tipoGastoId:
                        categoria.id,
                      nomeTipo:
                        categoria.nome,
                      vehicleId:
                        vehicleData?.id,
                    },
                  }
                )
              }
            >
              <div className="expenseLabel">
                {categoria.nome}
              </div>

              <span className="expenseValue">
                R${" "}
                {categoria.total.toFixed(
                  2
                )}
              </span>

              <ChevronRight />
            </div>
          )
        )}

        <div className="expenseItem totalRow">
          <div className="expenseLabel totalLabel">
            Total
          </div>

          <span className="expenseValue totalValue">
            R$ {totalGeral.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        text="Inserir novo gasto"
        variant="primary"
        onClick={handleInsertExpense}
      />

      {isModalOpen && (
        <ModalGastos
          onClose={() =>
            setIsModalOpen(false)
          }
          onSave={handleCreateExpense}
        />
      )}

      <NavBar />
    </div>
  );
};

export default ExpensesScreen;