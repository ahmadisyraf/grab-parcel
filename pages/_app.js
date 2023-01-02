import { useTheme, ThemeProvider } from "@mui/material"
import Layout from "../components/layout";
// import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
