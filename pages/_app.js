import { useTheme, ThemeProvider } from "@mui/material"
import Layout from "../components/Layout";
// import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  const theme = useTheme();

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
