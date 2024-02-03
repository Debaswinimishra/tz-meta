import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";

// Thunk
import { get_default_template_thunk } from "../../templates/templates-thunk";

const DefaultTemplate = () => {
    const navigate= useNavigate()
  const dispatch = useDispatch();

  // Page load
  useEffect(() => {
    get_default_template();
  }, []);

  const loading = useSelector((state) => state.templatesslice.loading);
  const default_template_data = useSelector((state) => state.templatesslice.default_template_data);

  const get_default_template = async () => {
    await dispatch(get_default_template_thunk());
  };

  return (
    <>
      <div>
        The default template you have choosen is: <br />
      </div>
      <div style={{ padding: "10px", margin: "10px", fontSize: "20px", border: "1px solid #b1adad", backgroundColor: "#e8f5e7" }}>{default_template_data.length > 0 ? default_template_data[0].name : ""}</div>
      {/* <Button onClick={()=>{navigate("/templates/list-all-templates");}}>Change</Button> */}
      <div>
        To change the default template go to Templates -- from left menu select List Templates -- click on settings icon of the template you want to set default -- click on Set as default button <br />
      </div>
    </>
  );
};

export default DefaultTemplate;
