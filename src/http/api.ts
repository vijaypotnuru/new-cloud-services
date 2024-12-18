import axios from 'axios'

// const baseURL = 'http://192.168.0.108:3000/'

// const baseURL = 'https://vibepattern.onrender.com/'

// vps
const baseURL = 'https://newapiroute.vibepattern.com/'
//
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createProject = (data: any) => api.post('/createProject', data)

export const getProjects = () => api.get('/getAllProjects')

export const createUser = (data: any) => api.post('/createUser', data)

export const getAllUsers = () => api.get('/getAllUsers')

export const getProjectById = (id: any) => api.get(`/getProjectById/${id}`)

export const updateProject = (id: any, data: any) =>
  api.put(`/updateProject/${id}`, data)

export const addMilestone = (id: any, data: any) =>
  api.post(`/addMilestone/${id}`, data)

export const loginUser = (data: any) => api.post('/loginUser', data)

export const makeOrder = (data: any) => api.post('/makeOrder', data)

export const getPaymentDetailsByUserId = (id: any) =>
  api.get(`/getPaymentDetailsByUserId/${id}`)
