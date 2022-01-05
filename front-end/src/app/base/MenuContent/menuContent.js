import React, { useState, useEffect, useContext } from 'react'
import { useIntl } from 'react-intl';
import { SocketContext } from '../../context/socket';
import { useSelector } from "react-redux";
import './menuContent.scss'
import MenuNavigation from './menuNavigation/menuNavigation';
import GridFood from './gridFood/gridFood';
import ModalSharing from '../Modal/ModalSharing/modalSharing';
import ModalCartShare from '../Modal/ModalCartShare/modalCartShare';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch } from 'react-redux';
import { updateRoomId, updateTotalPrice } from '../../../store/appReducer';
import { checkShareCart, createShare, getCartByUserId, removeShareCart } from '../../core/apis/cart';
import { todoProduct } from '../../../store/cartReducer'
import { useHistory } from 'react-router-dom'

function MenuContent(props) {
    const dispatch =  useDispatch();
    const history = useHistory();

    const roomId = useSelector(state => state.app.roomId)
    const user = useSelector((state) => state.user.user);

    const [ isActive, setIsActive ] = useState(false)
    const [ isSharing, setIsSharing ] = useState(false)
    const [ isCartShare, setIsCartShare ] = useState(false)

    const { match } = props

    useEffect(() => {
        (async () => {
            const shareCode = new URLSearchParams(new URL(window.location.href).search).get('t')

            if (shareCode && !user) {
                window.location.href = `/login?t=${shareCode}`
                return;
            }

            if (!shareCode && !!user) {
                const res = await checkShareCart();

                if (!!res.data?.cart) {
                    setIsCartShare(true)
                }
            }
        })()
    }, [])

    const toggle = async () => {
        const roomUniqueId = Math.random().toString() + new Date().getTime().toString();
        const roomData = {
            roomId: roomUniqueId,
            ownerId: user.id
        }
        const newRoomId = btoa(JSON.stringify(roomData));

        const res = await createShare({roomId: newRoomId});
        const cartData = res.data?.cart;

        const cartShare = await getCartByUserId({id: user.id, isPrimary: false})
        dispatch(todoProduct({
            cart: {...cartShare?.data?.cart?.data},
            type: 'FETCH_CART'
        }))
        dispatch(updateTotalPrice(cartShare?.data?.cart?.data?.totalPrice));
        dispatch(updateRoomId(cartData?.roomId))

        setTimeout( () => {
            setIsSharing(true)
        },3000)

        history.push({
            pathname: '/categories',
            search: `?t=${cartData?.roomId}`
        })
    }

    const sayNo = async () => {
        const res = await removeShareCart();
        dispatch(updateRoomId(null))
        setIsCartShare(false)
    }

    const sayYes = async () => {
        const res = await checkShareCart();

        const cartShare = await getCartByUserId({id: user.id, isPrimary: false})
        dispatch(todoProduct({
            cart: {...cartShare?.data?.cart?.data},
            type: 'FETCH_CART'
        }))
        dispatch(updateTotalPrice(cartShare?.data?.cart?.data?.totalPrice));
        dispatch(updateRoomId(res.data.cart.roomId)) 

        history.push({
            pathname: '/categories',
            search: `?t=${res.data.cart.roomId}`
        })

        setIsCartShare(false)
    }

    const closeModal = () => {
        setIsSharing(false)
    }

    const getShareLink = (code) => {
        return `http://localhost:3000/categories?t=${code}`
    }

    return (
        <div className="page-content">
            <div className="container">
                <div className="invite">
                    <div className="invite-box" onClick={toggle}>
                        <i className="ti ti-shopping-cart"></i>
                        <div>Invite</div>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-3">
                        {/* <!-- Menu Navigation --> */}
                        <MenuNavigation match={match}/>
                    </div>
                    <div className="col-md-9">
                        <LoadingOverlay
                            active={isActive}
                            spinner
                            text='Loading product...'
                            >
                        </LoadingOverlay>
                        <GridFood match={match} setIsActive={setIsActive}/>
                    </div>
                </div>
            </div>

            <ModalSharing isShow={isSharing} closeModal={closeModal} code={getShareLink(roomId)} />
            <ModalCartShare isShow={isCartShare} sayNo={sayNo} sayYes={sayYes}/>
        </div>
    );
}

export default MenuContent;
