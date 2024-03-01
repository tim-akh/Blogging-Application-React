import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentCreate from '../comment/CommentCreate';
import VotingService from '../service/VotingService';
import AdminService from '../service/AdminService';

const PublicationDetails = () => {

  const Auth = useAuth()
  const isAuthenticated = Auth.userIsAuthenticated()
  var isRoleUser = false;
  var isRoleAdmin = false;

  const authUser = Auth.getUser()
  if (isAuthenticated) {
    isRoleUser = authUser.role === 'USER'
    isRoleAdmin = authUser.role === 'ADMIN'
  }

  

  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublication = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/publications/${id}`);
      setPublication(result.data);
    };
    fetchPublication();
  }, [id]);



  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/comments/${id}`);
    //navigate("/publications/" + publication.id);
    window.location.reload();
  };


  if (!publication) {
    return <div>Loading...</div>;
  }
  
  const formatDate = (dateISOString) => {
    var date = new Date(Date.parse(dateISOString))
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" +
     date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>Rating: {publication.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</p>
        <p>Author: {publication.user.username}</p>
        <p>{formatDate(publication.createdAt)}</p>
        <h2>{publication.header}</h2>
        <p>{publication.content}</p>
        <div>
        {publication.comments.length === 0? "Be first to leave a comment" :
        <div>
          <h3>Comments</h3>
          <ul>
            {publication.comments.map(comment => (
              <li key={comment.id}>
                <Link to={"/users/" + comment.user.username}>{comment.user.username}</Link>
                : {comment.content} Rating: {comment.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}<br />
              </li>
            ))}
          </ul>
        </div>}
        <CommentCreate publication={publication} />
      </div>
      </div>
    )
  }
  else {
    return (
      <div>
        {authUser.username === publication.user.username &&
          <Link to={"/publications/" + publication.id + "/edit"}>Edit publication</Link>
        }
        <p>Rating: {publication.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</p>
        <p>Author: <Link to={"/users/" + publication.user.username}>{publication.user.username}</Link></p>
        <p>{formatDate(publication.createdAt)}</p>
        <h2>{publication.header}</h2>
        <p>{publication.content}</p>
        <div>
          { publication.votes.map(vote => vote.user.username).includes(authUser.username) &&
            publication.votes.find(vote => vote.user.username === authUser.username).dynamic === 1
          ?
          <button onClick={() => VotingService.handlePublicationUpvoteRemove(authUser, publication)}>Upvoted</button> 
          :
          <button onClick={() => VotingService.handlePublicationUpvote(authUser, publication)}>Upvote</button> 
          }
          { publication.votes.map(vote => vote.user.username).includes(authUser.username) &&
            publication.votes.find(vote => vote.user.username === authUser.username).dynamic === -1
          ?
          <button onClick={() => VotingService.handlePublicationDownvoteRemove(authUser, publication)}>Downvoted</button>
          :
          <button onClick={() => VotingService.handlePublicationDownvote(authUser, publication)}>Downvote</button>
          }


          { (isRoleUser && (publication.user.username !== authUser.username)) &&
            <Link to={'/reports/new'} state={{user: publication.user, publication: publication, comment: null}}>Report</Link>
          }
          {isRoleAdmin && publication.user.banned && (publication.user.username !== authUser.username) && 
          <button onClick={() =>AdminService.unbanUser(publication.user)}>Unban</button>}
          {isRoleAdmin && !publication.user.banned && (publication.user.username !== authUser.username) &&
          <button onClick={() =>AdminService.banUser(publication.user)}>Ban</button>}
        </div>
        {publication.comments.length === 0? "Be first to leave a comment" :
        <div>
          <h3>Comments</h3>
          <ul>
            {publication.comments.map(comment => (
              <li key={comment.id}>
                <Link to={"/users/" + comment.user.username}>{comment.user.username}</Link>
                : {comment.content} Rating: {comment.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}<br />
                { comment.user.username === authUser.username &&
                  <div><Link to={"/comments/" + comment.id + "/edit"}>Edit</Link><br /></div>
                }
                { comment.votes.map(vote => vote.user.username).includes(authUser.username) &&
                  comment.votes.find(vote => vote.user.username === authUser.username).dynamic === 1
                ?
                <button onClick={() => VotingService.handleCommentUpvoteRemove(authUser, comment)}>Upvoted</button>
                :  
                <button onClick={() => VotingService.handleCommentUpvote(authUser, comment)}>Upvote</button>
                }
                { comment.votes.map(vote => vote.user.username).includes(authUser.username) &&
                  comment.votes.find(vote => vote.user.username === authUser.username).dynamic === -1
                ?
                <button onClick={() => VotingService.handleCommentDownvoteRemove(authUser, comment)}>Downvoted</button>
                :
                <button onClick={() => VotingService.handleCommentDownvote(authUser, comment)}>Downvote</button>
                }
                { (comment.user.username === authUser.username || isRoleAdmin) &&
                  <button onClick={() => handleDelete(comment.id)}>Delete</button>
                }
                { (isRoleUser && (comment.user.username !== authUser.username)) &&
                  <Link to={'/reports/new'} state={{user: comment.user, publication: null, comment: comment}}>Report</Link>
                }
                  {isRoleAdmin && comment.user.banned &&
                  <button onClick={() =>AdminService.unbanUser(comment.user)}>Unban</button>}
                  {isRoleAdmin && !comment.user.banned &&
                  <button onClick={() =>AdminService.banUser(comment.user)}>Ban</button>}
              </li>
            ))}
          </ul>
        </div>}
        <CommentCreate publication={publication} />
      </div>
    );
}};

export default PublicationDetails;