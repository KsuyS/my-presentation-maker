import styles from './Toolbar.module.css';
import * as React from "react";
import { HistoryContext } from '../../store/Hooks/historyContext';
import { useAppSelector } from '../../store/Hooks/useAppSelector';
import { useToolbarState } from '../../store/Hooks/toolbar/useToolbarState';
import { useToolbarActions } from '../../store/Hooks/toolbar/useToolbarActions';
import { useTextFormatting } from '../../store/Hooks/toolbar/useTextFormatting';
import { useImageHandling } from '../../store/Hooks/toolbar/useImageHandling';
import { useGradientHandling } from '../../store/Hooks/toolbar/useGradientHandling';
import { usePdfHandling } from '../../store/Hooks/toolbar/usePdfHandling';
import { ToolbarNav } from './components/ToolbarNav';
import { ToolbarContent } from './components/ToolbarContent';

type ToolbarProps = {
    navigate: (path: string) => void;
};

function Toolbar({ navigate }: ToolbarProps) {
    const history = React.useContext(HistoryContext);
    const editor = useAppSelector((editor) => editor);
    
    // Используем кастомные хуки
    const state = useToolbarState();
    const actions = useToolbarActions(editor);
    const textFormatting = useTextFormatting();
    const imageHandling = useImageHandling();
    const gradientHandling = useGradientHandling();
    const pdfHandling = usePdfHandling(editor);

    return (
        <div className={styles.toolbarContainer}>
            <ToolbarNav 
                activeSection={state.activeSection}
                onSectionChange={state.setActiveSection}
            />
            <ToolbarContent
                navigate={navigate}
                state={state}
                actions={actions}
                textFormatting={textFormatting}
                imageHandling={imageHandling}
                gradientHandling={gradientHandling}
                pdfHandling={pdfHandling}
            />
        </div>
    );
}

export { Toolbar };