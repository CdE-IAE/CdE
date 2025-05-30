document.addEventListener('DOMContentLoaded', function() {
    const actaListElement = document.getElementById('acta-list');
    const actaLinks = actaListElement.querySelectorAll('a');
    const filterInput = document.getElementById('filter-input');
    const previewContainers = document.querySelectorAll('.pdf-horizontal-preview');
    let currentlyOpenPreviewId = null;
    const previewMaxHeight = 900; // Altura máxima para la preview

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Función para filtrar la lista de actas
    if (filterInput && actaListElement) {
        filterInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            const actaItems = actaListElement.querySelectorAll('.acta-item');
            actaItems.forEach(item => {
                const link = item.querySelector('a');
                if (link) {
                    const linkText = link.textContent.toLowerCase();
                    item.style.display = linkText.includes(searchText) ? 'block' : 'none';
                }
            });
        });
    }

    function closePreview(previewContainer, iframe) {
        previewContainer.style.height = '0';
        previewContainer.style.borderWidth = '0'; // Ocultar el borde
        if (iframe) {
            setTimeout(() => iframe.src = '', 300);
        }
    }

    function openPreview(previewContainer, iframe, pdfUrl) {
        previewContainer.style.display = 'block'; // Asegurarse de que esté visible para la transición inicial
        previewContainer.style.borderWidth = '1px'; // Mostrar el borde
        previewContainer.style.height = `${previewMaxHeight}px`;
        iframe.src = pdfUrl;
    }

    // Función para manejar el clic en el enlace del acta
    actaLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const pdfUrl = this.dataset.pdfUrl;
            const previewId = this.dataset.previewId;
            const previewContainer = document.getElementById(previewId);
            const iframe = previewContainer ? previewContainer.querySelector('iframe') : null;

            if (isMobile) {
                // En móvil, redirigir directamente para la descarga
                window.location.href = pdfUrl;
            } else {
                // En computadora, mostrar/ocultar la preview con transición de altura
                event.preventDefault(); // Prevenir la navegación

                if (currentlyOpenPreviewId === previewId) {
                    // Si la preview actual está abierta, la cerramos
                    closePreview(previewContainer, iframe);
                    currentlyOpenPreviewId = null;
                } else {
                    // Ocultar la preview actualmente abierta
                    const currentlyOpenContainer = document.getElementById(currentlyOpenPreviewId);
                    if (currentlyOpenContainer) {
                        const openIframe = currentlyOpenContainer.querySelector('iframe');
                        closePreview(currentlyOpenContainer, openIframe);
                    }

                    // Mostrar la nueva preview
                    if (previewContainer && iframe && pdfUrl) {
                        openPreview(previewContainer, iframe, pdfUrl);
                        currentlyOpenPreviewId = previewId;
                    } else {
                        currentlyOpenPreviewId = null;
                    }
                }
            }
        });
    });

    // Ocultar todas las previews al inicio (solo en desktop)
    if (!isMobile) {
        previewContainers.forEach(container => {
            container.style.height = '0';
            container.style.borderWidth = '0'; // Ocultar el borde inicial
        });
    }
});