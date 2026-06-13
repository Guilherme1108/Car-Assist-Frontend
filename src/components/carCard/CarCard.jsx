import React, { useState } from "react";
import "../../pages/home/Home.css";

const CarCard = ({car, onNavigate, scoreClass}) => {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <div
      className="card"
      onClick={() => onNavigate("/home/veiculo", {state: {vehicleData: car}})}
    >
      {!car.foto_veiculo || erroImagem ? (
        <div className="imgCar sem-imagem">
          <span>Erro ao carregar imagem</span>
        </div>
      ) : (
        <img 
          className="imgCar" 
          src={car.foto_veiculo} 
          alt={car.modelo} 
          onError={() => setErroImagem(true)}
        />
      )}

      <span className="carName">{car.modelo}</span>

      <div className="lowerInformations">
        <span className="carPlate">{car.placa}</span>
        <span className={`carPoints ${scoreClass}`}>{car.points}</span>
      </div>

    </div>
  );
};

export default CarCard;