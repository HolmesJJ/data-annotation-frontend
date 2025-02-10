import React from 'react';
import { Box, Paper, TextField, Typography } from "@mui/material";
import { AnnotationComponent } from './AnnotationComponent';
import { AnnotationSection } from '../types';

interface ImageAnnotationsTabProps {
  promptText: string;
  setPromptText: (text: string) => void;
  imageAnnotations: AnnotationSection[];
  setImageAnnotations: React.Dispatch<React.SetStateAction<AnnotationSection[]>>;
  toggleCollapse: (index: number, isImageAnnotation: boolean, isOriginal: boolean) => void;
}

export const ImageAnnotationsTab: React.FC<ImageAnnotationsTabProps> = ({
  promptText,
  setPromptText,
  imageAnnotations,
  setImageAnnotations,
  toggleCollapse
}) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
    <Box sx={{display:"flex", flexDirection:"column", gap: 2}}>
      <Paper sx={{ p: 2, height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary">Image Preview</Typography>
      </Paper>

      <Paper sx={{ p: 2, height: "250px" }}>
        <TextField
          required
          fullWidth
          multiline
          rows={9}
          placeholder="Enter prompt content..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          label="Prompt Content"
        />
      </Paper>
    </Box>

    <Box sx={{ display:"flex", flexDirection:"column", gap: 2}}>
      {imageAnnotations.map((annotation, index) => (
        <Box key={index} sx={{  p: 2, display: "flex", flexDirection: "column", height: "250px" }}>
          <AnnotationComponent
            annotation={annotation}
            index={index}
            onToggleOriginal={() => toggleCollapse(index, true, true)}
            onToggleEditable={() => toggleCollapse(index, true, false)}
            label="Annotation"
            onChange={(text) =>
              setImageAnnotations((prev) =>
                prev.map((item, i) => (i === index ? { ...item, editableText: text } : item))
              )
            }
            isEditable
          />
        </Box>
      ))}
    </Box>
  </Box>
);