import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import httpService from './services/httpServices';
import config from './config.json';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // pending state > resolved in case of success > rejected in case of failure
    const { data: posts } = await httpService.get(config.apiEndpoint);
    this.setState({ posts });
  }

  // Adding Data
  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await httpService.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  // Updating Data with put ou patch
  handleUpdate = async post => {
    post.title = "UPDATE";
    await httpService.put(config.apiEndpoint + '/' + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({ posts });
  };

  // Deleting Data
  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await httpService.delete('s' + config.apiEndpoint + '/' + post.id, post);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert('This post has already been deleted.');
      }
      this.setState({ posts: originalPosts });
      // Expected error (404: not found, 400: bad request) - CLIENT ERRORS
      // - Display a specific error message.      
      //
      // Unexpected error (network down, server down, db down, bug in our code)
      // - Log them
      // - Display a generic and friendly error message.      
    }
    

    
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
