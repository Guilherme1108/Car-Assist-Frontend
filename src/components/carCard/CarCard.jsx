import React from "react";
import "../../pages/home/Home.css";

const CarCard = ({car, onNavigate, scoreClass}) => {
  return (
    <div
      className="card"
      onClick={() => onNavigate("/home/veiculo", {state: {vehicleData: car}})}
    >
      <img className="imgCar" src={car.foto_veiculo} alt={car.modelo} />

      <span className="carName">{car.modelo}</span>

      <div className="lowerInformations">
        <span className="carPlate">{car.placa}</span>
        <span className={`carPoints ${scoreClass}`}>{car.points}</span>
      </div>

      <div className="alinhamentoBtn"></div>
    </div>
  );
};

export default CarCard;
