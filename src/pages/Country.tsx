import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Grid, Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { InitialStateType } from '../redux/reducers';
import { fetchCountry } from '../redux/actions';
import useCountryFinder from '../custom-hooks/useCountryFinder';

const useStyles = makeStyles((theme) => ( {
  container: {
    maxWidth: '100%',
    overflowX: 'hidden',
    padding: '9em 0em 0em 0em',
    [theme.breakpoints.down('md')]: {
      padding: '1em 0em 0em 0em',
    },
  },
  subContainer: {
    textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    margin: '10em 0em 0em 0em',
    width: '100%',
  },
  },
  detailsSection: {
    marginTop: '4em',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  tabContext: {
fontSize: '0.9em',
  },

}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '70%',
  maxHeight: '100%',
});

const NewTab = styled(Tab)({
  fontSize: '0.7em',
  minWidth: 2,
  paddingInline:'0.5em',
});

const Country = () => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = React.useState('1');
  const classes = useStyles();
  const { nameIdAlpha } = useParams() as any;
  const dispatch = useDispatch();

  const country = useSelector((state: InitialStateType) => state.country.data);
  const countryBordersFullNames = useCountryFinder(country?.borders);
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(fetchCountry(nameIdAlpha));
  }, [dispatch, nameIdAlpha]);

  if (!country) {
    return (
      <Grid
        container
        direction='row'
        className={classes.container}
        alignItems='center'
        justifyContent='center'
      >
        Loading.......
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction={matchesMd ? 'column' : 'row'}
      className={classes.container}
     justifyContent='center'
      alignItems={matchesMd ? 'center': undefined}
    >
      <Grid item className={classes.subContainer} md={6} sm={12} >
        <Img src={country.flag} alt='flag-single' />
      </Grid>

      <Grid item className={classes.subContainer} md={6} sm={12}>
        <Grid
          container
          alignItems={matchesMd ? 'center' : 'flex-start'}
          direction='column'
          className={classes.detailsSection}
        >
          <Grid item>
            <Typography variant={matchesMd ? 'h5' : 'h3'}>{country.name}</Typography>
          </Grid>
          <Grid item className={classes.tabContext}>
            <TabContext value={value}>
              <Box
                sx={{
                  bgcolor: 'background.paper'
                }}
              >
                <TabList onChange={handleChange}>
                  <NewTab label='Other Names' value='1'/>
                  <NewTab label='Region' value='2' />
                  <NewTab label='Borders' value='3' />
                  <NewTab label='Currencies' value='4' />
                  <NewTab label='Languages' value='5' />
                </TabList>
              </Box>

              <TabPanel value='1'>{country.nativeName}</TabPanel>
              <TabPanel value='2'>{country.region}</TabPanel>
              <TabPanel value='3'>
                {countryBordersFullNames.length !== 0 ? (
                  countryBordersFullNames?.map(
                    (item: string, index: number) => {
                      return (
                        <Typography key={index * 100 + 1}>{item}</Typography>
                      );
                    }
                  )
                ) : (
                  <Typography>No Borders</Typography>
                )}
              </TabPanel>
              <TabPanel value='4'>
                {country.currencies?.map((curr) => {
                  return <Typography key={curr.name}>{curr.name}</Typography>;
                })}
              </TabPanel>
              <TabPanel value='5'>
                {country.languages?.map((lang) => {
                  return <Typography key={lang.name}>{lang.name}</Typography>;
                })}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Country;
