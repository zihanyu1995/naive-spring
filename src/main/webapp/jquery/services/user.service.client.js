function  UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = '/api/user';
    var self = this;

    function findAllUsers(callback) {
        return fetch(self.url).then((d)=>d.json());
    }
    function findUserById(userId) {
        return fetch(
            self.url + '/' + userId).then(d=>d.json());
    }
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user)
        });
    }
    function updateUser(userId, user) {
        return fetch(self.url + '/' + userId, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function deleteUser(userId, callback) {
        return fetch(
            self.url + '/' + userId,
            { method: 'DELETE' }
        );
    }
    function createUser(user){
        return fetch(self.url,
            {   body: JSON.stringify(user),
                method : 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            });
    }
}
