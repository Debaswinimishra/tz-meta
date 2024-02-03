import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { send_media_message_thunk } from "../messaging-thunk";
import { toast } from "react-toastify";
const MediaMessage = () => {
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");

  const [mobileNumberError, setMobileNumberError] = useState("");
  const [mediaTypeError, setMediaTypeError] = useState("");
  const [mediaUrlError, setMediaUrlError] = useState("");

  const loading = useSelector((state) => state.messagingslice.loading);

  const mediatype_radio_on_change = (e) => {
    setMediaType(e.target.value);
    setMediaTypeError(""); // Reset error when the user makes a selection
  };

  const send_button_on_click = () => {
    if (!mobileNumber.trim()) {
      setMobileNumberError("Mobile Number is required.");
      return;
    }
    if (!mediaType.trim()) {
      setMediaTypeError("Media Type is required.");
      return;
    }
    if (!mediaUrl.trim()) {
      setMediaUrlError("Media URL is required.");
      return;
    }

    const body = {
      mobile_number: mobileNumber,
      media_type: mediaType,
      media_url: mediaUrl,
    };

    dispatch(send_media_message_thunk(body))
      .then((response) => {
        setMobileNumber("");
        setMediaType("");
        setMediaUrl("");
        setMobileNumberError("");
        setMediaTypeError("");
        setMediaUrlError("");
        toast.success("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        toast.error("Error sending message. Please try again.");
      })
      .finally(() => {
        // Set loading state to false regardless of success or failure
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  const reset_button_on_click = () => {
    setMobileNumber("");
    setMediaType("");
    setMediaUrl("");
    setMobileNumberError("");
    setMediaTypeError("");
    setMediaUrlError("");
  };

  return (
    <FormControl style={{ width: "40%" }}>
      <TextField
        label="Mobile Number"
        fullWidth
        margin="normal"
        value={mobileNumber}
        onChange={(e) => {
          const inputValue = e.target.value;
          const numericValue = inputValue.replace(/[^0-9]/g, "");
          if (numericValue.length <= 10) {
            setMobileNumber(numericValue);
            setMobileNumberError(""); // Reset error when the user starts typing
          } else {
            console.log("");
          }
        }}
        size="small"
        error={Boolean(mobileNumberError)}
        helperText={mobileNumberError}
      />
      <FormLabel component="legend" style={{ marginTop: "8px" }}>
        Media Type
      </FormLabel>
      <RadioGroup
        row
        aria-label="media-type"
        name="media-type"
        value={mediaType}
        onChange={mediatype_radio_on_change}
      >
        <FormControlLabel value="image" control={<Radio />} label="Image" />
        <FormControlLabel value="video" control={<Radio />} label="Video" />
        <FormControlLabel value="audio" control={<Radio />} label="Audio" />
      </RadioGroup>
      <TextField
        label="Media URL"
        fullWidth
        margin="normal"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        size="small"
        error={Boolean(mediaUrlError)}
        helperText={mediaUrlError}
      />
      <p className="media-types-info">
        Tested media types are: image: jpeg, jpg | video: mp4 | audio: mp3
      </p>
      <div
        style={{
          display: "flex",
          width: "300px", // Set the desired width
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          // Display loader while loading is true
          <Button variant="contained" disabled style={{ marginLeft: "100px" }}>
            Loading...
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ marginLeft: "140px" }}
            onClick={send_button_on_click}
            disabled={!mobileNumber || !mediaType || !mediaUrl}
          >
            Send
          </Button>
        )}
        <Button variant="contained" onClick={reset_button_on_click}>
          Reset
        </Button>
      </div>
    </FormControl>
  );
};

export default MediaMessage;
