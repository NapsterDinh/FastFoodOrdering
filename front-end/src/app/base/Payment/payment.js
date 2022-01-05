import React, { useEffect } from "react";
import { useParams } from "react-router";
import { removeShareCart } from "../../core/apis/cart";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomId } from "../../../store/appReducer";

const Payment = () => {
  let { id, isPaid } = useParams()
  const dispatch =  useDispatch();

  useEffect(() => {
    (async () => {
      if(isPaid) {
        await removeShareCart();
        dispatch(updateRoomId(null))

        setTimeout(() => {
          window.close()
          window.opener.location.href = '/user/purchase/online'
        }, 2000)
      }
    })()
  })

  return(
    <>
    </>
  )
}

export default Payment