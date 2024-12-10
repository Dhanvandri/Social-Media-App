import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await axios.get(`/api/users/${id}`);
            setProfile(data);
        };

        fetchProfile();
    }, [id]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {profile ? (
                <>
                    <h2>{profile.username}</h2>
                    <p>Email: {profile.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
