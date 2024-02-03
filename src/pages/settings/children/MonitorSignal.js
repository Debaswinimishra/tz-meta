import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { monitor_signal_strength_thunk } from "../settings-thunk";

const MonitorSignal = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.settingsslice.loading);
  const mtr_sgl_data = useSelector((state) => state.settingsslice.mtr_sgl_data);

  const monitor_signal = async () => {
    await dispatch(monitor_signal_strength_thunk());
  }
  return (
    <>
      <div>
        <a href="https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals" target="_blank" rel="noreferrer">
          Monitor the quality signals
        </a>
        (via WhatsApp Business Management API and WhatsApp Manager UI) to assess how your messages are being received by users and act on relevant updates as quickly as possible.
        <br />
        <br />
        What to watch for: Any quality ratings different than High. They indicate negative feedback from users and may impact the phone number reach.
        <a href="https://developers.facebook.com/micro_site/url/?click_from_context_menu=true&country=IN&destination=https%3A%2F%2Fwww.facebook.com%2Fbusiness%2Fhelp%2F896873687365001&event_type=click&last_nav_impression_id=2ANJR2bKK6vfbTX29&max_percent_page_viewed=36&max_viewport_height_px=564&max_viewport_width_px=1272&orig_http_referrer=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fwhatsapp%2Fguides%2Fhow-to-monitor-quality-signals&orig_request_uri=https%3A%2F%2Fdevelopers.facebook.com%2Fajax%2Fdocs%2Fnav%2F%3Fpath1%3Dwhatsapp%26path2%3Dguides%26path3%3Dhow-to-monitor-quality-signals&region=apac&scrolled=true&session_id=1C9bLvEgBYIyiUo3M&site=developers" target="_blank" rel="noreferrer">
          Phone Number Quality docs
        </a>
        .
        <br />
        <br />
        <Button type="primary" onClick={monitor_signal}>
          Monitor Quality Signals
        </Button>
        <div>
          {loading && <div>Analysing ...</div>}
          {!loading && (
            <div>
              {mtr_sgl_data.length > 0 ? (
                <div>
                  <div>{mtr_sgl_data[0].verified_name}</div>
                  <div>{mtr_sgl_data[0].code_verification_status}</div>
                  <div>{mtr_sgl_data[0].display_phone_number}</div>
                  <div>{mtr_sgl_data[0].quality_rating}</div>
                  <div>{mtr_sgl_data[0].platform_type}</div>
                  <div>{mtr_sgl_data[0].throughput.level}</div>
                  <div>{mtr_sgl_data[0].id}</div>
                </div>
              ) : (
                <div>No data found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MonitorSignal;
