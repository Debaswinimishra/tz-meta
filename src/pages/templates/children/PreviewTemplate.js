import React from "react";

import image_icon from "../../../assets/images/image-icon.png";
import video_icon from "../../../assets/images/video-icon.png";
import audio_icon from "../../../assets/images/audio-icon.png";

const PreviewTemplate = ({ template }) => {
  const template_name = template ? template.name : "";
  const template_language = template ? template.language : "";
  const template_status = template ? template.status : "";
  const template_category = template ? template.category : "";
  const template_components = template ? template.components : [];
  const template_header_obj = template_components.find((item) => item.type === "HEADER");
  const template_body_obj = template_components.find((item) => item.type === "BODY");
  const template_footer_obj = template_components.find((item) => item.type === "FOOTER");
  const template_buttons_obj = template_components.find((item) => item.type === "BUTTONS");

  return (
    <>
      <div style={{ width: "60%", border: "1px solid gray" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", fontWeight: "bold" }}>
          <div>
            <div>Name: {template_name}</div>
            <div>Language: {template_language}</div>
          </div>
          <div>
            <div>Category: {template_category}</div>
            <div>Status: {template_status}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "darkslategrey" }}>
          <div style={{ width: "200px", backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
            <div>
              {template_header_obj && (
                <div style={{ backgroundColor: "sandybrown", textAlign: "center" }}>
                  {template_header_obj.format === "IMAGE" && (
                    <div>
                      <img src={image_icon} alt="Image" width={100} />
                    </div>
                  )}
                  {template_header_obj.format === "VIDEO" && (
                    <div>
                      <img src={video_icon} alt="Video" width={100} />
                    </div>
                  )}
                  {template_header_obj.format === "AUDIO" && (
                    <div>
                      <img src={audio_icon} alt="Audio" width={100} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>{template_body_obj && <div style={{ fontSize: "13px", padding: "10px 0" }}>{template_body_obj.text}</div>}</div>
            <div>{template_footer_obj && <div style={{ color: "gray", fontSize: "11px", padding: "10px 0 0 0" }}>{template_footer_obj.text}</div>}</div>
            <div>{template_buttons_obj && <div style={{ backgroundColor: "darkseagreen", padding:"10px", textAlign:"center", borderRadius:"10px" }}>{template_buttons_obj.type}</div>}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewTemplate;
