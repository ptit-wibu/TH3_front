import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import "./styles.css";
import { useParams, Link as RouterLink } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(
          `https://spqdtj-8081.csb.app/api/user/${userId}`
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
        setError("Không tải được thông tin user từ server.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <Paper className="user-detail" sx={{ padding: 2 }}>
        <Typography variant="body1">
          Đang tải thông tin người dùng...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper className="user-detail" sx={{ padding: 2 }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper className="user-detail" sx={{ padding: 2 }}>
        <Typography variant="h6">User not found</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="user-detail" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1">
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Description:</strong> {user.description}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={`/photos/${user._id}`}
      >
        View Photos
      </Button>
    </Paper>
  );
}

export default UserDetail;
