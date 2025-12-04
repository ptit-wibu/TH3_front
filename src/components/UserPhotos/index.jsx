import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import "./styles.css";

import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import ludgate1 from "../../images/ludgate1.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ouster from "../../images/ouster.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";

const imageMap = {
  "kenobi1.jpg": kenobi1,
  "kenobi2.jpg": kenobi2,
  "kenobi3.jpg": kenobi3,
  "kenobi4.jpg": kenobi4,
  "ludgate1.jpg": ludgate1,
  "malcolm1.jpg": malcolm1,
  "malcolm2.jpg": malcolm2,
  "ouster.jpg": ouster,
  "ripley1.jpg": ripley1,
  "ripley2.jpg": ripley2,
  "took1.jpg": took1,
  "took2.jpg": took2,
};

function formatDate(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

function UserPhotos() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [userRes, photosRes] = await Promise.all([
          fetch(`https://rgj8j9-8081.csb.app/api/user/${userId}`),
          fetch(`https://rgj8j9-8081.csb.app/api/photo/photosOfUser/${userId}`),
        ]);

        if (!userRes.ok) {
          throw new Error(`User HTTP ${userRes.status}`);
        }
        if (!photosRes.ok) {
          throw new Error(`Photos HTTP ${photosRes.status}`);
        }

        const userData = await userRes.json();
        const photosData = await photosRes.json();

        setUser(userData);
        setPhotos(Array.isArray(photosData) ? photosData : []);
      } catch (err) {
        console.error("Error fetching user photos:", err);
        setError("Không tải được ảnh hoặc thông tin người dùng từ server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [userId]);

  if (loading) {
    return (
      <Paper className="user-photos" sx={{ padding: 2 }}>
        <Typography variant="body1">
          Đang tải ảnh và thông tin người dùng...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper className="user-photos" sx={{ padding: 2 }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper className="user-photos" sx={{ padding: 2 }}>
        <Typography>User not found</Typography>
      </Paper>
    );
  }

  return (
    <Box className="user-photos">
      <Typography variant="h4" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          User này chưa có ảnh nào.
        </Typography>
      )}

      {photos.map((photo) => (
        <Paper key={photo._id} sx={{ padding: 2, marginBottom: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            {/* Ảnh bên trái */}
            <Box sx={{ flexShrink: 0 }}>
              <img
                src={imageMap[photo.file_name]}
                alt={photo.file_name}
                className="photo-img"
                style={{
                  maxWidth: 300,
                  borderRadius: 6,
                  display: "block",
                }}
              />
              <Typography
                variant="caption"
                display="block"
                align="center"
                sx={{ mt: 1 }}
              >
                Uploaded: {formatDate(photo.date_time)}
              </Typography>
            </Box>

            {/* Comments bên phải */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Comments:
              </Typography>

              {photo.comments?.length ? (
                <List dense>
                  {photo.comments.map((c) => {
                    const hasUser = !!c.user;
                    const initials = hasUser
                      ? c.user.first_name?.[0] || "U"
                      : "?";

                    return (
                      <React.Fragment key={c._id}>
                        <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                          <ListItemAvatar>
                            <Avatar>{initials}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              hasUser ? (
                                <>
                                  <RouterLink
                                    to={`/users/${c.user._id}`}
                                    style={{
                                      textDecoration: "none",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {c.user.first_name} {c.user.last_name}
                                  </RouterLink>{" "}
                                  <Typography
                                    variant="caption"
                                    component="span"
                                    color="textSecondary"
                                  >
                                    ({formatDate(c.date_time)})
                                  </Typography>
                                </>
                              ) : (
                                <Typography
                                  variant="body2"
                                  component="span"
                                  color="textSecondary"
                                >
                                  [Unknown user] ({formatDate(c.date_time)})
                                </Typography>
                              )
                            }
                            secondary={c.comment}
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default UserPhotos;
