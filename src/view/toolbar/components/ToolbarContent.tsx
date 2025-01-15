import React from 'react';
import styles from '../Toolbar.module.css';
import { MainSection } from './section/MainSection';
import { BackgroundSection } from './section/BackgroundSection';
import { TextSection } from './section/TextSection';
import { ImagesSection } from './section/ImagesSection';
import { useToolbarState } from '../../../store/Hooks/toolbar/useToolbarState';
import { useToolbarActions } from '../../../store/Hooks/toolbar/useToolbarActions';
import { useTextFormatting } from '../../../store/Hooks/toolbar/useTextFormatting';
import { useImageHandling } from '../../../store/Hooks/toolbar/useImageHandling';
import { useGradientHandling } from '../../../store/Hooks/toolbar/useGradientHandling';
import { usePdfHandling } from '../../../store/Hooks/toolbar/usePdfHandling';

interface ToolbarContentProps {
    navigate: (path: string) => void;
}

export const ToolbarContent: React.FC<ToolbarContentProps> = ({ navigate }) => {
    const state = useToolbarState();
    const actions = useToolbarActions(state.editor);
    const textFormatting = useTextFormatting();
    const imageHandling = useImageHandling();
    const gradientHandling = useGradientHandling();
    const pdfHandling = usePdfHandling(state.editor);

    return (
        <div className={styles.toolbarContent}>
            {state.activeSection === 'main' && (
                <MainSection
                    actions={{
                        addSlide: actions.addSlide,
                        removeSlide: actions.removeSlide,
                        handleExport: actions.handleExport,
                        handleImport: actions.handleImport
                    }}
                    history={{
                        onUndo: history.undo,
                        onRedo: history.redo
                    }}
                    pdfHandling={pdfHandling}
                    navigate={navigate}
                    isEmptyPresentation={state.editor.presentation.slides.length === 0}
                />
            )}

            {state.activeSection === 'background' && (
                <BackgroundSection
                    imageHandling={imageHandling}
                    gradientHandling={gradientHandling}
                    isEmptyPresentation={state.editor.presentation.slides.length === 0}
                />
            )}

            {state.activeSection === 'text' && (
                <TextSection
                    textFormatting={textFormatting}
                    actions={actions}
                    selection={state.selection}
                    isEmptyPresentation={state.editor.presentation.slides.length === 0}
                />
            )}

            {state.activeSection === 'images' && (
                <ImagesSection
                    imageHandling={imageHandling}
                    selection={state.selection}
                    isEmptyPresentation={state.editor.presentation.slides.length === 0}
                />
            )}
        </div>
    );
};