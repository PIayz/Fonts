const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta 'fonts'
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// Lista de fontes disponíveis e seus estilos
const fontes = {
    'SicoobScript': {
        regular: 'SicoobScript-Regular.woff2',
        bold: 'SicoobScript-Bold.woff2'
    },
    'SicoobSans': {
        regular: 'SicoobSans-Regular.woff2', // Corrigido o nome do arquivo
        italic: 'SicoobSans-BlackItalic.woff2'
    }
};

// Endpoint para fornecer a fonte
app.get('/font/:name/:style', (req, res) => {
    const { name, style } = req.params;

    if (fontes[name] && fontes[name][style]) {
        // Caminho do arquivo local
        const filePath = path.join(__dirname, 'fonts', fontes[name][style]);
        
        // Verifica se o arquivo existe e serve ele
        return res.sendFile(filePath, (err) => {
            if (err) {
                return res.status(404).send('Fonte não encontrada!');
            }
        });
    } else {
        return res.status(404).send('Fonte ou estilo não encontrado');
    }
});

// Rota para listar fontes disponíveis
app.get('/fonts', (req, res) => {
    // Lista as fontes disponíveis
    res.json(Object.keys(fontes));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`API de fontes rodando na porta ${port}`);
});
