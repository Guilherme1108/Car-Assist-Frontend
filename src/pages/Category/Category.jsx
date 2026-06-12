import "./Category.css";
import NavBar from "../../components/navBar/NavBar";
import {
  ArrowLeft,
  EllipsisVertical,
  Wrench,
  House,
  User,
} from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";


const ExpensesDetail = () => {
  // const gastos = [
  //   { data: "25/02/2026", valor: "230,00" },
  //   { data: "25/02/2026", valor: "230,00" },
  //   { data: "25/02/2026", valor: "230,00" },
  // ];
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [gastos, setGastos] = useState([]);

  const tipoGastoId = location.state?.tipoGastoId;
  const nomeTipo = location.state?.nomeTipo;
  const vehicleId = location.state?.vehicleId;

  const getExpenses = async (vehicleId, tipoGastoId) => {
    let resultGasto = await api.get(`gasto/veiculo/${vehicleId}/gasto/${tipoGastoId}`);

    setGastos(resultGasto.data.data.gasto);

  }
  useEffect(() => {
    if (vehicleId && tipoGastoId) {
      getExpenses(vehicleId, tipoGastoId);
    }
  }, [vehicleId, tipoGastoId]);
  return (

    <div className="expenseCard">


      <h1>Gastos com {nomeTipo}</h1>

      <div className="expensesBox">
        {gastos.map((gasto, index) => (
          <div key={index}>
            <div className="expenseRow">
              <span><span>
                {new Date(gasto.data).toLocaleDateString("pt-BR")}
              </span></span>

              <div className="expenseValueContainer">
                <span>R$ {gasto.valor}</span>
                <EllipsisVertical size={20} />
              </div>
            </div>

            {index !== gastos.length - 1 && (
              <div className="expenseDivider" />
            )}
          </div>
        ))}
      </div>
      <NavBar></NavBar>
    </div>


  );
};

export default ExpensesDetail;