import React, { useState, useEffect, useRef, useMemo } from 'react'

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet'
import { Modal, Col, Row, FloatingLabel, Form, NavItem } from 'react-bootstrap'
import icon from '../../../base/Img/icon/marker-icon.png'
import iconShadow from '../../../base/Img/icon/marker-shadow.png'
import 'leaflet/dist/leaflet.css';
import './ModalSelectBranch.scss'

var myIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    shadowUrl: iconShadow,
    shadowSize: [41, 41],
});

function LocationMarker() {
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        click() {
            map.locate()
          },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker 
      icon={myIcon}
      position={position} title="test">
        <Popup>Vị trí của bạn hiện tại</Popup>
      </Marker>
    )
  }

 

const ModalSelectBranch = ({branches, setShowBranch, showBranch, order, setOrder}) => {
    const [map, setMap] = useState(null)
    const [ chooseBranch, setChooseBranch ] = useState(order.branchId === '' ? '' : order.branchId)

    const onClickMarker = (item) => {
        setChooseBranch(item)
        console.log(map)
        map.flyTo(L.latLng(item.latitude, item.longitude), map.getZoom())
    }

    const displayMap = useMemo(() => (
        <div id="map">
            <MapContainer
                center={order.branchId === undefined ? { lat: 10.8493, lng: 106.7720 } : { lat: order.branchId.latitude, lng: order.branchId.longitude }}
                zoom={14}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                tap={true}
                dragging={true}
                whenCreated={setMap}
                >   
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    branches.map(item => {
                        return(
                                <Marker 
                                key={`marker${item._id}`}
                                icon={myIcon}
                                position={{ lat: item.latitude, lng: item.longitude }} title={item.name}>
                                    <Popup>{item.name}</Popup>
                                </Marker>
                        )
                    })
                }
                <div className='leaflet-top leaflet-right'>
                    <div className="leaflet-control leaflet-bar current-location ">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                </div>
                <LocationMarker />
            </MapContainer>
        </div>
    ), [branches])

    return (
        <>
        <Modal
            show={showBranch}
            size="xl"
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            id = "modal-select-branch"
            >
            <div className="modal-header modal-header-lg dark bg-dark">
                <div className="bg-image">
                    <img src="" alt=""></img>
                </div>
                <h3>CHỌN NHÀ HÀNG GẦN BẠN NHẤT</h3>
                <p>Để có được trải nghiệm tốt nhất khi sử dụng dịch vụ, bạn nên chọn chi nhánh gần bạn nhất. Điều đó giúp chúng tôi
                    biết được bạn đang ở đâu và giúp nhân viên của chúng tôi hỗ trợ bạn một cách tốt nhất!
                </p>
            </div>
            <div className="modal-body">
                <Row>
                    <Col md={5}>
                        <div>
                            <h6>*Mẹo: Nhấp đúp chuột vào bản đồ để chuyển đến vị trí hiện tại của bạn</h6>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nhập địa chỉ bạn muốn xem"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="19 Tú Xương Hiệp Phú Quận 9" />
                            </FloatingLabel>
                            <h6>Các chi nhánh cửa hàng của chúng tôi</h6>
                            <ul className="branch-list">
                                {
                                    branches.length !== 0 &&
                                    branches?.map(item => 
                                        (
                                        <li key={item._id}
                                        className={ chooseBranch?._id === item._id ? "branch-item active" : "branch-item"} 
                                        onClick={() => onClickMarker(item)}>
                                            <div className="branch-item-left">
                                                <h5>{item.name}</h5>
                                                <span>{item.rating}</span>
                                                <p>{item.address}</p>
                                            </div>
                                            <div className="branch-item-right">
                                                <img src={item.image}></img>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                    <Col md={7}>
                        {
                            displayMap
                        }
                        <div className="btn-container">
                            <button onClick={async() => {
                                await setOrder({
                                    ...order,
                                    branchId: chooseBranch
                                })
                                setShowBranch(false)
                            }}
                            disabled={chooseBranch !== '' ? false : true}
                            className="btn btn-secondary" data-dismiss="modal"><span>Lưu</span></button>
                        </div>
                    </Col>
               
                </Row>
                
            </div>
        </Modal>   
        </>
    );
}

export default ModalSelectBranch;
