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

import Pic4 from "../app/fullemail.png";
import Link from "next/link";

import Modal from "@mui/material/Modal";

import Image from "next/image";

const HtmlToReact = require("html-to-react").Parser;

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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
        );
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBags();
  }, []);

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
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
      <Card style={{ boxShadow: "none", maxWidth: "100%" }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "7rem",
          }}
        >
          {/* <div>{htmlToReactParser.parse(data[1].content)}</div> */}
          <Grid maxWidth="lg" container spacing={2}>
            {/* {data.map((item, index) => {
              return ( */}
            {data.map((item, index) => {
              return (
                <Grid item md={4}>
                  <Card
                    sx={{
                      Width: "800px",
                      height: "30rem",
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/pages/hello",
                        query: { itemId: item.id },
                      }}
                    >
                      <CardContent>
                        <Image
                          src={item.image}
                          width={380}
                          height={450}
                          alt="Picture of the author"
                        />
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              );
            })}

            {/* );
            })} */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
