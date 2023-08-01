"use client";
import { Container, InputAdornment, TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import Router from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

import Pic4 from "../app/fullemail.png";
import Link from "next/link";

import Modal from "@mui/material/Modal";

import Image from "next/image";

const HtmlToReact = require("html-to-react").Parser;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

import * as React from "react";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const htmlToReactParser = new HtmlToReact();

  console.log(htmlToReactParser);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await Axios.get(
          `https://netglow-be-c3c31450198f.herokuapp.com/api/gmail/getAllEmails`
          // `http://localhost:4000/api/gmail/getAllEmails`
        );
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);

  console.log(data);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  const [legal, setIllegal] = React.useState("");

  return (
    <>
      {" "}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Image
              src={Pic4}
              style={{ width: "100%", height: "100%" }}
              alt="Picture of the author"
            />
          </Box>
        </Modal>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          background: "white",
        }}
      >
        <div>
          <h4>Netglow</h4>
        </div>
        <div>
          <TextField
            style={{ width: "20rem" }}
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <Container>
        {" "}
        <h3>The Latest Emails from Netglow</h3>
      </Container>
      <Card
        style={{
          boxShadow: "none",
          maxWidth: "100%",
          background: "transparent",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <div style={{ marginTop: "10rem" }}>
              <ClipLoader
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <Grid maxWidth="lg" container spacing={2}>
              {/* {data.map((item, index) => {
            return ( */}
              {data
                .filter((item) =>
                  item.senderName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <Grid item md={4} sm={12} spacing={4} key={index}>
                    <Card
                      sx={{
                        Width: "100%",
                        height: "30rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          margin: "auto",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h3"
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            textAlign: "center",
                            marginTop: "12px",
                          }}
                        >
                          {item.senderName}
                        </Typography>
                        <Typography
                          variant="h5"
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            textAlign: "center",
                            marginTop: "12px",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </div>
                      <Link
                        href={{
                          pathname: "/pages/hello",
                          query: { itemId: item.id },
                        }}
                      >
                        <CardContent>
                          {item.image ? (
                            <Image
                              style={{ width: "100%", height: "100%" }}
                              src={item.image}
                              width={380}
                              height={450}
                              alt="Picture of the author"
                            />
                          ) : (
                            <div>
                              {/* Alternative content or a placeholder image */}
                            </div>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                ))}

              {/* );
            })} */}
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
