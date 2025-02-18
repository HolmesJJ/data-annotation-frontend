import React, { useState } from "react";
import { Box, Container, Button, Tabs, Tab } from "@mui/material";
import { TabPanel } from './components/TabPanel';
import { ImageAnnotationsTab } from './components/ImageAnnotationsTab';
import { VideoAnnotationsTab } from './components/VideoAnnotationsTab';
import { AnnotationSection } from './types';

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [promptText, setPromptText] = useState<AnnotationSection[]>([
    { originalText: "Original prompt text 1", editableText: "Edditable prompt text 1", isOriginalCollapsed: true, isEditableCollapsed: false },
  ]);

  const [imageAnnotations, setImageAnnotations] = useState<AnnotationSection[]>([
    { originalText: "Original annotation text 1", editableText: "Second annotation text 1", isOriginalCollapsed: true, isEditableCollapsed: false },
    { originalText: "Original annotation text 2", editableText: "Second annotation text 2", isOriginalCollapsed: true, isEditableCollapsed: false }
  ]);

  const [videoAnnotations, setVideoAnnotations] = useState<AnnotationSection[]>([
    { originalText: "Original annotation text 1", editableText: "Second annotation text 1", isOriginalCollapsed: true, isEditableCollapsed: false },
  ]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

  const toggleCollapse = (index: number, type: string, isOriginal: boolean) => {
    const key = isOriginal ? "isOriginalCollapsed" : "isEditableCollapsed";
  
    const updateAnnotations = (annotations: AnnotationSection[]) =>
      annotations.map((item, i) =>
        i === index ? { ...item, [key]: !item[key] } : item
      );
  
    if (type === "prompt") {
      setPromptText((prev) => updateAnnotations(prev));
    } else if (type === "image") {
      setImageAnnotations((prev) => updateAnnotations(prev));
    } else {
      setVideoAnnotations((prev) => updateAnnotations(prev));
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

      <br />

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2
      }}>
        
        {/* Question whether this is the standard way of coding  */}
        <TabPanel value={tabValue} index={0}>
          <Button onClick={() => setTabValue((prev) => (prev + 1))}
            variant="contained" 
            size="small"
            sx={{ width: 100 }}
          >
            Next
          </Button>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Button onClick={() => setTabValue((prev) => (prev - 1))}
            variant="contained" 
            size="small"
            sx={{ width: 100 }}
          >
            Previous
          </Button>
        </TabPanel>
        <Button 
          variant="contained" 
          size="small"
          sx={{ width: 100}} 
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default App;