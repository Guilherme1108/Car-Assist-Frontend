import React, { useState, useRef } from "react";
import './NewCar.css';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from '../../components/navBar/NavBar';
import { ImagePlus, X } from "lucide-react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const NewCarScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("acquire");
    const [isFormVisibleMobile, setIsFormVisibleMobile] = useState(false);

    const [transferCode, setTransferCode] = useState("");
    const [carData, setCarData] = useState({
        modelo: "",
        marca: "",
        placa: "",
        ano: "",
        cor: ""
    });

    const VEHICLE_COLORS = [
        { value: 'AMARELO', label: 'Amarelo' },
        { value: 'AZUL', label: 'Azul' },
        { value: 'BRANCO', label: 'Branco' },
        { value: 'CINZA', label: 'Cinza' },
        { value: 'DOURADO', label: 'Dourado' },
        { value: 'LARANJA', label: 'Laranja' },
        { value: 'MARROM', label: 'Marrom' },
        { value: 'PRATA', label: 'Prata' },
        { value: 'PRETO', label: 'Preto' },
        { value: 'ROSA', label: 'Rosa' },
        { value: 'ROXO', label: 'Roxo' },
        { value: 'VERDE', label: 'Verde' },
        { value: 'VERMELHO', label: 'Vermelho' },
        { value: 'FANTASIA', label: 'Fantasia (Multicor)' }
    ];

    const [carImage, setCarImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let treatedValue = value;

        if (name === "placa") {
            treatedValue = value.toUpperCase();
        }

        if (name === "ano") {
            treatedValue = value.replace(/\D/g, "");
        }

        setCarData({ ...carData, [name]: treatedValue });
    };

    const handleImageChange = (e) => {
        if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
            return;
        }

        const files = Array.from(e.target.files);
        const file = files[0];

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Apenas arquivos PNG ou JPEG são permitidos.");
            e.target.value = "";
            return;
        }

        if (carImage) {
            URL.revokeObjectURL(carImage);
        }

        setCarImage(URL.createObjectURL(file));
        e.target.value = "";
    };

    const handleRemoveImage = (e) => {
        if (e) e.preventDefault();
        if (carImage) {
            URL.revokeObjectURL(carImage);
        }
        setCarImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSelectTabMobile = (tabName) => {
        setActiveTab(tabName);
        setIsFormVisibleMobile(true);
    };

    const handleCancel = () => {
        setCarData({ modelo: "", marca: "", placa: "", ano: "", cor: "" });
        setTransferCode("");
        handleRemoveImage();
        setIsFormVisibleMobile(false);
    };

    const handleConfirm = async () => {
        if (activeTab === "acquire") {
            console.log("Enviando código de transferência:", transferCode);
        } else {
            if (!carData.modelo || !carData.marca || !carData.placa || !carData.cor || !carData.ano) {
                alert("Por favor, preencha todos os campos do formulário.");
                return;
            }

            if (carData.ano.length < 4) {
                alert("O ano precisa ter exatamente 4 dígitos.");
                return;
            }

            try {
                const storageUser = localStorage.getItem("user");

                if (!storageUser) {
                    alert("Usuário não identificado. Faça login novamente.");
                    return;
                }

                const userLogged = JSON.parse(storageUser);

                const payloadVeiculo = {
                    id_usuario: userLogged.id,
                    placa: carData.placa,
                    modelo: carData.modelo,
                    marca: carData.marca,
                    cor: carData.cor,
                    ano: parseInt(carData.ano, 10),
                    vinculo: {}, 
                    foto_veiculo: carImage || "https://exemplo.com/imagens/carro-padrao.jpg", 
                    is_ativo: true
                };

                const response = await api.post("/veiculo-usuario", payloadVeiculo);

                if (response.data && response.data.status) {
                    alert("Veículo cadastrado com sucesso!");
                    handleCancel();
                    navigate("/home");
                } else {
                    alert(response.data?.message || "Erro ao cadastrar o veículo.");
                }

            } catch (error) {
                console.error("Erro na requisição de cadastro do carro:", error);
                alert(
                    error.response?.data?.message || 
                    "Não foi possível conectar ao servidor para cadastrar o veículo."
                );
            }
        }
    };

    return (
        <div className="newCarScreen">
            <main className="mainContainer">
                <h1 className="screenTitle">ADQUIRIR CARRO</h1>

                <div className="contentCard">
                    <div className={`buttonsArea ${isFormVisibleMobile ? 'hideOnMobile' : ''}`}>
                        <Button
                            className={`acquireVehicleButton ${activeTab === 'acquire' ? 'active' : ''}`}
                            text="ADQUIRIR"
                            variant={activeTab === 'acquire' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setActiveTab("acquire");
                                handleSelectTabMobile("acquire");
                            }}
                        />
                        <Button
                            className={`registerVehicleButton ${activeTab === 'register' ? 'active' : ''}`}
                            text="CADASTRAR"
                            variant={activeTab === 'register' ? 'primary' : 'secondary'}
                            onClick={() => {
                                setActiveTab("register");
                                handleSelectTabMobile("register");
                            }}
                        />
                    </div>

                    <div className={`formsArea ${isFormVisibleMobile ? 'showOnMobile' : 'hideOnMobile'}`}>
                        {activeTab === "acquire" && (
                            <div className="codeVehicle">
                                <p className="instructionText">
                                    Digite o código gerado pelo dono para confirmar a transferência
                                </p>
                                <div className="formInputGroup">
                                    <Input
                                        name="transferCode"
                                        value={transferCode}
                                        onChange={(e) => setTransferCode(e.target.value.toUpperCase())}
                                        placeholder="Ex: XYZ-1234"
                                    />
                                </div>
                                <div className="formActionButtons">
                                    <Button text="Cancelar" variant="secondary" onClick={handleCancel} className="btnCancel" />
                                    <Button text="Confirmar" variant="primary" onClick={handleConfirm} className="btnConfirm" />
                                </div>
                            </div>
                        )}

                        {activeTab === "register" && (
                            <div className="registerVehicle">
                                <div className="photoUploadContainer">
                                    <input
                                        type="file"
                                        id="car-photo"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    />

                                    {!carImage ? (
                                        <label htmlFor="car-photo" className="photoPlaceholder">
                                            <ImagePlus size={54} strokeWidth={1.2} className="iconImagePlus" />
                                        </label>
                                    ) : (
                                        <div className="carPhotoPreview">
                                            <img src={carImage} alt="Preview" />
                                            <button className="removeBtn" onClick={handleRemoveImage}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <form className="carRegistrationForm" onSubmit={(e) => e.preventDefault()}>
                                    <div className="formInputGroup">
                                        <label>Modelo</label>
                                        <Input name="modelo" value={carData.modelo} onChange={handleChange} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Marca</label>
                                        <Input name="marca" value={carData.marca} onChange={handleChange} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Placa</label>
                                        <Input
                                            name="placa"
                                            value={carData.placa}
                                            onChange={handleChange}
                                            maxLength={7}
                                        />
                                    </div>

                                    <div className="formInputGroup">
                                        <label>Ano</label>
                                        <Input
                                            name="ano"
                                            value={carData.ano}
                                            onChange={handleChange}
                                            inputMode="numeric"
                                            maxLength={4}
                                        />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Cor</label>
                                        <select
                                            name="cor"
                                            value={carData.cor}
                                            onChange={handleChange}
                                            className="classSelectCor"
                                        >
                                            <option value="" disabled></option>
                                            {VEHICLE_COLORS.map((cor) => (
                                                <option key={cor.value} value={cor.value}>
                                                    {cor.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="formActionButtons">
                                        <Button text="Cancelar" variant="secondary" onClick={handleCancel} className="btnCancel" />
                                        <Button text="Confirmar" variant="primary" onClick={handleConfirm} className="btnConfirm" />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <NavBar />
        </div>
    );
};

export default NewCarScreen;