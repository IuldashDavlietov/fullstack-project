/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'
import { toast } from 'react-toastify'
import { FaTrashCanArrowUp, FaPlus, FaListCheck } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'
import { RiSendInsLine } from 'react-icons/ri'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Home() {

  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')



  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // get value from input
    const title = e.target[0].value;

    // create new todo 
    addTodo({ title, isDone: false })

    // reset the form
    e.target.reset()
  }

  // axios CRUD operation
  const getTodos = async () => {
    try {
      const res = await axios.get(BASE_URL)
      setTodos(res.data.result.rows)
    } catch (error) {
      toast.error('Something went wrong displaying todos.')
    }
  }

  const addTodo = async (data) => {
    try {
      await axios.post(BASE_URL, data)
      toast.success('New todo created.', { position: 'top-right' })
      getTodos()
    } catch (error) {
      toast.error('Something went wrong adding todo.')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(BASE_URL + id)
      toast.success('Todo deleted.', { position: 'top-right' })
      getTodos()
    } catch (error) {
      toast.error('Something went wrong deleting todo.')
    }
  }


  const updateTodo = async (id, data) => {
    try {
      await axios.put(BASE_URL + id, data)
      toast.success('Todo Updated.', { position: 'top-right' })
      getTodos()
    } catch (error) {
      toast.error('Something went wrong updating todo.')
    }
  }

  

  // useEffect for initial load
  useEffect(() => {
    getTodos()
  }, []);


  return (
    <Container className="py-5" style={{ maxWidth: '640px' }}>

      <Card className="shadow-sm border-0">
        <CardBody>
          <CardTitle tag="h5" className="d-flex align-items-center gap-2 mb-3">
            <FaListCheck /> CH12 Todo
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <Label className="visually-hidden" for="title">
              Task
            </Label>
            <InputGroup>
              <Input
                id="title"
                name="title"
                placeholder="add new task.."
                type="text"
              />
              <Button type='submit' color="primary" className="d-flex align-items-center gap-2">
                <FaPlus /> Add
              </Button>
            </InputGroup>
          </Form>
        </CardBody>
      </Card>

      <ListGroup className='mt-4'>
        {
          todos.length === 0
            ? (
              <ListGroupItem className="text-center text-muted py-4">
                No tasks yet — add one above.
              </ListGroupItem>
            )
            : todos.map(t => (
              <ListGroupItem key={t.id} className='d-flex justify-content-between align-items-center gap-3'>

                {
                  editingId === t.id
                    ? (
                      <>
                        <Input
                          bsSize="sm"
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.currentTarget.value)}
                        />
                        <div className="d-flex gap-2">
                          <Button color="success" size="sm" className="d-flex align-items-center" onClick={() => { updateTodo(t.id, { title: editValue }); setEditingId(null) }}>
                            <RiSendInsLine />
                          </Button>
                          <Button color="secondary" size="sm" className="d-flex align-items-center" onClick={() => setEditingId(null)}>
                            <MdOutlineCancel />
                          </Button>
                        </div>
                      </>
                    )
                    : (
                      <>
                        <span className="me-auto">{t.title}</span>
                        <Badge color={t.isDone ? 'success' : 'secondary'} pill>
                          {t.isDone ? 'Done' : 'Pending'}
                        </Badge>
                        <div className="d-flex gap-2">
                          <Button color="warning" size="sm" className="d-flex align-items-center" onClick={() => { setEditingId(t.id); setEditValue(t.title) }}>
                            <FiEdit />
                          </Button>
                          <Button color="danger" size="sm" className="d-flex align-items-center" onClick={() => deleteTodo(t.id)}>
                            <FaTrashCanArrowUp />
                          </Button>
                        </div>
                      </>
                    )
                }
              </ListGroupItem>
            ))
        }
      </ListGroup>
    </Container>
  )
}

/* 

useEffect(() => {
  1. Effect

  return () => {
    2. Cleanup
  };
}, [
   3. Dependencies
]); 


1) No dependency array — runs on every render

useEffect(() => {
  console.log("Runs every render");
});

2) Empty dependency array — runs once

useEffect(() => {
  console.log("Runs once");
}, []);


3) Dependency array — runs on mount + when a dependency changes

useEffect(() => {
  console.log("Count changed");
}, [count]);

*/