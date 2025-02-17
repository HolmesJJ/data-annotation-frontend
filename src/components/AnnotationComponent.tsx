import React from 'react';
import { Box, Paper, IconButton, TextField, Typography } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { AnnotationSection } from '../types';

interface AnnotationComponentProps {
  annotation: AnnotationSection;
  index: number;
  onToggleOriginal: () => void;
  onToggleEditable: () => void;
  onChange?: (text: string) => void;
  isEditable?: boolean;
  label: string;
}

export const AnnotationComponent: React.FC<AnnotationComponentProps> = ({
  annotation,
  index,
  onToggleOriginal,
  onToggleEditable,
  onChange,
  isEditable,
  label
}) => (
  <Paper elevation={2} sx={{ p: 2, transition: "height 0.3s ease" }}>
    {/* Original Annotation */}
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1">{label} {index + 1} (Original)</Typography>
      <IconButton onClick={onToggleOriginal}>
        {annotation.isOriginalCollapsed ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
    </Box>
    {!annotation.isOriginalCollapsed && (
      <Typography sx={{ mt: 2 }}>{annotation.originalText}</Typography>
    )}

    {/* Editable Annotation */}
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
      <Typography variant="subtitle1">{label} {index + 1} (Editable)</Typography>
      <IconButton onClick={onToggleEditable}>
        {annotation.isEditableCollapsed ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
    </Box>
    {!annotation.isEditableCollapsed && (
      <TextField
        fullWidth
        multiline
        rows={4}
        value={annotation.editableText}
        onChange={isEditable ? (e) => onChange?.(e.target.value) : undefined}
        disabled={!isEditable}
        sx={{ mt: 2 }}
      />
    )}
  </Paper>
);