import React, { useRef } from 'react';
import Modal from 'react-modal';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    width: '85%',
    textAlign: 'center',
};

const buttonStyle = {
    backgroundColor: '#555',
    color: '#fff',
    padding: '10px 15px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
};

const closeBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
};

const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Cor transparente
};

const OrcamentoModal = ({ isOpen, onRequestClose, onEnviarParaWhatsapp, products }) => {
    const fileInputRef = useRef(null);

    const handleEnviarParaWhatsapp = () => {


        const whatsappWebUrl = `https://web.whatsapp.com/send?text=Olá, aqui está o orçamento&phone=`;
        window.open(whatsappWebUrl);
        onRequestClose();

    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Orcamento Modal"
            style={{ overlay: overlayStyle, content: modalStyle }}
        >
            <button style={closeBtnStyle} onClick={onRequestClose}>
                &times;
            </button>
            <h2>Enviar para o WhatsApp</h2>
            <p>Seu orçamento está pronto para ser enviado para o WhatsApp. Selecione um arquivo PDF e clique no botão abaixo para confirmar.</p>
            <button style={buttonStyle} onClick={handleEnviarParaWhatsapp}>
                Enviar para o WhatsApp
            </button>
        </Modal>
    );
};

export default OrcamentoModal;
