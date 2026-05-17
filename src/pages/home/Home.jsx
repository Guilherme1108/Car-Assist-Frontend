import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import imagemCarro from "../../assets/imagem_carro_card.jpg";
import { useNavigate } from "react-router-dom";
import { CopyPlus, ChevronLeft, ChevronRight, CarFront } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import CarCard from "../../components/CarCard/CarCard";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState([]);

  const [currentCarIndex, setCurrentCarIndex] = useState(0); 
  
  const carouselRef = useRef(null);

  useEffect(() => {
    setMyCars([
      { id: 1, name: "Civic SI", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 2, name: "Porshe 911", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 3, name: "Maclaren Senna", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 4, name: "Ferrari Puro Sangue", plate: "EXE3006", points: 100, image: imagemCarro },
    ]);
  }, []);


  const scrollToCar = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild?.offsetWidth || 300;
      const gap = 20;
      
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      
      setCurrentCarIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentCarIndex > 0) {
      scrollToCar(currentCarIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentCarIndex < myCars.length - 1) {
      scrollToCar(currentCarIndex + 1);
    }
  };

  return (
    <div className="homeScreen">
      {myCars.length > 0 && (
        <span className="backgorundCarName">{myCars[currentCarIndex].name}</span>
      )}

      <span className="titleHome">Garagem</span>

      <div className="containerScore">
        <div className="textsScore">
          <span className="garagePoints">80</span>
          <p className="textScore">Score da garagem</p>
        </div>
        <div className="bar"><div className="filledBar"></div></div>
      </div>

      <div className="carouselContainer">
        <button 
          className="carouselBtn prev" 
          onClick={scrollLeft} 
          disabled={currentCarIndex === 0}
          aria-label="Voltar"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="cards" ref={carouselRef} style={{ overflowX: 'hidden' }}>
          {myCars.map((car) => (
            <div key={car.id} className="carouselItem">
              <CarCard 
                car={car} 
                onNavigate={navigate} 
              />
            </div>
          ))}
        </div>


        <button 
          className="carouselBtn next" 
          onClick={scrollRight} 
          disabled={currentCarIndex === myCars.length - 1}
          aria-label="Avançar"
        >
          <ChevronRight size={32} />     
        </button>
      </div>

      <div className="addCarArea">
        <CarFront className="iconCarFront"></CarFront>
        <span className="textAddCar primaryText">Adicione um novo carro</span>
        <span className="textAddCar">Mantenha seu perfil sempre atualizado</span>
        <button className="addCarButton" 
        onClick={() => {
          navigate("./cadastrarveiculo")
        }}>
          <CopyPlus className="iconAddCarButton" size={18} />
          <p className="textScore">Adicionar Carro</p>  
        </button>
      </div>

      <NavBar/>
    </div>
  );
};

export default HomeScreen;