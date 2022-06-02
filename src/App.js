import "antd/dist/antd.css";
import "./App.css";
import { Table, Modal, Button, Input } from "antd";
import { useEffect, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineExclamationCircle,
  AiOutlineSearch,
} from "react-icons/ai";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
      //   filterDropdown: ({
      //     setSelectedKeys,
      //     selectedKeys,
      //     confirm,
      //     clearFilters,
      //   }) => {
      //     return (
      //       <>
      //         <Input
      //           placeholder="Type text here"
      //           value={selectedKeys[0]}
      //           onChange={(e) => {
      //             setSelectedKeys(e.target.value ? [e.target.value] : []);
      //             confirm({ closeDropdown: false });
      //           }}
      //           onPressEnter={() => {
      //             confirm();
      //           }}
      //           onBlur={() => {
      //             confirm();
      //           }}
      //         ></Input>
      //         <Button
      //           onClick={() => {
      //             confirm();
      //           }}
      //           type="primary"
      //         >
      //           Search
      //         </Button>
      //         <Button
      //           onClick={() => {
      //             clearFilters();
      //           }}
      //           type="danger"
      //         >
      //           Reset
      //         </Button>
      //       </>
      //     );
      //   },
      //   filterIcon: () => {
      //     return (
      //       <AiOutlineSearch style={{ color: "#868B8E", fontSize: "18px" }} />
      //     );
      //   },
      //   onFilter: (value, record) => {
      //     return record.userId === value;
      //   },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      // filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => {
      //   return (
      //     <>
      //       <Input
      //         placeholder="Type text here"
      //         value={selectedKeys[0]}
      //         onChange={(e) => {
      //           setSelectedKeys(e.target.value ? [e.target.value] : []);
      //           confirm({ closeDropdown: false });
      //         }}
      //         onPressEnter={() => {
      //           confirm();
      //         }}
      //         onBlur={() => {
      //           confirm();
      //         }}
      //       ></Input>
      //       <Button
      //         onClick={() => {
      //           confirm();
      //         }}
      //         type="primary"
      //       >
      //         Search
      //       </Button>
      //       <Button
      //         onClick={() => {
      //           clearFilters();
      //         }}
      //         type="danger"
      //       >
      //         Reset
      //       </Button>
      //     </>
      //   );
      // },
      // filterIcon: () => {
      //   return (
      //     <AiOutlineSearch style={{ color: "#868B8E", fontSize: "18px" }} />
      //   );
      // },
      // onFilter: (value, record) => {
      //   return record.id === value;
      // },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              placeholder="Type here to search"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return (
          <AiOutlineSearch style={{ color: "#868B8E", fontSize: "18px" }} />
        );
      },
      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => String(completed),

      // filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => {
      //   return (
      //     <>
      //       <Input
      //         placeholder="Type text here"
      //         value={selectedKeys[0]}
      //         onChange={(e) => {
      //           setSelectedKeys(e.target.value ? [e.target.value] : []);
      //           confirm({ closeDropdown: false });
      //         }}
      //         onPressEnter={() => {
      //           confirm();
      //         }}
      //         onBlur={() => {
      //           confirm();
      //         }}
      //       ></Input>
      //       <Button
      //         onClick={() => {
      //           confirm();
      //         }}
      //         type="primary"
      //       >
      //         Search
      //       </Button>
      //       <Button
      //         onClick={() => {
      //           clearFilters();
      //         }}
      //         type="danger"
      //       >
      //         Reset
      //       </Button>
      //     </>
      //   );
      // },
      // filterIcon: () => {
      //   return (
      //     <AiOutlineSearch style={{ color: "#868B8E", fontSize: "18px" }} />
      //   );
      // },
      // onFilter: (value, record) => {
      //   return record.completed.toLowerCase().includes(value.toLowerCase());
      // },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <AiOutlineEdit
              onClick={() => {
                onEditTodo(record);
              }}
            />
            <AiOutlineDelete
              onClick={() => {
                onDeleteTodo(record);
              }}
              style={{ color: "red", marginLeft: "15px" }}
            />
          </>
        );
      },
    },
  ];

  const onAddTodo = () => {
    const newTodo = {
      userId: "Enter",
      id: data.length + 1,
      title: "Enter task",
      completed: "false",
      idEditable: "true",
    };
    setData((pre) => {
      return [newTodo, ...pre];
    });
  };

  const onDeleteTodo = (record) => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <AiOutlineExclamationCircle />,
      content: "The task will be deleted",
      okType: "danger",
      onOk: () => {
        setData((pre) => {
          return pre.filter((todos) => todos.id !== record.id);
        });
      },
    });
  };

  const onEditTodo = (record) => {
    setIsEditing(true);
    setEditingTodo({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTodo(null);
  };

  async function fetchData() {
    await fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((res) => setData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data);

  return (
    <div className="App">
      <div>
        <Button
          onClick={onAddTodo}
          type="primary"
          style={{
            display: "block",
            margin: "16px",
          }}
        >
          Add a Task
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          editable={true}
        ></Table>
        <Modal
          title="Edit To-Do"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setData((pre) => {
              return pre.map((todos) => {
                if (todos.id === editingTodo.id) {
                  return editingTodo;
                } else {
                  return todos;
                }
              });
            });
            resetEditing();
          }}
        >
          {editingTodo?.idEditable && (
            <>
              <Input
                value={editingTodo?.userId}
                onChange={(e) => {
                  setEditingTodo((pre) => {
                    return { ...pre, userId: e.target.value };
                  });
                }}
              />
              {/* <Input
                value={editingTodo?.id}
                onChange={(e) => {
                  setEditingTodo((pre) => {
                    return { ...pre, id: e.target.value };
                  });
                }}
              /> */}
            </>
          )}

          <Input
            value={editingTodo?.title}
            onChange={(e) => {
              setEditingTodo((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingTodo?.completed}
            onChange={(e) => {
              setEditingTodo((pre) => {
                return { ...pre, completed: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
