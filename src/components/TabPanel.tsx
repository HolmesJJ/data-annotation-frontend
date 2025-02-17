import React from 'react';
import { Box } from "@mui/material";
import { TabPanelProps } from '../types';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box>{children}</Box>}
  </div>
);