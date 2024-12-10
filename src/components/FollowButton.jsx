import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ userId, isFollowing }) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = async () => {
        try {
            await axios.post(
                `/api/follow/${userId}/follow`,
                {},
                { headers: { Authorization: localStorage.getItem('token') } }
            );
            setFollowing(true);
        } catch (error) {
            console.error('Error following user', error.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axios.post(
                `/api/follow/${userId}/unfollow`,
                {},
                { headers: { Authorization: localStorage.getItem('token') } }
            );
            setFollowing(false);
        } catch (error) {
            console.error('Error unfollowing user', error.message);
        }
    };

    return (
        <button
            onClick={following ? handleUnfollow : handleFollow}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: following ? '#fff' : '#007bff',
                backgroundColor: following ? '#dc3545' : '#f8f9fa',
                border: `2px solid ${following ? '#dc3545' : '#007bff'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
        >
            {following ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;
