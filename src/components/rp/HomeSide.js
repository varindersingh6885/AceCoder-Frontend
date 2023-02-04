import React from 'react'
import Grid from '@material-ui/core/Grid';
import ListItems from './ListItems'
const HomeSide=()=>(
    <Grid item  justify='center' container xs={12} lg={3} spacing={2} >
                <Grid  container item xs={12} sm={6} md={4} lg={10} wrap='wrap'>
                <ListItems />
                </Grid>
                  <Grid container item xs={12} sm={6} md={4} lg={10} wrap='wrap'>
                  <ListItems />
                </Grid>
                  <Grid container item xs={12} sm={6} lg={10} md={4} wrap='wrap'>
                  <ListItems />
                </Grid>
             </Grid> 
)
export default HomeSide;