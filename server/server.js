const express = require ('express');

const app = express ();

const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded({extended: true}));

const taskRouter = require ('./routes/task.router');
app.use('/task', taskRouter);



app.listen(PORT, () => {
    console.log('app is running on PORT', PORT);
})