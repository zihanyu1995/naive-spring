var tbody;
var template;
var userService;
var tempid;

$(document).ready(function() {
    userService = new UserServiceClient();
    tbody = $('tbody');
    template = $('.template');
    findAllUsers();
    $("#createUser").click(createUser);
    $("#updateBtn").click(updateUser);
});

function updateUser() {
    let user = {
        username: $('#username').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        job: $('#job').val()
    };
    userService.updateUser(tempid,user).then(
        ()=>{
            $('div').load('user-admin.template.client.html',()=>{
                location.reload();
            });
        }
    );
}

function findAllUsers() {
    userService.findAllUsers().then(renderUsers);
}

function deleteUser(event) {
    let id = $(event.currentTarget).parent().parent().attr('id');
    userService.deleteUser(id).then(findAllUsers);
}

function editUser(event) {
    tempid = $(event.currentTarget).parent().parent().attr('id');
    $('div').load('../profile/profile.template.client.html',()=>{
        userService.findUserById(tempid).then(
            user=>{
                $(document).ready(()=>{
                    $('#username').val(user.username);
                    $('#firstName').val(user.firstName);
                    $('#lastName').val(user.lastName);
                    $('#job').val(user.job);
                });
            }
        );
    });

}

function createUser() {
    let user = {
        username: $('#usernamef').val(),
        firstName: $('#firstnamef').val(),
        lastName: $('#lastnamef').val(),
        job: $('#jobf').val()
    };
    userService.createUser(user).then(findAllUsers);
}

function renderUsers(users) {
    tbody.empty();
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        console.log(user);
        let clone = template.clone();
        clone.attr('id', user.id)
        clone.find('.delete').click(deleteUser);
        clone.find('.edit').click(editUser);
        clone.find('.username').html(user.username);
        clone.find('.job').html(user.job);
        clone.find('.firstName').html(user.firstName);
        clone.find('.lastName').html(user.lastName);
        tbody.append(clone);
    }
}
