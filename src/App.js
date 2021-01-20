import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

import Home from "./Home/Home";
import About from "./About/About";
import Topics from "./Topics/Topics";
import Upload from "./Upload/Upload";
import Review from "./Review/Review";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Homepage from "./UserInfo/Homepage/Homepage";
import Settings from "./UserInfo/Settings/Settings";
import MyIdeas from "./UserInfo/Ideas/MyIdeas";
import MyProjects from "./UserInfo/Projects/MyProjects";
import MyTopics from "./UserInfo/Topics/MyTopics";
import MyReviews from "./UserInfo/Reviews/MyReviews";
import Idea from "./Ideas/Idea";
import User from "./User/User";
import NoMatch404 from "./NoMatch404/NoMatch404";
import Idea_Search from "./Ideas/Idea_Search";

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/upload" component={Upload} />

					<Route exact path="/review" component={Review} />
					<Route path="/review/:id?" component={Review} />

					<Route exact path="/sign-in" component={SignIn} />
					<Route exact path="/sign-up" component={SignUp} />

					<Route exact path="/my-home" component={Homepage} />
					<Route exact path="/my-settings" component={Settings} />
					<Route exact path="/my-ideas" component={MyIdeas} />
					<Route exact path="/my-interested-topics" component={MyTopics} />
					<Route exact path="/my-projects" component={MyProjects} />
					<Route exact path="/my-reviews" component={MyReviews} />

					<Route exact path="/topics" component={Topics} />
					<Route path="/topics/:topic" component={Topics} />

					<Route exact path="/idea" component={NoMatch404} />
					<Route path="/idea/:id?" component={Idea} />

					<Redirect exact from="/user" to="/my-home" />
					<Route path="/user/:id?" component={User} />

					<Route path="/search" component={Idea_Search} />

					<Redirect from="/home" to="/" />

					<Route path="*" component={NoMatch404} />
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	);
}

export default App;
