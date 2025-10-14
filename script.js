// Variável global para armazenar os dados brutos de todas as pistas
let todasAsPistas = [];

// Elementos do DOM
const listaPistasDiv = document.getElementById('lista-pistas');
const formFiltro = document.getElementById('form-filtro');
const semResultadosP = document.getElementById('sem-resultados');

/**
 * Carrega o arquivo JSON e inicia a aplicação.
 * (Requisito JS: Consumo de Dados usando Fetch API)
 */
async function carregarPistas() {
    try {
        const response = await fetch('pistas.json');
        todasAsPistas = await response.json();
        
        renderizarPistas(todasAsPistas);
        adicionarEventosDeFiltro(todasAsPistas);
    } catch (error) {
        console.error("Erro ao carregar dados do arquivo JSON:", error);
        listaPistasDiv.innerHTML = '<p style="color: var(--cor-primaria);">Não foi possível carregar os dados das pistas. Verifique o arquivo pistas.json.</p>';
    }
}

/**
 * Cria os cartões de pista e insere no DOM.
 * (Requisito JS: Manipulação do DOM - Criar/Adicionar)
 */
function renderizarPistas(lista) {
    listaPistasDiv.innerHTML = ''; // Limpa a lista antes de re-renderizar
    
    if (lista.length === 0) {
        semResultadosP.style.display = 'block';
        return;
    } else {
        semResultadosP.style.display = 'none';
    }

    lista.forEach(pista => {
        // Cria um elemento <article> para cada pista (Requisito HTML: <article>)
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-pista');
        
        // Manipulação do DOM - Modificar Conteúdo
        cartao.innerHTML = `
            <img src="assets/img/${pista.imagem_url}" alt="Mapa do circuito de ${pista.nome}">
            <h3>${pista.nome} (${pista.pais})</h3>
            <p>Voltas: ${pista.voltas} | Comprimento: ${pista.comprimento_km} km</p>
            <p>Tipo: ${pista.tipo_tracado}</p>
            <button data-id="${pista.id}">Ver Estatísticas</button>
        `;

        listaPistasDiv.appendChild(cartao); // Manipulação do DOM - Adicionar
        
        // Adiciona um evento de clique para detalhes (Requisito JS: Evento click)
        const botaoDetalhe = cartao.querySelector('button');
        botaoDetalhe.addEventListener('click', () => {
            alert(`Detalhes de ${pista.nome}:\nRecorde de Volta: ${pista.recorde_volta}`);
        });
    });
}

/**
 * Adiciona o listener de evento para o formulário.
 * (Requisito JS: Gerenciamento de Eventos - submit)
 */
function adicionarEventosDeFiltro(pistas) {
    formFiltro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Coleta os valores do formulário
        const buscaPais = document.getElementById('busca-pais').value.toLowerCase();
        const compMin = parseFloat(document.getElementById('comp-min').value);
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked').value;
        const incluirUrbano = document.getElementById('urbano').checked;

        // 1. Requisito JS: Validação de Formulário com JS
        if (buscaPais.length > 0 && buscaPais.length < 3) {
            alert("A busca por nome/país deve ter no mínimo 3 caracteres ou estar vazia!");
            return;
        }
        if (compMin < 4.0) {
            alert("O comprimento mínimo deve ser de pelo menos 4.0 km.");
            return;
        }
        
        // Lógica de Filtragem
        const pistasFiltradas = pistas.filter(pista => {
            // Filtro 1: País/Nome
            const atendePais = pista.pais.toLowerCase().includes(buscaPais) || 
                               pista.nome.toLowerCase().includes(buscaPais);

            // Filtro 2: Comprimento
            const atendeComprimento = pista.comprimento_km >= compMin;
            
            // Filtro 3: Tipo (Permanente vs. Urbano)
            let atendeTipo = true;
            if (tipoSelecionado !== 'todos') {
                 atendeTipo = pista.tipo_tracado === tipoSelecionado;
            }
            
            // Filtro 4: Excluir/Incluir Urbanos (se o tipo não for permanente)
            let atendeUrbano = true;
            if (!incluirUrbano && pista.tipo_tracado.toLowerCase().includes('urbano')) {
                atendeUrbano = false;
            }

            return atendePais && atendeComprimento && atendeTipo && atendeUrbano;
        });

        renderizarPistas(pistasFiltradas);
    });
    
    // Requisito JS: Gerenciamento de Eventos - change (exemplo de terceiro evento)
    document.getElementById('comp-min').addEventListener('change', (e) => {
        // Dispara o filtro automaticamente ao mudar o valor do comprimento
        formFiltro.dispatchEvent(new Event('submit')); 
    });
}

// Inicia a aplicação
carregarPistas();
