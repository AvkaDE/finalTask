import { makeAutoObservable, onBecomeObserved } from "mobx";
import { addComment, addTask, deleteComment, deleteTask, editUser, getComments, getLogin, getTask, getUser, getUsers, patchStatus, patchWorktime, postTasks, postUsers } from "../api/api.js";

class EventsStore {
    data = [];
    filtredData = [];
    usersData = [];
    logindata = {};
    userData = {};
    filterTasks = {
        query: '',
        assignedUsers: [],
        userIds: [],
        type: [],
        status: [],
        rank: []
    }
    paginationData = {
        page: 0,
        limit: 10,
        total: 0
    }

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        });

        // onBecomeObserved(this, 'usersData', this.fetchUsers);
    }

    get users() {
        return this.usersData
    }

    get tasks() {
        return this.data
    }

    get loginData() {
        return this.logindata
    }

    get pagination() {
        return this.paginationData
    }

    getEvent(id) {
        return getTask(id)
    }

    getAssignedTasks(id, page) {
        return postTasks({ assignedUsers: [id] }, { page, limit: 10 })
    }

    *addTask(data) {
        yield addTask(data);
        yield this.fetchTasks();
    }

    patchWorkTime(id, data) {
        return patchWorktime(id, data)
    }

    fetchComments(id) {
        return getComments(id)
    }

    addComment(data) {
        return addComment(data);
    }

    getUser(id) {
        return getUser(id)
    }

    *editUser(data) {
        const response = yield editUser(data)
    }

    deleteComment(id) {
        return deleteComment(id);
    }

    *deleteTask(id) {
        yield deleteTask(id)
        yield this.fetchTasks()
    }

    *fetchUsers() {
        const response = yield getUsers();
        this.usersData = response
    }

    postUsers(page = 0) {
        return postUsers({page, limit: 10})
    }

    *fetchTasks(pageNum = this.paginationData.page) {
        const response = yield postTasks(this.filterTasks, {...this.paginationData, page: pageNum});
        const {data, page, limit, total} = response || {} 
        this.data = data
        this.paginationData = {page, limit, total}
    }

    changeFilter(name, values) {
        this.filterTasks[name] = values
    }

    patchTaskStatus(taskId, status) {
        return patchStatus(taskId, status)
    }

    async fetchLogin(data) {
        const response = await getLogin(data);
        this.logindata = response
        return data.password
    }
}

export const events = new EventsStore();