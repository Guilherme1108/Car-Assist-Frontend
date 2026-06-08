import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import defaultCarImage from "../../assets/carNotFOund.png";
import { useNavigate } from "react-router-dom";
import { CopyPlus, ChevronLeft, ChevronRight, CarFront } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import CarCard from "../../components/carCard/CarCard.jsx";
import api from "../../services/api";

const HomeScreen = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);

  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const storageUser = localStorage.getItem("user");

        if (!storageUser) {
          alert("Sessão expirada. Faça login novamente.");
          navigate("/");
          return;
        }

        const loggedUser = JSON.parse(storageUser);
        const userId = loggedUser.id;

        const response = await api.get(`/usuario-veiculo/${userId}`);

        if (response.data && response.data.status) {
          const userVehicleRelations =
            response.data.data?.usuario_veiculo || [];

          const parsedVehicles = userVehicleRelations.map((relation) => {
            const vehicle = relation.veiculo;

            return {
              id: vehicle.id,
              modelo: vehicle.modelo,
              marca: vehicle.marca,
              cor: vehicle.cor,
              ano: vehicle.ano,
              placa: vehicle.placa,
              quilometragem: vehicle.quilometragem,
              points: parseFloat(vehicle.score) || 0,
              foto_veiculo:
                vehicle.foto && vehicle.foto !== ""
                  ? vehicle.foto
                  : defaultCarImage,
            };
          });

          setVehicles(parsedVehicles);
        }
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);

        if (error.response?.status === 404) {
          setVehicles([]);
        } else {
          alert("Não foi possível conectar à sua garagem.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [navigate]);

  const calculateGarageAverageScore = () => {
    if (vehicles.length === 0) return 0;

    const totalScore = vehicles.reduce(
      (accumulator, vehicle) => accumulator + vehicle.points,
      0
    );

    return Math.round(totalScore / vehicles.length);
  };

  const getScoreColorClass = (score) => {
    if (score < 50) return "low-score";
    if (score <= 70) return "medium-score";

    return "high-score";
  };

  const garageAverageScore = calculateGarageAverageScore();
  const scoreColorClass = getScoreColorClass(garageAverageScore);

  const scrollToVehicle = (index) => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.firstChild?.offsetWidth || 300;

      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });

      setCurrentVehicleIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentVehicleIndex > 0) {
      scrollToVehicle(currentVehicleIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentVehicleIndex < vehicles.length - 1) {
      scrollToVehicle(currentVehicleIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="homeScreen loadingContainer">
        <span className="titleHome">
          Carregando Garagem...
        </span>
      </div>
    );
  }

  return (
    <div className="homeScreen">
      {vehicles.length > 0 &&
        vehicles[currentVehicleIndex] && (
          <span className="backgorundCarName naoSelecionavel">
            {vehicles[currentVehicleIndex].modelo}
          </span>
        )}

      <span className="titleHome">Garagem</span>

      <div className="containerScore">
        <div className="textsScore">
          <span className={`garagePoints ${scoreColorClass}`}>
            {garageAverageScore}
          </span>

          <p className="textScore">
            Score da garagem
          </p>
        </div>

        <div className="bar">
          <div
            className={`filledBar ${scoreColorClass}`}
            style={{
              width: `${garageAverageScore}%`,
            }}
          ></div>
        </div>
      </div>

      {vehicles.length > 0 ? (
        <div className="carouselContainer">
          <button
            className="carouselBtn prev"
            onClick={scrollLeft}
            disabled={currentVehicleIndex === 0}
            aria-label="Voltar"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="cards" ref={carouselRef}>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="carouselItem"
              >
                <CarCard
                  car={vehicle}
                  onNavigate={navigate}
                  scoreClass={scoreColorClass}
                />
              </div>
            ))}
          </div>

          <button
            className="carouselBtn next"
            onClick={scrollRight}
            disabled={
              currentVehicleIndex === vehicles.length - 1
            }
            aria-label="Avançar"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      ) : (
        <div className="emptyGarageText">
          <p>
            Você ainda não possui veículos cadastrados
            na sua garagem.
          </p>
        </div>
      )}

      <div className="addCarArea">
        <CarFront className="iconCarFront" />

        <span className="textAddCar primaryText">
          Adicione um novo carro
        </span>

        <span className="textAddCar">
          Mantenha seu perfil sempre atualizado
        </span>

        <button
          className="addCarButton"
          onClick={() => {
            navigate("./cadastrarveiculo");
          }}
        >
          <CopyPlus
            className="iconAddCarButton"
            size={18}
          />

          <p className="textScore">
            Adicionar Carro
          </p>
        </button>
      </div>

      <NavBar />
    </div>
  );
};

export default HomeScreen;