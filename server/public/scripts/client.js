console.log('script running');

$(handleReady);


function handleReady () {
    console.log('jq running');




    getTasks();
};

function getTasks () {
    console.log('in getTasks');
    $('#viewTasks').empty();

    $.ajax({
        method: 'GET',
        url: '/task'
    }).then( function (response){
        console.log('GET my tasks', response);

        for (task of response){
            console.log(task);
            $('#viewTasks').append(`
            <tr data-id = ${task.id}>
                <td>${task.task}</td>
                <td>${task.status}</td>
                <td><button class = "completeBtn">COMPLETE</button></td>
                <td><button class = "deleteBtn">DELETE</button></td>
            </tr>
            `)
        }
    })
};