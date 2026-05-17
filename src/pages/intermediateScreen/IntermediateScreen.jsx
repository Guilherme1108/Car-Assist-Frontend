import React, { useState, useRef } from "react";
import './IntermediateScreen.css';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from '../../components/navBar/NavBar';
import { ImagePlus, X } from "lucide-react";

const IntermediateScreen = () => {
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

    const [carImage, setCarImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files;
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Apenas arquivos PNG ou JPEG são permitidos.");
            return;
        }
        setCarImage(URL.createObjectURL(file));
    };

    const handleRemoveImage = (e) => {
        if (e) e.preventDefault();
        if (carImage) URL.revokeObjectURL(carImage);
        setCarImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
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

    const handleConfirm = () => {
        if (activeTab === "acquire") {
            console.log("Enviando código de transferência:", transferCode);
        } else {
            console.log("Cadastrando veículo:", carData, "Imagem:", carImage);
        }
    };

    return (
        <div className="intermediateScreen">
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
                                        onChange={(e) => setTransferCode(e.target.value)}
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
                                            <button className="removePhotoBtn" onClick={handleRemoveImage}>
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
                                        <Input name="placa" value={carData.placa} onChange={handleChange} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Ano</label>
                                        <Input name="ano" value={carData.ano} onChange={handleChange} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Cor</label>
                                        <Input name="cor" value={carData.cor} onChange={handleChange} />
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

export default IntermediateScreen;