import React,{ useState } from 'react';
import PostList from "../../components/PostList/PostList.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {useDispatch, useSelector } from "react-redux";

const FeedPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
 
	return (
		<div>
			<section className="feed_status">
				<form>
					<Input type="text" placeholder="Your Status" />
					<button className="input-submit">
						Update
					</button>
				</form>
			</section>
			<section className="feed_control">
				<button onClick={() => setModalOpened(true)}>
					New Post
				</button>
				{ modalOpened && <Modal setModalOpened={setModalOpened} />}
				<PostList />
			</section>
		</div>
)
}

export default FeedPage;