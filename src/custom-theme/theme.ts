import { createTheme} from '@mui/material/styles';
import { Theme } from '@mui/material/styles';


declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
const theme = createTheme();

export default theme;