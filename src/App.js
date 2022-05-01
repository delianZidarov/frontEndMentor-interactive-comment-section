import "./App.css";

function App() {
  let data = [
    { name: "bob", message: "hi" },
    {
      name: "carla",
      message: "hello",
      replies: [
        { name: "bob", message: "hi" },
        { name: "mike", message: "hi" },
      ],
    },
    {
      name: "maria",
      message: "hello",
      replies: [
        {
          name: "jessica",
          message: "hi",
          replies: [{ name: "chad", message: "hi" }],
        },
      ],
    },
  ];
  function makeComment(comment, i) {
    return (
      <div key={i}>
        <h2>{comment.name}</h2>
        <p>{comment.message}</p>
      </div>
    );
  }
  function recursiveCreate(comment, i) {
    if (comment.replies == null || comment.replies.length === 0) {
      return makeComment(comment, i);
    }
    return (
      <>
        {makeComment(comment, i)}
        {comment.replies.map((comment, i) => recursiveCreate(comment, i))}
      </>
    );
  }
  return (
    <div className="App">
      <h1>Interactive comment section</h1>
      {data.map((comment, i) => recursiveCreate(comment, i))}
    </div>
  );
}

export default App;
