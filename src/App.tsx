import React, { useState } from "react";
import { Box, Container, Button, Tabs, Tab } from "@mui/material";
import { TabPanel } from './components/TabPanel';
import { ImageAnnotationsTab } from './components/ImageAnnotationsTab';
import { VideoAnnotationsTab } from './components/VideoAnnotationsTab';
import { AnnotationSection } from './types';

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [promptText, setPromptText] = useState("");

  const [imageAnnotations, setImageAnnotations] = useState<AnnotationSection[]>([
    { originalText: "Original annotation text 1", editableText: "Second annotation text 1", isOriginalCollapsed: true, isEditableCollapsed: false },
    { originalText: "Original annotation text 2", editableText: "Second annotation text 2", isOriginalCollapsed: true, isEditableCollapsed: false }
  ]);

  const [videoAnnotations, setVideoAnnotations] = useState<AnnotationSection[]>([
    { originalText: "Original annotation text 1", editableText: "Second annotation text 1", isOriginalCollapsed: true, isEditableCollapsed: false },
  ]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

  const toggleCollapse = (index: number, isImageAnnotation: boolean, isOriginal: boolean) => {
    if (isImageAnnotation) {
      setImageAnnotations((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, [isOriginal ? "isOriginalCollapsed" : "isEditableCollapsed"]: !item[isOriginal ? "isOriginalCollapsed" : "isEditableCollapsed"] } : item
        )
      );
    } else {
      setVideoAnnotations((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, [isOriginal ? "isOriginalCollapsed" : "isEditableCollapsed"]: !item[isOriginal ? "isOriginalCollapsed" : "isEditableCollapsed"] } : item
        )
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 0 }}>
      <Box sx={{ width: "100%", minWidth: "1200px" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Image Annotations" />
            <Tab label="Video Annotations" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ImageAnnotationsTab
            promptText={promptText}
            setPromptText={setPromptText}
            imageAnnotations={imageAnnotations}
            setImageAnnotations={setImageAnnotations}
            toggleCollapse={toggleCollapse}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <VideoAnnotationsTab
            videoAnnotations={videoAnnotations}
            setVideoAnnotations={setVideoAnnotations}
            toggleCollapse={toggleCollapse}
          />
        </TabPanel>
      </Box>

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button 
          variant="contained" 
          size="small"
          sx={{ minWidth: 100 }} // Give button a minimum width
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default App;