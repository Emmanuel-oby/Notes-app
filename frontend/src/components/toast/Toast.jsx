import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from '../../redux/features/toast/toastSlice';
import "./toast.scss";

const Toast = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.toast);
  const { color } = useSelector((state) => state.toast);
  const { icon } = useSelector((state) => state.toast);

  useEffect(() => {
    const autodel = setTimeout(() => {
      dispatch(clearMessage())
      console.log("panda");
    }, 5000);
  
    return () => {
      clearTimeout(autodel)
    }
  })
  
  
  const deleteToast = (()=>{
    dispatch(clearMessage())
  })

  return (
    <>
      <div className={`notification-container top-right`}>
        <div
          className="notification top-right"
          style={{ backgroundColor: color }}
        >
          <button onClick={()=>deleteToast()}>X</button>
          <div className="notification-image">
          <Icon icon={icon} className="icon"/>
          </div>
          <div>
            <p className="notification-message">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
