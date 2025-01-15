import { EditorType } from '../store/EditorType';
import { jsPDF } from 'jspdf';
import { TextContent, ImageContent } from '../store/PresentationType';
import html2canvas from 'html2canvas';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

const generatePdfDataUrl = async (editor: EditorType): Promise<string> => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${SLIDE_WIDTH}px`;
    tempContainer.style.height = `${SLIDE_HEIGHT}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.overflow = 'hidden';
    document.body.appendChild(tempContainer);

    for (const [index, slide] of editor.presentation.slides.entries()) {
        tempContainer.innerHTML = '';

        const slideElement = document.createElement('div');
        slideElement.style.width = `${SLIDE_WIDTH}px`;
        slideElement.style.height = `${SLIDE_HEIGHT}px`;
        slideElement.style.position = 'relative';

        if (slide.background.type === 'solid') {
            slideElement.style.backgroundColor = slide.background.color;
        } else if (slide.background.type === 'image') {
            slideElement.style.backgroundImage = `url(${slide.background.src})`;
            slideElement.style.backgroundSize = 'cover';
            slideElement.style.backgroundRepeat = 'no-repeat';
            slideElement.style.backgroundPosition = 'center';
        } else if (slide.background.type === 'gradient') {
            slideElement.style.backgroundImage = slide.background.gradient;
        }

        for (const element of slide.content) {
            const elementDiv = document.createElement('div');
            elementDiv.style.position = 'absolute';
            elementDiv.style.left = `${element.position.x}px`;
            elementDiv.style.top = `${element.position.y}px`;
            elementDiv.style.width = `${element.size.width}px`;
            elementDiv.style.height = `${element.size.height}px`;

            if (element.type === 'text') {
                const textElement = element as TextContent;
                elementDiv.style.fontFamily = textElement.fontFamily;
                elementDiv.style.fontSize = `${textElement.fontSize}px`;
                elementDiv.style.color = textElement.fontColor;
                elementDiv.style.fontWeight = textElement.fontWeight;
                elementDiv.style.fontStyle = textElement.fontStyle;
                elementDiv.style.textAlign = textElement.textAlign;
                elementDiv.style.textDecoration = textElement.textDecoration;
                elementDiv.style.textTransform = textElement.textCase;
                elementDiv.textContent = textElement.value;
            } else if (element.type === 'image') {
                const imageElement = element as ImageContent;
                const img = document.createElement('img');
                img.src = imageElement.src;
                img.style.width = '100%';
                img.style.height = '100%';
                elementDiv.appendChild(img);
            }

            slideElement.appendChild(elementDiv);
        }

        tempContainer.appendChild(slideElement);

        try {
            const canvas = await html2canvas(slideElement, {
                useCORS: true, // Для поддержки кросс-доменных изображений
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);

            if (index < editor.presentation.slides.length - 1) {
                doc.addPage();
            }
        } catch (error) {
            console.error('Ошибка при создании изображения слайда:', error);
        }
    }

    document.body.removeChild(tempContainer);
    return doc.output('datauristring');
};

const exportToPdf = (editor: EditorType) => {
    generatePdfDataUrl(editor).then(dataUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = dataUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const fileName = editor.presentation.title || 'presentation';

        iframe.onload = () => {
            try {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${fileName}.pdf`;
                link.click();
            } catch (error) {
                alert("Ошибка сохранения PDF: " + error);
                window.open(dataUrl);
            } finally {
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 1000);
            }
        };
    }).catch(error => {
        alert("Ошибка создания PDF: " + error)
    });
};

export {
    generatePdfDataUrl,
    exportToPdf
};