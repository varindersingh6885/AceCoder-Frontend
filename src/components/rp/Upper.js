import Card from './Card'
import Grid from '@material-ui/core/Grid';
const Upper=()=>(<Grid container spacing={4}  item xs={10}  style={{marginTop:'5rem'}} >
   
<Grid container alignContent='center'  item sm={6} md={4}  >
<Card />
</Grid>
 <Grid  container alignContent='center' item sm={6} md={4}  >
 <Card />
 </Grid>
 <Grid  container alignContent='center'  item sm={6} md={4}  >
 <Card />
 </Grid>
</Grid>)
export default Upper;