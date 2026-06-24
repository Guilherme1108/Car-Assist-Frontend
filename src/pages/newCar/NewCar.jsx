import React, { useState, useRef, useEffect } from "react";
import './NewCar.css';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from '../../components/navBar/NavBar';
import { ImagePlus, X } from "lucide-react";
import api from "../../services/api";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { MySwal } from "../../config/swal";

const NewCarScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const editingVehicle = location.state?.vehicleData;
    const isEditMode = !!id;

    const [activeTab, setActiveTab] = useState(isEditMode ? "register" : "");
    const [isFormVisibleMobile, setIsFormVisibleMobile] = useState(isEditMode);
    const [isLoading, setIsLoading] = useState(false);

    const [transferCode, setTransferCode] = useState("");
    const [carData, setCarData] = useState({
        modelo: "",
        marca: "",
        placa: "",
        ano: "",
        cor: "",
        quilometragem: ""
    });

    const [carImage, setCarImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isEditMode && editingVehicle) {
            setCarData({
                modelo: editingVehicle.modelo || "",
                marca: editingVehicle.marca || "",
                placa: editingVehicle.placa || "",
                ano: editingVehicle.ano?.toString() || "",
                cor: editingVehicle.cor || "",
                quilometragem: editingVehicle.quilometragem?.toString() || ""
            });

            if (editingVehicle.foto_veiculo && !editingVehicle.foto_veiculo.includes("carNotFOund")) {
                setCarImage(editingVehicle.foto_veiculo.replace("localhost", "127.0.0.1"));
            }
        }
    }, [isEditMode, editingVehicle]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let treatedValue = value;

        if (name === "placa") treatedValue = value.toUpperCase();
        if (name === "ano" || name === "quilometragem") treatedValue = value.replace(/\D/g, "");

        setCarData({ ...carData, [name]: treatedValue });
    };

    const handleImageChange = async (e) => {
        if (!e || !e.target || !e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            await MySwal.fire({
                icon: "warning",
                title: "Formato inválido",
                text: "Apenas arquivos PNG ou JPEG são permitidos",
            });
            e.target.value = "";
            return;
        }

        if (carImage && !carImage.includes("http")) {
            URL.revokeObjectURL(carImage);
        }

        setCarImage(URL.createObjectURL(file));
        setImageFile(file);
        e.target.value = "";
    };

    const handleRemoveImage = (e) => {
        if (e) e.preventDefault();
        if (carImage && !carImage.includes("http")) {
            URL.revokeObjectURL(carImage);
        }
        setCarImage(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSelectTabMobile = (tabName) => {
        setActiveTab(tabName);
        setIsFormVisibleMobile(true);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleDelete = async () => {
        const result = await MySwal.fire({
            icon: "warning",
            title: "Excluir veículo",
            text: "Tem certeza que deseja excluir este veículo e todo o seu histórico?",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        setIsLoading(true);
        try {
            const response = await api.delete(`/veiculo/${id}`);

            if (response.data?.status || response.status === 200) {
                await MySwal.fire({
                    icon: "success",
                    title: "Veículo excluído",
                    text: "O veículo foi excluído com sucesso",
                    confirmButtonText: "Ok",
                });
                navigate("/home");
            } else {
                await MySwal.fire({
                    icon: "error",
                    title: "Erro ao excluir",
                    text: response.data?.message || "Erro ao excluir veículo",
                });
            }
        } catch (error) {
            await MySwal.fire({
                icon: "error",
                title: "Erro de conexão",
                text: error.response?.data?.message || "Falha na conexão ao tentar excluir",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (activeTab === "acquire") {
            if (!transferCode) {
                await MySwal.fire({
                    icon: "warning",
                    title: "Código obrigatório",
                    text: "Por favor, digite o código de transferência",
                });
                return;
            }

            try {
                const storageUser = localStorage.getItem("user");
                if (!storageUser) {
                    await MySwal.fire({
                        icon: "error",
                        title: "Erro de sessão",
                        text: "Usuário não identificado",
                    });
                    return;
                }

                const userLogged = JSON.parse(storageUser);
                const payload = { codigo_verificacao: transferCode, id_usuario_destino: userLogged.id };
                const response = await api.post("/transferencia/aceitar", payload);

                if (response.data && (response.data.status === true || response.data.status_code === 200)) {
                    await MySwal.fire({
                        icon: "success",
                        title: "Veículo adquirido!",
                        text: "O veículo foi adquirido com sucesso",
                        confirmButtonText: "Ir para garagem",
                    });
                    navigate("/home");
                } else {
                    await MySwal.fire({
                        icon: "error",
                        title: "Erro ao adquirir",
                        text: response.data?.message || "Erro ao adquirir o veículo",
                    });
                }
            } catch (error) {
                await MySwal.fire({
                    icon: "error",
                    title: "Código inválido",
                    text: error.response?.data?.message || "Código inválido ou erro no servidor",
                });
            }
        } else {
            if (!carData.modelo || !carData.marca || !carData.placa || !carData.cor || !carData.ano || !carData.quilometragem) {
                await MySwal.fire({
                    icon: "warning",
                    title: "Campos obrigatórios",
                    text: "Por favor, preencha todos os campos do formulário",
                });
                return;
            }

            if (carData.ano.length < 4) {
                await MySwal.fire({
                    icon: "warning",
                    title: "Ano inválido",
                    text: "O ano precisa ter exatamente 4 dígitos",
                });
                return;
            }

            setIsLoading(true);
            try {
                const storageUser = localStorage.getItem("user");
                if (!storageUser) {
                    await MySwal.fire({
                        icon: "error",
                        title: "Erro de sessão",
                        text: "Usuário não identificado",
                    });
                    setIsLoading(false);
                    return;
                }
                const userLogged = JSON.parse(storageUser);

                const formData = new FormData();
                formData.append("placa", carData.placa);
                formData.append("modelo", carData.modelo);
                formData.append("marca", carData.marca);
                formData.append("cor", carData.cor);
                formData.append("ano", carData.ano);
                formData.append("quilometragem", carData.quilometragem);

                if (imageFile) {
                    formData.append("foto_veiculo", imageFile);
                } else if (isEditMode && carImage) {
                    const res = await fetch(carImage);
                    const blob = await res.blob();
                    formData.append("foto_veiculo", blob, "foto_mantida.jpg");
                } else {
                    await MySwal.fire({
                        icon: "warning",
                        title: "Foto obrigatória",
                        text: "A foto do veículo é obrigatória",
                    });
                    setIsLoading(false);
                    return;
                }

                if (!isEditMode) {
                    formData.append("id_usuario", userLogged.id);
                    formData.append("is_ativo", true);
                    formData.append("vinculo", JSON.stringify({}));
                }

                const url = isEditMode ? `/veiculo/${id}` : "/veiculo-usuario";
                const response = isEditMode
                    ? await api.put(url, formData)
                    : await api.post(url, formData);

                if (response.data && (response.data.status || response.status === 200)) {
                    await MySwal.fire({
                        icon: "success",
                        title: isEditMode ? "Veículo atualizado!" : "Veículo cadastrado!",
                        text: isEditMode
                            ? "As informações foram salvas com sucesso"
                            : "O veículo foi cadastrado com sucesso",
                        confirmButtonText: "Ir para garagem",
                    });
                    navigate("/home");
                } else {
                    await MySwal.fire({
                        icon: "error",
                        title: "Erro ao salvar",
                        text: response.data?.message || "Erro ao salvar o veículo",
                    });
                }
            } catch (error) {
                await MySwal.fire({
                    icon: "error",
                    title: "Erro de conexão",
                    text: error.response?.data?.message || "Não foi possível conectar ao servidor",
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="newCarScreen">
            <main className="mainContainer">
                <h1 className="screenTitle">{isEditMode ? "EDITAR VEÍCULO" : "ADQUIRIR CARRO"}</h1>

                <div className="contentCard">
                    {!isEditMode && (
                        <div className={`buttonsArea ${isFormVisibleMobile ? 'hideOnMobile' : ''}`}>
                            <Button
                                className={`acquireVehicleButton ${activeTab === 'acquire' ? 'active' : ''}`}
                                text="ADQUIRIR"
                                variant={activeTab === 'acquire' ? 'primary' : 'secondary'}
                                onClick={() => handleSelectTabMobile("acquire")}
                            />
                            <Button
                                className={`registerVehicleButton ${activeTab === 'register' ? 'active' : ''}`}
                                text="CADASTRAR"
                                variant={activeTab === 'register' ? 'primary' : 'secondary'}
                                onClick={() => handleSelectTabMobile("register")}
                            />
                        </div>
                    )}

                    <div className={`formsArea ${isFormVisibleMobile ? 'showOnMobile' : 'hideOnMobile'}`}>

                        {activeTab === "acquire" && !isEditMode && (
                            <div className="codeVehicle">
                                <p className="instructionText">Digite o código gerado pelo proprietário para confirmar a transferência</p>
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
                                            <ImagePlus size={100} strokeWidth={1.2} className="iconImagePlus" />
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
                                        <Input name="placa" value={carData.placa} onChange={handleChange} maxLength={7} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Ano</label>
                                        <Input name="ano" value={carData.ano} onChange={handleChange} inputMode="numeric" maxLength={4} />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Quilometragem (Km)</label>
                                        <Input name="quilometragem" value={carData.quilometragem} onChange={handleChange} inputMode="numeric" placeholder="" />
                                    </div>
                                    <div className="formInputGroup">
                                        <label>Cor</label>
                                        <select name="cor" value={carData.cor} onChange={handleChange} className="classSelectCor">
                                            <option value="" disabled></option>
                                            {VEHICLE_COLORS.map((cor) => (
                                                <option key={cor.value} value={cor.value}>{cor.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {isEditMode ? (
                                        <div className="formActionButtons" style={{ gap: '10px' }}>
                                            <Button text="Excluir" variant="secondary" onClick={handleDelete} className="btnCancel" style={{ borderColor: 'red', color: 'red' }} disabled={isLoading} />
                                            <Button text={isLoading ? "Salvando..." : "Salvar"} variant="primary" onClick={handleConfirm} className="btnConfirm" disabled={isLoading} />
                                        </div>
                                    ) : (
                                        <div className="formActionButtons">
                                            <Button text="Cancelar" variant="secondary" onClick={handleCancel} className="btnCancel" disabled={isLoading} />
                                            <Button text={isLoading ? "Salvando..." : "Confirmar"} variant="primary" onClick={handleConfirm} className="btnConfirm" disabled={isLoading} />
                                        </div>
                                    )}
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