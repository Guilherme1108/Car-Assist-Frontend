import "./Expenses.css";

import NavBar from "../../components/navBar/NavBar";
import { ChevronRight } from "lucide-react";
import Button from "../../components/button/Button";
import ModalGastos from "../../components/modalGastos/ModalGastos";
import { useEffect, useState } from "react";
import api from "../../services/api";

import { useNavigate, useLocation, useParams } from "react-router-dom";

const ExpensesScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

const vehicleData = location.state?.vehicleData

  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    let resultCategory = await api.get('categoria-gasto');
  }

  const getExpenses = async (id) => {
    let resultExpenses = await api.get(`gasto/veiculo/${id}`);
   console.log("RESPOSTA:", resultExpenses.data);
  setExpenses(resultExpenses.data.data.gasto);
  
  }



  useEffect(() => {
    if (vehicleData.id) {
      getExpenses(vehicleData.id);
    }
  }, [vehicleData]);

 
console.log(expenses)

const totalPorTipo = expenses.reduce((acc, gasto) => {
  const tipo = gasto.tipo_gasto.nome;

  if (!acc[tipo]) {
    acc[tipo] = 0;
  }

  acc[tipo] += Number(gasto.valor);

  return acc;
}, {});

  const handleInsertExpense = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="expensesScreen">
      <div className="headerExpenseScreen">
        <h1 className="expensesTitle">Gastos</h1>

        <div className="filterContainer">
          <div className="buttonExpenses">
            <button className="btnFilter active">Semanal</button>
            <button className="btnFilter inactive">Mensal</button>
          </div>
        </div>
      </div>

      <div className="expensesList">
  {Object.entries(totalPorTipo).map(([tipo, total]) => (
    <div
  key={tipo}
  className="expenseItem"
  onClick={() => navigate("/home/veiculo/gastos/categoria")}
>
  <div className="expenseLabel">{tipo}</div>

  <span className="expenseValue">
    R$ {total.toFixed(2)}
  </span>

  <ChevronRight />
</div>
  ))}
        <div className="expenseItem totalRow">
          <div className="expenseLabel totalLabel">Total</div>
          <span className="expenseValue totalValue">R$ 1380,00</span>
        </div>
      </div>

      <Button
        text="Inserir novo gasto"
        variant="primary"
        onClick={handleInsertExpense}
      ></Button>

      {isModalOpen && <ModalGastos onClose={() => setIsModalOpen(false)} />}

      <NavBar></NavBar>

    </div>
  );
};

export default ExpensesScreen;
