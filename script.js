
// Dados de exemplo (simulando um banco de dados)
let deliveries = [
    {
        id: 'ENT001',
        cliente: 'João Silva',
        endereco: 'Rua das Flores, 123 - Centro',
        telefone: '(11) 9999-8888',
        produtos: [
            { nome: 'Notebook Dell', quantidade: 1 },
            { nome: 'Mouse sem fio', quantidade: 1 },
            { nome: 'Teclado mecânico', quantidade: 1 }
        ],
        status: 'separacao',
        dataPedido: '2023-05-10',
        dataEntregaPrevista: '2023-05-15',
        observacoes: 'Entregar após as 14h'
    },
    {
        id: 'ENT002',
        cliente: 'Maria Oliveira',
        endereco: 'Av. Paulista, 1000 - Bela Vista',
        telefone: '(11) 9888-7777',
        produtos: [
            { nome: 'Smartphone Samsung', quantidade: 2 },
            { nome: 'Capa protetora', quantidade: 2 }
        ],
        status: 'pronto',
        dataPedido: '2023-05-08',
        dataEntregaPrevista: '2023-05-12',
        observacoes: 'Apartamento 32, tocar interfone'
    },
    {
        id: 'ENT003',
        cliente: 'Carlos Souza',
        endereco: 'Rua Augusta, 500 - Consolação',
        telefone: '(11) 9777-6666',
        produtos: [
            { nome: 'TV 55" 4K', quantidade: 1 },
            { nome: 'Suporte parede', quantidade: 1 }
        ],
        status: 'separacao',
        dataPedido: '2023-05-11',
        dataEntregaPrevista: '2023-05-18',
        observacoes: 'Necessário 2 pessoas para instalação'
    },
    {
        id: 'ENT004',
        cliente: 'Ana Costa',
        endereco: 'Rua Vergueiro, 2000 - Vila Mariana',
        telefone: '(11) 9666-5555',
        produtos: [
            { nome: 'Geladeira Frost Free', quantidade: 1 },
            { nome: 'Filtro de água', quantidade: 1 }
        ],
        status: 'pronto',
        dataPedido: '2023-05-05',
        dataEntregaPrevista: '2023-05-10',
        observacoes: 'Portão azul'
    },
    {
        id: 'ENT005',
        cliente: 'Pedro Santos',
        endereco: 'Rua dos Pinheiros, 300 - Pinheiros',
        telefone: '(11) 9555-4444',
        produtos: [
            { nome: 'Mesa escritório', quantidade: 1 },
            { nome: 'Cadeira ergonômica', quantidade: 2 }
        ],
        status: 'cancelada',
        dataPedido: '2023-05-01',
        dataEntregaPrevista: '2023-05-08',
        observacoes: 'Cancelado pelo cliente',
        motivoCancelamento: 'Cliente mudou de ideia'
    }
];

// Variáveis globais
let currentDelivery = null;
const modal = document.getElementById('deliveryModal');
const statusTabs = document.querySelectorAll('.status-tab');

// Função para renderizar as entregas
function renderDeliveries(filterStatus = 'all') {
    const separacaoList = document.getElementById('separacao-list');
    const prontoList = document.getElementById('pronto-list');
    
    // Limpar listas
    separacaoList.innerHTML = '';
    prontoList.innerHTML = '';
    
    // Filtrar entregas conforme o status selecionado
    let filteredDeliveries = deliveries;
    if (filterStatus !== 'all') {
        filteredDeliveries = deliveries.filter(d => d.status === filterStatus);
    }
    
    // Adicionar entregas às listas correspondentes
    filteredDeliveries.forEach(delivery => {
        const card = createDeliveryCard(delivery);
        
        if (delivery.status === 'separacao') {
            separacaoList.appendChild(card);
        } else if (delivery.status === 'pronto') {
            prontoList.appendChild(card);
        } else if (delivery.status === 'cancelada' && filterStatus === 'cancelada') {
            // Mostrar canceladas apenas quando o filtro está ativo
            const canceladaList = document.createElement('div');
            canceladaList.innerHTML = '<div class="column-header">Canceladas</div>';
            canceladaList.appendChild(card);
            
            // Adicionar à primeira coluna (poderia ser uma coluna separada)
            separacaoList.parentNode.insertBefore(canceladaList, separacaoList.nextSibling);
        }
    });
}

// Função para criar um card de entrega
function createDeliveryCard(delivery) {
    const card = document.createElement('div');
    card.className = `delivery-card ${delivery.status}`;
    
    let statusText = '';
    if (delivery.status === 'separacao') statusText = 'Em Separação';
    else if (delivery.status === 'pronto') statusText = 'Pronta para Carregar';
    else if (delivery.status === 'cancelada') statusText = 'Cancelada';
    
    card.innerHTML = `
        <h3>${delivery.id} - ${delivery.cliente}</h3>
        <p><strong>Endereço:</strong> ${delivery.endereco}</p>
        <p><strong>Status:</strong> ${statusText}</p>
        <p><strong>Data Prevista:</strong> ${formatDate(delivery.dataEntregaPrevista)}</p>
    `;
    
    const actions = document.createElement('div');
    actions.className = 'delivery-actions';
    
    if (delivery.status !== 'cancelada') {
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn btn-details';
        detailsBtn.textContent = 'Detalhes';
        detailsBtn.addEventListener('click', () => showDeliveryDetails(delivery));
        actions.appendChild(detailsBtn);
    }
    
    card.appendChild(actions);
    return card;
}

