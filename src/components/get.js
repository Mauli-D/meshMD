import React from "react";

export default class GetPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
    };
  }

  async componentDidMount() {
    const url = "http://3.18.223.248:8888/api/posts";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ posts: data.posts, loading: false });
  }

  render() {
    const { posts } = this.state;
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!posts.length) {
      return <div>didn't get a person</div>;
    }
    return (
      <div className="col-md-6 offset-md-3 text-justify">
        {posts.map((post, index) => {
          return (
            <div className="pt-4" key={index}>
              <p>Id: {post.id}</p>
              <h3>Title: {post.title}</h3>
              <p> Content: {post.content}</p>
              <p>Date: {post.date}</p>
              <i>Tags: {JSON.stringify(post.tags)}</i>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
