import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FrontendRoadmapComponent from '../components/roadmap-components/FrontendRoadmapComponent'
import BackendRoadmapComponent from '../components/roadmap-components/BackendRoadmapComponent'

function Roadmap() {
  // Handle the state changes so only one panel in the accordion
  // is open at a time
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Use dark theme components
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <Box
      sx={{ minHeight: '100vh', color: 'white', backgroundColor: '#151517' }}>
      <div style={{ padding: '60px', margin: 'auto', width: '80%' }}>
        <Typography variant='h2' align='center' gutterBottom>
          Frontend and Backend Roadmap
        </Typography>

        <Typography
          variant='h5'
          align='center'
          gutterBottom
          sx={{ marginBottom: '40px', color: '#4C94FF' }}>
          Not sure where to begin your programming journey? Check out our
          <strong style={{ color: '#C4DCFF' }}> roadmap </strong>below.
        </Typography>

        <ThemeProvider theme={darkTheme}>
          <div style={{ margin: 'auto', padding: '20px', width: '80%' }}>
            <Accordion
              sx={{ padding: '10px' }}
              expanded={expanded === 'frontend-panel'}
              onChange={handleChange('frontend-panel')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='roadmap-accordion-frontend-panel'>
                <Typography variant='h5'>Frontend Roadmap</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <FrontendRoadmapComponent />
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ padding: '10px' }}
              expanded={expanded === 'backend-panel'}
              onChange={handleChange('backend-panel')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='roadmap-accordion-backendend-panel'>
                <Typography variant='h5'>Backend Roadmap</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BackendRoadmapComponent />
              </AccordionDetails>
            </Accordion>
          </div>
        </ThemeProvider>
      </div>
    </Box>
  )
}

export default Roadmap
