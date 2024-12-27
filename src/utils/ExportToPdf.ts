import { EditorType } from "../store/EditorType";
import { jsPDF } from "jspdf";
import { TextContent, ImageContent } from "../store/PresentationType";
import TimesNewRomanBase64 from "./TimesNewRoman-base64";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

const generatePdfDataUrl = async (editor: EditorType): Promise<string> => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4'
    });

    doc.addFileToVFS("MyFont.ttf", TimesNewRomanBase64);
    doc.addFont("MyFont.ttf", "Times New Roman", "normal");
    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(20);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const scale = Math.min(pageWidth / SLIDE_WIDTH, pageHeight / SLIDE_HEIGHT);
    const scaledX = (x: number) => x * scale;
    const scaledY = (y: number) => y * scale;

    for (const [index, slide] of editor.presentation.slides.entries()) {
        if (index > 0) {
            doc.addPage();
        }

        if (slide.background.type === 'solid') {
            doc.setFillColor(slide.background.color);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
        } else if (slide.background.type === 'image') {
            try {
                const imgData = slide.background.src;
                doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
            } catch (error) {
                console.error("Error adding background image to PDF:", error);
            }
        }

        for (const element of slide.content) {
            if (element.type === 'text') {
                const textElement = element as TextContent;
                doc.setFontSize(textElement.fontSize * scale);
                doc.setTextColor(textElement.fontColor);
                doc.setFont(textElement.fontFamily);

                const xPdf = scaledX(textElement.position.x);
                const yPdf = scaledY(textElement.position.y);

                if (!isNaN(xPdf) && !isNaN(yPdf)) {
                    doc.text(
                        textElement.value,
                        xPdf,
                        yPdf,
                        { baseline: 'top' }
                    );
                } else {
                    console.warn("Invalid text position:", textElement);
                }

            } else if (element.type === 'image') {
                const imageElement = element as ImageContent;
                try {
                    const imgData = imageElement.src;
                    if (typeof imgData === 'string') {
                        const xPdf = scaledX(imageElement.position.x);
                        const yPdf = scaledY(imageElement.position.y);
                        const wPdf = scaledX(imageElement.size.width);
                        const hPdf = scaledY(imageElement.size.height);

                        if (!isNaN(xPdf) && !isNaN(yPdf) && !isNaN(wPdf) && !isNaN(hPdf)) {
                            doc.addImage(imgData, 'JPEG', xPdf, yPdf, wPdf, hPdf);
                        } else {
                            console.warn("Invalid image position or size:", imageElement);
                        }
                    } else {
                        console.warn("Invalid image data:", imageElement);
                    }
                } catch (error) {
                    console.error("Error adding image to PDF:", error);
                }
            }
        }
    }

    return doc.output('datauristring');
};

const exportToPdf = (editor: EditorType) => {
    generatePdfDataUrl(editor).then(dataUrl => {
        const iframe = document.createElement('iframe');
        iframe.src = dataUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.onload = () => {
            try {
                iframe.contentWindow?.print();
            } catch (error) {
                console.error("Error printing PDF:", error);
                window.open(dataUrl);
            } finally {
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 1000);
            }
        };
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
};

export {
    generatePdfDataUrl,
    exportToPdf
};