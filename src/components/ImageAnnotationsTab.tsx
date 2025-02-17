import React from 'react';
import { Box, Paper, TextField, Typography } from "@mui/material";
import { AnnotationComponent } from './AnnotationComponent';
import { AnnotationSection } from '../types';

interface ImageAnnotationsTabProps {
  promptText: AnnotationSection[];
  setPromptText: React.Dispatch<React.SetStateAction<AnnotationSection[]>>;
  imageAnnotations: AnnotationSection[];
  setImageAnnotations: React.Dispatch<React.SetStateAction<AnnotationSection[]>>;
  toggleCollapse: (index: number, type: string, isOriginal: boolean) => void;
}

export const ImageAnnotationsTab: React.FC<ImageAnnotationsTabProps> = ({
  promptText,
  setPromptText,
  imageAnnotations,
  setImageAnnotations,
  toggleCollapse
}) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 2 }}>
    <Box sx={{display:"flex", flexDirection:"column", gap: 2}}>
      <Paper sx={{ p: 2, height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary">Image Preview</Typography>
      </Paper>

      {promptText.map((annotation, index) => (
        <AnnotationComponent
          annotation={annotation}
          index={index}
          onToggleOriginal={() => toggleCollapse(index, "prompt", true)}
          onToggleEditable={() => toggleCollapse(index, "prompt", false)}
          label="Annotation"
          onChange={(text) =>
            setImageAnnotations((prev) =>
              prev.map((item, i) => (i === index ? { ...item, editableText: text } : item))
            )
          }
          isEditable
        />
      ))}
    </Box>

    <Box sx={{ display:"flex", flexDirection:"column", gap: 2}}>
      {imageAnnotations.map((annotation, index) => (
        <Box key={index} sx={{  p: 2, display: "flex", flexDirection: "column", height: "250px" }}>
          <AnnotationComponent
            annotation={annotation}
            index={index}
            onToggleOriginal={() => toggleCollapse(index, "image", true)}
            onToggleEditable={() => toggleCollapse(index, "image", false)}
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