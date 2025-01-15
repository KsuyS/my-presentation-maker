import { useState, useCallback } from 'react';
import { generatePdfDataUrl, exportToPdf } from '../../../utils/ExportToPdf';
import { EditorType } from '../../EditorType';

export const usePdfHandling = (editor: EditorType) => {
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

    const handlePreviewPdf = useCallback(async () => {
        try {
            const dataUrl = await generatePdfDataUrl(editor);
            setPdfPreviewUrl(dataUrl);
            setIsPdfPreviewOpen(true);
        } catch (error) {
            console.error("Error generating PDF preview:", error);
        }
    }, [editor]);

    const handleSavePdf = useCallback(() => {
        if (pdfPreviewUrl) {
            exportToPdf(editor);
        }
    }, [editor, pdfPreviewUrl]);

    const closePdfPreview = useCallback(() => {
        setIsPdfPreviewOpen(false);
        setPdfPreviewUrl(null);
    }, []);

    return {
        pdfPreviewUrl,
        isPdfPreviewOpen,
        handlePreviewPdf,
        handleSavePdf,
        closePdfPreview
    };
};