// Função para mostrar detalhes da entrega no modal
function showDeliveryDetails(delivery) {
    currentDelivery = delivery;
    const modalContent = document.getElementById('deliveryDetails');
    
    let statusText = '';
    if (delivery.status === 'separacao') statusText = 'Em Separação';
    else if (delivery.status === 'pronto') statusText = 'Pronta para Carregar';
    else if (delivery.status === 'cancelada') statusText = 'Cancelada';
    
    let produtosHtml = '<ul>';
    delivery.produtos.forEach(produto => {
        produtosHtml += `<li>${produto.nome} (Qtd: ${produto.quantidade})</li>`;
    });
    produtosHtml += '</ul>';
    
    let cancelamentoHtml = '';
    if (delivery.status === 'cancelada') {
        cancelamentoHtml = `<p><strong>Motivo do Cancelamento:</strong> ${delivery.motivoCancelamento || 'Não informado'}</p>`;
    }
    
    modalContent.innerHTML = `
        <p><strong>Número da Entrega:</strong> ${delivery.id}</p>
        <p><strong>Cliente:</strong> ${delivery.cliente}</p>
        <p><strong>Telefone:</strong> ${delivery.telefone}</p>
        <p><strong>Endereço:</strong> ${delivery.endereco}</p>
        <p><strong>Status:</strong> ${statusText}</p>
        <p><strong>Data do Pedido:</strong> ${formatDate(delivery.dataPedido)}</p>
        <p><strong>Data Prevista para Entrega:</strong> ${formatDate(delivery.dataEntregaPrevista)}</p>
        <p><strong>Produtos:</strong> ${produtosHtml}</p>
        <p><strong>Observações:</strong> ${delivery.observacoes}</p>
        ${cancelamentoHtml}
    `;
    
    // Mostrar/ocultar botões conforme o status
    const cancelBtn = document.getElementById('cancelDeliveryBtn');
    const pdfBtn = document.getElementById('generatePdfBtn');
    
    if (delivery.status === 'cancelada') {
        cancelBtn.style.display = 'none';
        pdfBtn.textContent = 'Gerar PDF (Cancelada)';
    } else {
        cancelBtn.style.display = 'block';
        pdfBtn.textContent = 'Gerar PDF para Carregamento';
    }
    
    modal.style.display = 'flex';
}

// Função para formatar data
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para pesquisar entregas
function searchDeliveries(query) {
    query = query.toLowerCase();
    return deliveries.filter(delivery => 
        delivery.id.toLowerCase().includes(query) || 
        delivery.cliente.toLowerCase().includes(query)
    );
}

// Função para cancelar entrega
function cancelDelivery(deliveryId, motivo) {
    const deliveryIndex = deliveries.findIndex(d => d.id === deliveryId);
    if (deliveryIndex !== -1) {
        deliveries[deliveryIndex].status = 'cancelada';
        deliveries[deliveryIndex].motivoCancelamento = motivo || 'Cancelado pelo sistema';
        return true;
    }
    return false;
}

// Função para gerar PDF (simulada)
function generatePdf(delivery) {
    // Na implementação real, você usaria uma biblioteca como jsPDF ou pdfmake
    // Aqui estamos apenas simulando com um alerta
    alert(`PDF gerado para a entrega ${delivery.id}\nCliente: ${delivery.cliente}\nProdutos: ${delivery.produtos.length}`);
    
    // Aqui você implementaria a geração real do PDF
    // Exemplo com jsPDF:
    /*
    const doc = new jsPDF();
    doc.text(`Relatório de Entrega - ${delivery.id}`, 10, 10);
    doc.text(`Cliente: ${delivery.cliente}`, 10, 20);
    // ... adicionar mais informações
    doc.save(`entrega_${delivery.id}.pdf`);
    */
}

// Event Listeners
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    
    if (query) {
        const results = searchDeliveries(query);
        if (results.length > 0) {
            showDeliveryDetails(results[0]);
        } else {
            alert('Nenhuma entrega encontrada com os critérios de pesquisa.');
        }
    }
});

statusTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        statusTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        renderDeliveries(this.dataset.status);
    });
});

document.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
});

document.getElementById('cancelDeliveryBtn').addEventListener('click', function() {
    if (currentDelivery) {
        const motivo = prompt('Digite o motivo do cancelamento:');
        if (motivo !== null) {
            if (cancelDelivery(currentDelivery.id, motivo)) {
                alert('Entrega cancelada com sucesso!');
                renderDeliveries();
                modal.style.display = 'none';
            } else {
                alert('Erro ao cancelar entrega.');
            }
        }
    }
});

document.getElementById('generatePdfBtn').addEventListener('click', function() {
    if (currentDelivery) {
        generatePdf(currentDelivery);
    }
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Inicializar a aplicação
renderDeliveries();


