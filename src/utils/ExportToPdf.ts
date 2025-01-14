import { EditorType } from '../store/EditorType';
import { jsPDF } from 'jspdf';
import { TextContent, ImageContent } from '../store/PresentationType';
import TimesNewRomanBase64 from '../store/Fonts/TimesNewRoman-base64';
import html2canvas from 'html2canvas';
import ArialBase64 from '../store/Fonts/Arial-base64';
import CourierNewBase64 from '../store/Fonts/CourierNew-base64';
import GeorgiaBase64 from '../store/Fonts/Georgia-base64';
import VerdanaBase64 from '../store/Fonts/Verdana-base64';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

const generatePdfDataUrl = async (editor: EditorType): Promise<string> => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4'
    });

    doc.addFileToVFS("TimesNewRoman.ttf", TimesNewRomanBase64);
    doc.addFont("TimesNewRoman.ttf", "Times New Roman", "normal");
    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(20);

    doc.addFileToVFS("Arial.ttf", ArialBase64);
    doc.addFont("Arial.ttf", "Arial", "normal");
    doc.setFont("Arial", "normal");
    doc.setFontSize(20);

    doc.addFileToVFS("CourierNew.ttf", CourierNewBase64);
    doc.addFont("CourierNew.ttf", "Courier New", "normal");
    doc.setFont("CourierNew", "normal");
    doc.setFontSize(20);

    doc.addFileToVFS("Georgia.ttf", GeorgiaBase64);
    doc.addFont("Georgia.ttf", "Georgia", "normal");
    doc.setFont("Georgia", "normal");
    doc.setFontSize(20);

    doc.addFileToVFS("Verdana.ttf", VerdanaBase64);
    doc.addFont("Verdana.ttf", "Verdana", "normal");
    doc.setFont("Verdana", "normal");
    doc.setFontSize(20);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${SLIDE_WIDTH}px`;
    tempContainer.style.height = `${SLIDE_HEIGHT}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.overflow = 'hidden';
    document.body.appendChild(tempContainer);

    const toBase64 = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Could not get 2D context"));
                    return
                }
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/jpeg');
                resolve(dataURL);
            };
            img.onerror = (error) => {
                console.error("Error loading image:", error, url)
                reject(error)
            };
            img.src = url;
        });
    };

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
                elementDiv.textContent = textElement.value;
            } else if (element.type === 'image') {
                const imageElement = element as ImageContent;
                const img = document.createElement('img');

                try {
                    const base64Data = await toBase64(imageElement.src);
                    img.src = base64Data;
                } catch (error) {
                    alert("Ошибка преобразования изображения в base64: " + error)
                }

                img.style.width = '100%';
                img.style.height = '100%';
                elementDiv.appendChild(img);
            }
            slideElement.appendChild(elementDiv);
        }

        tempContainer.appendChild(slideElement);

        try {
            const canvas = await html2canvas(slideElement, {
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
            if (index < editor.presentation.slides.length - 1) {
                doc.addPage();
            }
        } catch (error) {
            alert("Ошибка при преобразовании слайда в изображение: " + error)
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