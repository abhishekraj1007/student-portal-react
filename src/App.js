import './App.css';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme();

function App() {
  const content = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      {content}
    </ThemeProvider>
  );
}

export default App;
