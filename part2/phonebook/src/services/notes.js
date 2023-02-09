import axios from "axios";

const BASE_URL = 'http://localhost:3001/persons'

const getAllNotes = () => axios.get(BASE_URL).then(res => res.data)

const addNote = (note) => axios.post(BASE_URL, note).then(res => res.data)

const updateNote = (id, newNote) => axios.put(`${BASE_URL}/${id}`, newNote)

const deleteNote = (id) => axios.delete(`${BASE_URL}/${id}`)

export default { getAllNotes, addNote, updateNote, deleteNote }