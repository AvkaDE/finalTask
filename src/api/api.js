const url = 'http://93.95.97.34/api'

const request = async (url, method = "GET", body) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': "application/json"
    })
  });

  return response.json().catch((e) => { console.log(e.message) });
}

// USERS ////////////////////////////////////////////////////////////////////////////////////

export const getUsers = () => {
  return request(`${url}/users/all`)
}

export const postUsers = ({ page, limit, query }) => {
  const params = {
    filter: {
      query: query || ""
    },
    page: page || 0,
    limit: limit || 0
  }
  return request(`${url}/users`, 'POST', params)
}

export const getUser = (id) => {
  return request(`${url}/users/${id}`)
}

// export const postFiltredUsers = () => {
//   return request(`${url}/users`, 'POST', )
// }

export const editUser = (userData) => {
  return request(`${url}/users/edit`, 'PUT', userData)
}

export const getLogin = (data) => {
  return request(`${url}/users/login`, 'POST', data)
}

/////////////////////////////////////////////////////////////////////////////////////////////


// TASKS ////////////////////////////////////////////////////////////////////////////////////

export const getTask = (id) => {
  return request(`${url}/tasks/${id}`)
}

export const postTasks = ({ query, assignedUsers, userIds, type, status, rank }, { page, limit }) => {
  const params = {
    filter: {
      query: query || '',
      assignedUsers: assignedUsers || [],
      userIds: userIds || [],
      type: type || [],
      status: status || [],
      rank: rank || []
    },
    page: page || 0,
    limit: limit || 0
  }
  return request(`${url}/tasks`, 'POST', params)
}

export const deleteTask = (id) => {
  return request(`${url}/tasks/${id}`, 'DELETE',)
}

export const patchStatus = (id, status) => {
  return request(`${url}/tasks/${id}/status/${status}`, 'PATCH')
}

export const patchWorktime = (id, data) => {
  return request(`${url}/tasks/${id}/worktime`, 'PATCH', data)
}

export const addTask = (data) => {
  return request(`${url}/tasks/createoredit`, 'PUT', data)
}

//////////////////////////////////////////////////////////////////////////////////////////////


// COMMENTS //////////////////////////////////////////////////////////////////////////////////

export const getComments = (id) => {
  return request(`${url}/comments/${id}`)
}

export const addComment = (data) => {
  return request(`${url}/comments/createoredit`, 'PUT', data)
}

export const deleteComment = (id) => {
  return request(`${url}/comments/${id}`, 'DELETE')
}

//////////////////////////////////////////////////////////////////////////////////////////////