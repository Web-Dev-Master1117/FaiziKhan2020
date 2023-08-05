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
  const [emailData, setEmailData] = useState([]);
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
          `https://netglow-be-c3c31450198f.herokuapp.com/api/gmail/getAllCategories`
          // `http://localhost:4000/api/gmail/getAllCategories`
        );
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);
  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await Axios.get(
          `https://netglow-be-c3c31450198f.herokuapp.com/api/gmail/getAllEmails`
        );
        setEmailData(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);
  console.log(emailData);

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
      {/* <Container> */} <h3>The categories Emails from Netglow</h3>
      {/* </Container> */}
      {loading ? (
        <div
          style={{
            marginTop: "10rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ClipLoader
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {data
            .filter(
              (item) =>
                emailData.filter(
                  (filter) =>
                    filter.categoryId === item.id &&
                    filter.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                ).length > 0
            )
            .map((item, index) => (
              <Grid md={12} sm={12} key={index}>
                <Typography
                  variant="h3"
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginTop: "12px",
                    marginBottom: "10px",
                  }}
                >
                  {item.categoryName}
                </Typography>
                <Card
                  sx={{
                    width: "100%",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      margin: "auto",
                      overflowX: "scroll",
                      flexDirection: "row",
                      height: "50%",
                    }}
                  >
                    {emailData
                      .filter(
                        (filter) =>
                          filter.categoryId === item.id &&
                          filter.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((filteredItem, filteredIndex) => (
                        // <Grid
                        //   columnGap={4}
                        //   key={filteredIndex}
                        //   sm={6}
                        //   lg={4}
                        //   md={6}
                        // >
                        <Box style={{ height: "", textAlign: "center" }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            href={{
                              pathname: "/pages/hello",
                              query: { itemId: filteredItem.id },
                            }}
                          >
                            <Card
                              sx={{
                                width: "300px",
                                height: "90%",
                                paddingLeft: "11px",
                                paddingRight: "11px",
                                marginBottom: "20px",
                                marginTop: "17px",
                                marginLeft: "1rem",
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
                                  variant="p"
                                  style={{
                                    fontSize: "10px",
                                    marginTop: "12px",
                                  }}
                                >
                                  {filteredItem.time}
                                </Typography>
                                <Typography
                                  variant="p"
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "center",
                                    marginTop: "12px",
                                    color: "gray",
                                  }}
                                >
                                  {filteredItem.senderName}
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
                                  {filteredItem.title}
                                </Typography>
                              </div>
                              {/* <CardContent> */}
                              <Image
                                style={{
                                  width: "250px",
                                  height: "330px",
                                  objectFit: "cover",
                                }}
                                src={filteredItem.image}
                                width={380}
                                height={380}
                                alt="Picture of the author"
                              />
                              {/* </CardContent> */}
                            </Card>
                          </Link>
                        </Box>
                        // </Grid>
                      ))}
                  </div>
                </Card>
              </Grid>
            ))}
        </>
      )}
    </>
  );
}
