import axios from 'axios';

class VotingService {

    handlePublicationUpvote = async (user, publication) => {
        if (publication.votes.map(vote => vote.user.username).includes(user.username)) {
            const vote_id = publication.votes.find(vote => vote.user.username === user.username).id
            await axios.put(`http://localhost:8080/api/v1/votes/${vote_id}`, {
            "dynamic": 1
            })
        } else {
            await axios.post(`http://localhost:8080/api/v1/votes/`, {
            "user": user,
            "dynamic": 1,
            "publication": publication
            })
        }
        window.location.reload();
    }

    handlePublicationUpvoteRemove = async (user, publication) => {
        const vote_id = publication.votes.find(vote => vote.user.username === user.username).id
        await axios.delete(`http://localhost:8080/api/v1/votes/${vote_id}`)
        window.location.reload();
    }

    handlePublicationDownvote = async (user, publication) => {
        if (publication.votes.map(vote => vote.user.username).includes(user.username)) {
            const vote_id = publication.votes.find(vote => vote.user.username === user.username).id
            await axios.put(`http://localhost:8080/api/v1/votes/${vote_id}`, {
            "dynamic": -1
            })
        } else {
            await axios.post(`http://localhost:8080/api/v1/votes/`, {
            "user": user,
            "dynamic": -1,
            "publication": publication
            })
        }
        window.location.reload();
    }

    handlePublicationDownvoteRemove = async (user, publication) => {
        const vote_id = publication.votes.find(vote => vote.user.username === user.username).id
        await axios.delete(`http://localhost:8080/api/v1/votes/${vote_id}`)
        window.location.reload();
    }

    handleCommentUpvote = async (user, comment) => {
        if (comment.votes.map(vote => vote.user.username).includes(user.username)) {
            const vote_id = comment.votes.find(vote => vote.user.username === user.username).id
            await axios.put(`http://localhost:8080/api/v1/votes/${vote_id}`, {
            "dynamic": 1
            })
        } else {
            await axios.post(`http://localhost:8080/api/v1/votes/`, {
            "user": user,
            "dynamic": 1,
            "comment": comment
            })
        }
        window.location.reload();
    }

    handleCommentUpvoteRemove = async (user, comment) => {
        const vote_id = comment.votes.find(vote => vote.user.username === user.username).id
        await axios.delete(`http://localhost:8080/api/v1/votes/${vote_id}`)
        window.location.reload();
    }

    handleCommentDownvote = async (user, comment) => {
        if (comment.votes.map(vote => vote.user.username).includes(user.username)) {
            const vote_id = comment.votes.find(vote => vote.user.username === user.username).id
            await axios.put(`http://localhost:8080/api/v1/votes/${vote_id}`, {
            "dynamic": -1
            })
        } else {
            await axios.post(`http://localhost:8080/api/v1/votes/`, {
            "user": user,
            "dynamic": -1,
            "comment": comment
            })
        }
        window.location.reload();
    }

    handleCommentDownvoteRemove = async (user, comment) => {
        const vote_id = comment.votes.find(vote => vote.user.username === user.username).id
        await axios.delete(`http://localhost:8080/api/v1/votes/${vote_id}`)
        window.location.reload();
    }
}

export default new VotingService()