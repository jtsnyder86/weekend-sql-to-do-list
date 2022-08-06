console.log('script running');

$(handleReady);


function handleReady () {
    console.log('jq running');




    getTasks();
};

function getTasks () {
    console.log('in getTasks');
    $('#viewTasks').empty();

}