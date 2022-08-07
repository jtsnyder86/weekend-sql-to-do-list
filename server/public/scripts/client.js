console.log('script running');

$(handleReady);


function handleReady () {
    console.log('jq running');

    // click listeners
    $('#addBtn').on('click', handleAdd);
    $('#viewTasks').on('click', '.deleteBtn', handleDelete);
    $('#viewTasks').on('click', '.completeBtn', handleComplete)


    getTasks();
};

// function for the add button
function handleAdd () {
    console.log('so much to do!');

    // ajax to communicate with the server
    $.ajax({
        method: 'POST',
        url: '/task',
        data: {
            task: $('#taskIn').val()
        }
    }).then( function (response) {
        $('#taskIn').val('');
        getTasks ();
    })
}

function handleDelete () {
    console.log('not gonna do this one');

    const id = $(this).closest('tr').data('id')

    console.log(id);

    // comm with the server
    $.ajax ({
        method: 'DELETE',
        url: `/task/${id}`,
    }).then( function (response) {
        console.log(response);
        getTasks ();
    }).catch( function (err) {
        console.log(err);
        alert ('error in delete')
    })
}

function handleComplete () {
    console.log('feels sooo good');

    const id = $(this).closest('tr').data('id');

    console.log(id);

    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
        
    })
}

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