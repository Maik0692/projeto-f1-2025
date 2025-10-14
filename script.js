let todasAsPistas = [];

const listaPistasDiv = document.getElementById('lista-pistas');
const formFiltro = document.getElementById('form-filtro');
const semResultadosP = document.getElementById('sem-resultados');

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

function renderizarPistas(lista) {
    listaPistasDiv.innerHTML = '';
    
    if (lista.length === 0) {
        semResultadosP.style.display = 'block';
        return;
    } else {
        semResultadosP.style.display = 'none';
    }

    lista.forEach(pista => {       
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-pista');        
        
        cartao.innerHTML = `
            <img src="assets/img/${pista.imagem_url}" alt="Mapa do circuito de ${pista.nome}">
            <h3>${pista.nome} (${pista.pais})</h3>
            <p>Voltas: ${pista.voltas} | Comprimento: ${pista.comprimento_km} km</p>
            <p>Tipo: ${pista.tipo_tracado}</p>
            <button data-id="${pista.id}">Ver Estatísticas</button>
        `;

        listaPistasDiv.appendChild(cartao);        
        
        const botaoDetalhe = cartao.querySelector('button');
        botaoDetalhe.addEventListener('click', () => {
            alert(`Detalhes de ${pista.nome}:\nRecorde de Volta: ${pista.recorde_volta}`);
        });
    });
}
function adicionarEventosDeFiltro(pistas) {
    formFiltro.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const buscaPais = document.getElementById('busca-pais').value.toLowerCase();
        const compMin = parseFloat(document.getElementById('comp-min').value);
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked').value;
        const incluirUrbano = document.getElementById('urbano').checked;
        
        if (buscaPais.length > 0 && buscaPais.length < 3) {
            alert("A busca por nome/país deve ter no mínimo 3 caracteres ou estar vazia!");
            return;
        }
        if (compMin < 4.0) {
            alert("O comprimento mínimo deve ser de pelo menos 4.0 km.");
            return;
        }        
        
        const pistasFiltradas = pistas.filter(pista => {
            
            const atendePais = pista.pais.toLowerCase().includes(buscaPais) || 
                               pista.nome.toLowerCase().includes(buscaPais);
            
            const atendeComprimento = pista.comprimento_km >= compMin;            
            
            let atendeTipo = true;
            if (tipoSelecionado !== 'todos') {
                 atendeTipo = pista.tipo_tracado === tipoSelecionado;
            }           
            
            let atendeUrbano = true;
            if (!incluirUrbano && pista.tipo_tracado.toLowerCase().includes('urbano')) {
                atendeUrbano = false;
            }

            return atendePais && atendeComprimento && atendeTipo && atendeUrbano;
        });

        renderizarPistas(pistasFiltradas);
    });    
    
    document.getElementById('comp-min').addEventListener('change', (e) => {        
        formFiltro.dispatchEvent(new Event('submit')); 
    });
}

carregarPistas();
