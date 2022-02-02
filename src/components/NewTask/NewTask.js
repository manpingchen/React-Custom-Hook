import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const createTaskHandler = (taskText, tasksObj) => {
    const generatedId = tasksObj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    const requestConfig = {
      url: "https://react-movie-890b6-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: { "Content-Type": "application/json" },
    };

    sendRequest(requestConfig, createTaskHandler.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
