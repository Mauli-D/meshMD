import React, { useState } from "react";
import MultipleValueTextInput from "react-multivalue-text-input";
import Axios from "../Axios";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [state, setState] = useState({
    content: "",
    title: "",
    tags: ["hello"],
    date: new Date().toISOString(),
  });

  const history = useHistory();

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...state,
      authorId: localStorage.getItem("authorId"),
    };
    Axios.post("/api/posts", body, { headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }})
      .then(() => {
        alert(`You are successfully added post!`);
      })
      .then(() => history.push("/posts"));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input
            className="form-control"
            placeholder="Title...."
            value={state.title}
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Content</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="content"
            value={state.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <MultipleValueTextInput
          onItemAdded={(item, allItems) =>
            setState({ ...state, tags: [...state.tags, item] })
          }
          onItemDeleted={(item, allItems) =>
            setState({ ...state, tags: state.tags.filter((x) => x !== item) })
          }
          label="Tags"
          name="tags"
          placeholder="Enter whatever items you want"
          values={state.tags}
        />

        <input
          type="submit"
          name="submit"
          className="btn btn-info btn-md"
          value="submit"
        />
      </form>
    </div>
  );
};

export default CreatePost;
