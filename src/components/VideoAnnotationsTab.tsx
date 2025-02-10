import React from 'react';
import { Box, Paper, Typography } from "@mui/material";
import { AnnotationComponent } from './AnnotationComponent';
import { AnnotationSection } from '../types';

interface VideoAnnotationsTabProps {
  videoAnnotations: AnnotationSection[];
  setVideoAnnotations: React.Dispatch<React.SetStateAction<AnnotationSection[]>>;
  toggleCollapse: (index: number, isImageAnnotation: boolean, isOriginal: boolean) => void;
}

export const VideoAnnotationsTab: React.FC<VideoAnnotationsTabProps> = ({
  videoAnnotations,
  setVideoAnnotations,
  toggleCollapse
}) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
    <Paper sx={{ p: 2, height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography color="text.secondary">Video Preview</Typography>
    </Paper>

    <Box sx={{ p: 2, height: "250px", display: "flex", flexDirection: "column"}}>
      {videoAnnotations.map((annotation, index) => (
        <AnnotationComponent
          key={index}
          annotation={annotation}
          index={index}
          onToggleOriginal={() => toggleCollapse(index, false, false)}
          onToggleEditable={() => toggleCollapse(index, false, true)}
          label="Video Note"
          onChange={(text) =>
            setVideoAnnotations((prev) =>
              prev.map((item, i) => (i === index ? { ...item, editableText: text } : item))
            )
          }
          isEditable
        />
      ))}
    </Box>
  </Box>
);