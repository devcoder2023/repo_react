import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ToDo2({ todo, handleCheck }) {

    function handleCheckClick() {
        // todo.isComplete
        handleCheck(todo.id);
    }
    return(
        <>
        <Card className='cardToDo' sx={{ minWidth: 275, background: "#428aa3", color: "white", marginTop: 5}}>
            <CardContent>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Typography variant='h5' sx={{textAlign: "right", fontFamily: "zain", fontWeight: "400"}}>
                    {todo.title}
                    </Typography>
                    <Typography variant='h6' sx={{textAlign: "right", fontFamily: "zain", fontWeight: "300"}}>
                    {todo.content}
                    </Typography>
                </Grid>
                <Grid size={4} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <IconButton className='iconButtonToDo' style={{color: todo.isComplete ? "white" : "lightgreen", backgroundColor: todo.isComplete ? "lightgreen" : "white", border: "2px solid lightgreen"}} onClick={handleCheckClick}>
                    <CheckIcon />
                </IconButton>
                <IconButton className='iconButtonToDo' style={{color: "#ff8066", backgroundColor: "white", border: "2px solid #ff8066"}}>
                    <EditIcon />
                </IconButton>
                <IconButton className='iconButtonToDo' style={{color: "#d03b29", backgroundColor: "white", border: "2px solid #d03b29"}}>
                    <DeleteIcon />
                </IconButton>
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        
        </>
    );
}