import React, { useState, useRef } from 'react';
import styles from './ProductCrud.module.scss';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ nome: '', preço: '', quantidade: '' });
    const [showGeneratePDFButton, setShowGeneratePDFButton] = useState(false);
    const [totalGeral, setTotalGeral] = useState(0);

    const pdfRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleAddProduct = () => {
        // Verifica se todos os campos estão preenchidos e não são nulos
        if (newProduct.nome && newProduct.preço !== '' && newProduct.quantidade !== '') {
            const totalProduct = newProduct.preço * newProduct.quantidade;
            setProducts((prevProducts) => [...prevProducts, { ...newProduct, total: totalProduct }]);
            setNewProduct({ nome: '', preço: '', quantidade: '' });
            setShowGeneratePDFButton(true);
            calculateTotalGeral();
        } else {
            console.error("Por favor, preencha todos os campos para adicionar um novo produto.");
        }
    };


    const handleDeleteProduct = (index) => {
        const updatedProducts = [...products];
        const deletedProduct = updatedProducts.splice(index, 1)[0];
        setProducts(updatedProducts);
        setShowGeneratePDFButton(true);
        calculateTotalGeral();
    };

    const calculateTotalGeral = () => {
        const total = products.reduce((acc, product) => acc + product.total, 0);
        setTotalGeral(total);
    };

    const handleImportCSV = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                const importedData = result.data;

                // Verifica se o cabeçalho está presente e possui os campos necessários
                if (
                    importedData.length > 0 &&
                    'Product Name' in importedData[0] &&
                    'Price' in importedData[0] &&
                    'Quantity' in importedData[0]
                ) {
                    setShowGeneratePDFButton(true);

                    // Mapeia os nomes das colunas para os que você espera
                    const mappedData = importedData.map((item) => {
                        // Verifica se todos os valores necessários estão preenchidos e não são nulos
                        if (item['Product Name'] && item['Price'] !== null && item['Quantity'] !== null) {
                            return {
                                nome: item['Product Name'],
                                preço: item['Price'],
                                quantidade: item['Quantity'],
                                total: item['Price'] * item['Quantity'],
                            };
                        } else {
                            console.error("Por favor, preencha todos os campos para importar os produtos.");
                            return null; // Ignora a linha do CSV se algum valor estiver faltando ou for nulo
                        }
                    }).filter(Boolean); // Remove elementos nulos do array

                    setProducts((prevProducts) => [...prevProducts, ...mappedData]);
                    calculateTotalGeral();
                } else {
                    console.error("Formato de cabeçalho inválido no arquivo CSV.");
                }
            },
            error: (error) => {
                console.error("Erro ao processar o arquivo CSV:", error);
            },
        });
    };


    const handleGeneratePDF = () => {
        const pdf = new jsPDF();
        let total = 0;

        pdf.autoTable({
            head: [['Product Name', 'Price', 'Quantity', 'Total']],
            body: products.map((product) => {
                const totalProduct = product.preço * product.quantidade;
                total += totalProduct;

                return [product.nome, product.preço, product.quantidade, totalProduct.toFixed(2)];
            }),
            foot: [['Total Geral', '', '', total.toFixed(2)]],
        });

        pdf.save('products.pdf');
    };


    return (
        <div className={styles.product_crud}>
            <h1>Planilha de Produtos</h1>

            {/* Formulário para Adicionar Produto */}
            <div className={styles.form_container}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Product Name"
                    value={newProduct.nome}
                    onChange={handleInputChange}
                    className={styles.form_input}
                />
                <input
                    type="text"
                    name="preço"
                    placeholder="Price"
                    value={newProduct.preço}
                    onChange={handleInputChange}
                    className={styles.form_input}
                />
                <input
                    type="text"
                    name="quantidade"
                    placeholder="Quantity"
                    value={newProduct.quantidade}
                    onChange={handleInputChange}
                    className={styles.form_input}
                />
                <button onClick={handleAddProduct} className={styles.form_button}>
                    Add Product
                </button>
            </div>

            {/* Lista de Produtos */}
            <ul className={styles.product_list}>
                {products.map((product, index) => (
                    <li key={index} className={styles.product_item}>
                        <span>
                            {product.nome} - ${product.preço} - Quantity: {product.quantidade} - Total: {product.total.toFixed(2)}
                        </span>
                        <button onClick={() => handleDeleteProduct(index)} className={styles.product_item_button}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Botão para Importar do Excel */}
            <div className={styles.file_input_container}>
                <input
                    type="file"
                    onChange={(e) => handleImportCSV(e.target.files[0])}
                    className={styles.file_input}
                    id="excelFileInput"
                />
                <label htmlFor="excelFileInput" className={styles.file_input_label}>
                    Importar do Excel
                </label>
            </div>

            {/* Botão para Gerar PDF */}
            <div className={styles.file_input_container}>
                {showGeneratePDFButton && (
                    <button onClick={handleGeneratePDF} className={styles.form_button}>
                        Gerar PDF
                    </button>
                )}
            </div>

            {/* Visualizador de PDF */}
            {showGeneratePDFButton && (
                <div className={styles.pdf_viewer}>
                    <iframe
                        title="Generated PDF"
                        ref={pdfRef}
                        style={{ width: '100%', height: '400px', border: '1px solid #ccc', display: "none" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductCrud