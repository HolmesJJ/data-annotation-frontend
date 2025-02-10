export interface AnnotationSection {
    originalText: string;
    editableText: string;
    isOriginalCollapsed: boolean;
    isEditableCollapsed: boolean;
  }
  
  export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }