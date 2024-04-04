import React from 'react';
import Login from "../Login";
import Signup from "../Signup/index.jsx";
import Tweet from "../Tweet/index.jsx";
import Comment from "../Comment/index.jsx";

const App = () => {
    return (
        <div>
            <Signup />
            <Login />
            <Tweet />
            <Comment />
        </div>
    );
}


export default App;
