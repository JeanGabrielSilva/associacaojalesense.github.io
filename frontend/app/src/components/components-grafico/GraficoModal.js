import React from 'react';

function GraficoModal() {
    // Copie e cole o código de incorporação do Looker ou do Google aqui
    const embedCode = `<iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/d1ff13e2-2374-43e9-96da-430d37ffa420/page/ikq0D" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>`;

    return (
        <div className="chart-container" dangerouslySetInnerHTML={{ __html: embedCode }} />
    );
}

export default GraficoModal;
