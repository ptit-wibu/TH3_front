import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://rgj8j9-8081.csb.app/api/user/list");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching /api/user/list:", err);
        setError("Không tải được danh sách user từ server.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []); // chỉ chạy 1 lần khi mount

  if (loading) {
    return (
      <div className="user-list-container">
        <Typography variant="body1">Đang tải danh sách user...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>

      <List component="nav">
        {users.map((user, index) => (
          <React.Fragment key={user._id}>
            <ListItem
              button
              component={RouterLink}
              to={`/users/${user._id}`}
              className="user-list-item"
            >
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            {index < users.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
