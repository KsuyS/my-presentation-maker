import React from 'react';
import styles from '../Toolbar.module.css';

interface ToolbarNavProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const sections = {
    main: 'Главная',
    background: 'Фон',
    text: 'Текст',
    images: 'Изображения'
};

export const ToolbarNav: React.FC<ToolbarNavProps> = ({
    activeSection,
    onSectionChange
}) => {
    return (
        <div className={styles.toolbarNav}>
            {Object.entries(sections).map(([key, value]) => (
                <button
                    key={key}
                    className={`${styles.navButton} ${activeSection === key ? styles.active : ''}`}
                    onClick={() => onSectionChange(key)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};