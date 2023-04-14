import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";

const Form = ({ input,
    setInput,
    todos,
    setTodos,
    editTodo,
    setEditTodo,
    description,
    setDescription, }) => {

    const [filter, setFilter] = useState("");

    const filteredData = todos.filter(todo =>
        todo.title.toLowerCase().includes(filter.toLowerCase())
    );

    const updateTodo = (title, description, id, completed, dueDate) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { ...todo, title, description, completed, dueDate } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };


    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
            setDescription(editTodo.description);
        } else {
            setInput("");
            setDescription("");
        }
    }, [setInput, setDescription, editTodo]);

    const [dueDate, setDueDate] = useState("");

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            const newTodo = {
                id: uuidv4(),
                title: input,
                description: description,
                completed: false,
                timestamp: new Date().toISOString(),
                dueDate: dueDate,
            };
            setTodos([...todos, newTodo]);
            setInput("");
            setDescription("");
            setDueDate("");
        } else {
            updateTodo(input, description, editTodo.id, editTodo.completed, dueDate);
            setDescription("");
            setDueDate("");
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Timestamp",
            dataIndex: "timestamp",
            key: "timestamp"
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (dueDate) => (dueDate ? new Date(dueDate).toLocaleDateString() : "N/A")
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        }
    ];

    return (
        <div>
            <Table columns={columns} dataSource={filteredData} />
            <Table columns={columns} dataSource={todos} />
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter a todo"
                    className="task-input"
                    value={input}
                    required
                    onChange={(event) => setInput(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter a description"
                    className="task-input"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <input
                    type="date"
                    placeholder="Enter a due date"
                    className="task-input"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="search"
                    className="task-input"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                />


                <button className="button-add" type="submit">
                    {editTodo ? "OK" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default Form;
