:root {
    --cor-principal: #e10600; 
    --cor-fundo: #15151e; 
    --cor-texto: #ffffff;
    --cor-amarelo: #FFD700; 
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--cor-fundo);
    color: var(--cor-texto);
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.header {
    width: 100%;
    background-color: #000000;
    padding: 20px 0;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.header h1 {
    margin: 0;
    color: var(--cor-principal);
    font-size: 2.5em;
    letter-spacing: 3px;
    text-transform: uppercase;
}

#subtitulo {
    color: var(--cor-amarelo); 
    margin-top: 5px;
    font-size: 1.5em;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: normal; 
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.6), 0 0 10px rgba(255, 215, 0, 0.4);
}

.nav-menu {
    margin-top: 20px;
}

.nav-tab {
    background-color: var(--cor-principal);
    color: var(--cor-texto);
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 0 10px rgba(225, 6, 0, 0.5);
    user-select: none;
}

.nav-tab:hover {
    background-color: var(--cor-fundo);
    color: var(--cor-principal);
    border-color: var(--cor-principal);
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 0 20px var(--cor-principal);
}

.nav-tab:active {
    transform: scale(0.98);
    box-shadow: none;
}

.content {
    margin-top: 40px;
    width: 95%; 
    max-width: 1000px;
    padding: 20px;
    background-color: #2a2a35;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.pistas-container {
    display: flex;
    overflow-x: scroll; 
    padding-bottom: 20px; 
    gap: 20px; 
    margin-top: 20px;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    opacity: 0;
    max-height: 0;
    transition: opacity 0.5s ease-in-out, max-height 0.7s ease-in-out;
}

.pistas-container::-webkit-scrollbar {
    display: none; 
}

.pistas-container.visivel {
    opacity: 1;
    max-height: 1000px; 
}

.pista-card {
    flex: 0 0 auto; 
    width: 250px; 
    background-color: #000000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pista-card:hover {
    transform: translateY(-5px); 
    box-shadow: 0 8px 15px rgba(225, 6, 0, 0.7); 
}

.pista-card img {
    width: 100%;
    height: 150px; 
    object-fit: cover; 
}

.pista-info {
    padding: 15px;
    text-align: center;
}

.pista-info h3 {
    color: var(--cor-amarelo);
    margin: 0 0 5px 0;
    font-size: 1.1em;
}

.pista-info p {
    margin: 0;
    font-size: 0.9em;
    color: #ccc;
}
