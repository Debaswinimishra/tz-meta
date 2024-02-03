import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { send_text_message_thunk } from "../messaging-thunk";
import { toast } from "react-toastify";

const TextMessage = () => {
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const [mobileNumberError, setMobileNumberError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [previewUrlError, setPreviewUrlError] = useState("");

  const loading = useSelector((state) => state.messagingslice.loading);

  const previewurl_checkbox_on_change = (event) => {
    setPreviewUrl("");
    setPreview(event.target.checked);
  };

  const send_button_on_click = () => {
    if (!mobileNumber.trim()) {
      setMobileNumberError("Mobile Number is required.");
      return;
    }
    if (!message.trim()) {
      setMessageError("Message is required.");
      return;
    }
    if (preview && !previewUrl.trim()) {
      setPreviewUrlError("Preview URL is required.");
      return;
    }

    const body = {
      mobile_number: mobileNumber,
      message: message,
      preview: preview,
      preview_url: previewUrl,
    };

    dispatch(send_text_message_thunk(body))
      .then(() => {
        setMobileNumber("");
        setMessage("");
        setPreview(false);
        setPreviewUrl("");
        setMobileNumberError("");
        setMessageError("");
        setPreviewUrlError("");
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
    setMessage("");
    setPreview(false);
    setPreviewUrl("");
    setMobileNumberError("");
    setMessageError("");
    setPreviewUrlError("");
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

      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Message"
        minRows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <FormControlLabel
        label="Preview URL"
        control={
          <Checkbox
            onChange={previewurl_checkbox_on_change}
            checked={preview}
          />
        }
      />
      {preview && (
        <TextField
          label="Preview URL"
          fullWidth
          margin="normal"
          size="small"
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
        />
      )}
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
          <>
            {preview === true ? (
              <Button
                variant="contained"
                onClick={send_button_on_click}
                style={{ marginLeft: "140px" }}
                disabled={!mobileNumber || !message || !previewUrl}
              >
                Send
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={send_button_on_click}
                style={{ marginLeft: "140px" }}
                disabled={!mobileNumber || !message}
              >
                Send
              </Button>
            )}
          </>
        )}

        <Button variant="contained" onClick={reset_button_on_click}>
          Reset
        </Button>
      </div>
    </FormControl>
  );
};

export default TextMessage;
