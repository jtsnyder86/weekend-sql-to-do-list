console.log('script running');

$(handleReady);


function handleReady() {
    console.log('jq running');

    // click listeners
    $('#addBtn').on('click', handleAdd);
    $('#viewTasks').on('click', '.deleteBtn', handleDelete);
    $('#viewTasks').on('click', '.completeBtn', handleComplete)


    getTasks();
};

// function for the add button
function handleAdd() {
    console.log('so much to do!');

    // ajax to communicate with the server for sending input values
    $.ajax({
        method: 'POST',
        url: '/task',
        data: {
            task: $('#taskIn').val()
        }
    }).then(function (response) {
        $('#taskIn').val('');
        getTasks();
    })
}

function handleDelete() {
    console.log('not gonna do this one');

    const id = $(this).closest('tr').data('id')

    console.log(id);

    // comm with the server to delete a task from the list entirely
    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`,
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch(function (err) {
        console.log(err);
        alert('error in delete')
    })
}

// function to handle the completed task
function handleComplete() {
    console.log('feels sooo good');

    const id = $(this).closest('tr').data('id');

    console.log(id);

    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,

    }).then(function (response) {
        getTasks();
    }).catch(function (err) {
        console.log(err);
        alert('error completing')
    })
}

// function to get tasks from server/db; appends new data to the DOM
function getTasks() {
    console.log('in getTasks');
    $('#viewTasks').empty();

    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('GET my tasks', response);

        for (task of response) {
            console.log(task);
            if (task.status === false) {
                $('#viewTasks').append(`
            <tr data-id = ${task.id}>
                <td>${task.task}</td>                
                <td><input type = "checkbox" class = "completeBtn"></input></td>
                <td><span class = "deleteBtn">Delete</span></td>
            </tr>
            `)
            } else {
                $('#viewTasks').append(`
            <tr data-id = ${task.id}>
                <td>${task.task}</td>                
                <td><input type = "checkbox" class = "completeBtn" checked></input></td>
                <td><span class = "deleteBtn">Delete</span></td>
            </tr>
            `)
            }
        }
    })
};
