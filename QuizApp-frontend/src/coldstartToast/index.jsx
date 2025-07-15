import { useEffect } from "react";
import { toast } from "react-toastify";
import './ColdStartToast.css';

const ColdStartToast = () => {
  useEffect(() => {
    const toastId = "coldStart";

    toast.info(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="loader" style={{ marginRight: '10px' }}></span>
        Waking up backend... (Render free tier)
      </div>,
      {
        toastId,
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastClassName: "cold-toast",
      }
    );

    fetch(`${import.meta.env.VITE_API_URL}/keep-alive`)
      .then(() => toast.dismiss(toastId))
      .catch(() => {
        toast.update(toastId, {
          render: "Backend took too long. Please refresh.",
          type: "error",
          autoClose: 5000,
        });
      });
  }, []);

  return null;
};

export default ColdStartToast;
