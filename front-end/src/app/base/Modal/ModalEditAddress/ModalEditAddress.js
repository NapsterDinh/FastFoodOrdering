import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useIntl } from 'react-intl';
import { Modal, Row, Col, Form, FloatingLabel } from 'react-bootstrap'
import query from '../../../../utilities/Data/query'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet'
import icon from '../../../base/Img/icon/marker-icon.png'
import iconShadow from '../../../base/Img/icon/marker-shadow.png'
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from "react-redux";
import { createNewAddressAPI, updateAdressAPI, getLatLongByAddress } from '../../../core/apis/user'

import './ModalEditAddress.scss'
import Button from '@restart/ui/esm/Button';

var myIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    shadowUrl: iconShadow,
    shadowSize: [41, 41],
});

function LocationMarker({userDetail, chooseItem, setUserDetail}) {
    const [position, setPosition] = useState(chooseItem === '' ? { lat: 10.8493, lng: 106.7720 } : { lat: userDetail.latitude, lng: userDetail.longitude })
    const [draggable, setDraggable] = useState(false)
    useEffect(() => {
        
        if(userDetail.latitude !== -1)
        {
            setPosition(
                { lat: userDetail.latitude, lng: userDetail.longitude }
            )
        }
        
    }, [userDetail.longitude])

    useEffect(() => {
        setUserDetail({
            ...userDetail,
            latitude: position.lat,
            longitude: position.lng
        })
    }, [position])

    const markerRef = useRef(null)

    const map = useMapEvents({
        click() {
            map.locate()
          },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
            setPosition(marker.getLatLng())
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            icon={myIcon}
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                {draggable
                    ? 'Marker is draggable'
                    : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
  }

 
function ModalEditAddress(props) {
    
    const { show, setShow, chooseItem, setAddressList } = props
    const user = useSelector(state => state.user.user)
    const [ cityList, setCityList ] = useState([])
    const [ provinceList, setProvinceList ] = useState([])
    const [ townList, setTownList ] = useState([])
    const [ isHandling, setIsHandling ] = useState(false)
    const [map, setMap] = useState(null)
    const [ userDetail, setUserDetail ] = useState(chooseItem === '' ? {
        city: '',
        fullAddress: '',
        isDefault: false,
        latitude: -1,
        longitude: -1,
        name: '',
        phone: '',
        province: '',
        street: '',
        town: '',
        type: '',
        userId: user._id,
    } : chooseItem)

    useEffect(() => {
        setCityList(query.getAllCity())
    }, [])

    useEffect(() => {
        console.log(userDetail)
        if(userDetail.name === '')
        {
             setIsHandling(true)
            return
        }
        else    
        if(userDetail.phone === '')
        {
            setIsHandling(true)
            return
        }
        else if(userDetail.street === '')
        {
            setIsHandling(true)
            return
        }
        else if(userDetail.city === '' || userDetail.province === '' || userDetail.town === '')
        {
            setIsHandling(true)
            return
        }
        setIsHandling(false)
    }, [userDetail])

    useEffect(() => {
        if(userDetail.city !== '')
        {
            console.log(query.getAllProvinceByCity(userDetail.city))
            setProvinceList(query.getAllProvinceByCity(userDetail.city))
        }
    }, [userDetail.city])

    useEffect(() => {
        if(userDetail.province !== '')
        {
            setTownList(query.getAllTownByProvince(query.getAllProvinceByCity(userDetail.city), userDetail.province))
        }
    }, [userDetail.province])

    useEffect( () => {
        setUserDetail({
            ...userDetail,
            fullAddress: userDetail.street
            + (townList[userDetail.town]?.name !== undefined ? " " +townList[userDetail.town]?.name :'')
            + (provinceList[userDetail.province]?.name !== undefined ? " " +provinceList[userDetail.province]?.name : '')
            + (cityList[userDetail.city]?.name !== undefined ? " " +cityList[userDetail.city]?.name : '')
        })
    }, [userDetail.city, userDetail.province, userDetail.town, userDetail.street])

    useEffect(async() => {
        // if(userDetail.city !== '' && userDetail.province !== '' && userDetail.town && userDetail.street !== '')
        // {
        //     await testAPI() 
        // }
    }, [userDetail.fullAddress])

    useEffect(() => {
        if(userDetail.latitude !== -1 && userDetail.longitude !== -1 && map !== null)
        {
            map.flyTo(L.latLng(userDetail.latitude, userDetail.longitude), map.getZoom())
        }
    }, [userDetail.longitude])

    const testAPI = async () => {
        try {
            const res = await getLatLongByAddress(userDetail.fullAddress)
            if(res)
            {
                setUserDetail({
                    ...userDetail,
                    latitude: res.data.features[0].center[1],
                    longitude: res.data.features[0].center[0],
                })
            }
        } catch (error) {
            
        }
    }

    const addNewAddress  = async () => 
    {
        setIsHandling(true)
        try {
            const res = await createNewAddressAPI(userDetail)
            setIsHandling(false)
            if(res && res.data.result)
            {
                setAddressList(res.data.data)
                setShow(false)
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const editAddress = async () => {
        setIsHandling(true)
        try {
            const res = await updateAdressAPI(userDetail)
            setIsHandling(false)
            if(res && res.data.result)
            {
                setAddressList(res.data.data)
                setShow(false)
            }
            else
            {
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const displayMap = useMemo(() => (
        <div id="map">
            <MapContainer
                center={chooseItem === '' ? { lat: 10.8493, lng: 106.7720 } : { lat: userDetail.latitude, lng: userDetail.longitude }}
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
                <div className='leaflet-top leaflet-right'>
                    <div className="leaflet-control leaflet-bar current-location ">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                </div>
                <LocationMarker userDetail={userDetail} chooseItem={chooseItem} setUserDetail={setUserDetail}/>
            </MapContainer>
        </div>
    ), [ userDetail.longitude])

    return (
        <Modal
            show={show}
            size="md"
            backdrop="static"
            keyboard={false}
            onHide={() => setShow(false)}
            id = "modal-edit-address"
            >
            <Modal.Header>
                <Modal.Title>{chooseItem !== '' ? 'Chỉnh sửa địa chỉ' : 'Tạo mới địa chỉ'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <div>
                                <FloatingLabel 
                                onBlur={(e) => setUserDetail({
                                    ...userDetail,
                                    name: e.target.value.trim()
                                })}
                                controlId="floatingname" label="Họ và tên">
                                    <Form.Control 
                                    defaultValue={userDetail.name !== '' ? userDetail.name : ''}
                                    type="text" placeholder="Họ và tên" 
                                    />
                                </FloatingLabel>
                            </div>
                            
                        </Col>
                        <Col sm={6}>
                            <div>
                                <FloatingLabel 
                                onBlur={(e) => setUserDetail({
                                    ...userDetail,
                                    phone: e.target.value.trim()
                                })}
                                controlId="floatingphone" label="Số điện thoại">
                                    <Form.Control 
                                    defaultValue={userDetail.phone !== '' ? userDetail.phone : ''}
                                    type="text" placeholder="Số điện thoại" />
                                </FloatingLabel>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <Form.Select className="form-control"
                        aria-label="Default select example"
                        value={userDetail.city !== '' ? userDetail.city : -1}
                        onChange={(e) => {
                            setUserDetail({
                                ...userDetail,
                                city: e.target.value,
                                province: '',
                                town: ''
                            })
                        }}
                        >
                            <option value="-1">Chọn tỉnh/ thành phố</option>
                            {
                                cityList?.map((item, index) => (
                                    <option key={"city"+index} value={index}>{item.name}</option>
                                ))
                            }
                        </Form.Select>
                    </div>
                    
                    <Form.Select
                    value={userDetail.province !== '' ? userDetail.province : -1}
                    onChange={(e) => {
                        setUserDetail({
                            ...userDetail,
                            province: e.target.value,
                            town: ''
                        })
                    }}
                    className="form-control" aria-label="Default select example">
                        <option value={-1}>Chọn quận huyện</option>
                        {
                            provinceList?.map((item, index)=> (
                                <option key={"province"+index} value={index}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                    <Form.Select
                    value={userDetail.town !== '' ? userDetail.town : -1}
                    onChange={(e) => {
                        setUserDetail({
                            ...userDetail,
                            town: e.target.value
                        })
                    }}
                    className="form-control" aria-label="Default select example">
                        <option value={-1}>Chọn xã/ thị trấn</option>
                        {
                            townList?.map((item, index) => (
                                <option key={"town"+index} value={index}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                    <Row className="detail-address">
                        <div >
                            <FloatingLabel 
                            controlId="floatingphone" label="Địa chỉ cụ thể"
                            >
                                <Form.Control 
                                onBlur={(e) => setUserDetail({
                                    ...userDetail,
                                    street: e.target.value.trim()
                                })}
                                defaultValue={userDetail.street !== '' ? userDetail.street : ''}
                                type="text" placeholder="Địa chỉ cụ thể" />
                            </FloatingLabel>
                        </div>
                    </Row>
                    <span>Loại địa chỉ</span>
                    <div key={`inline-radio`} className="mb-3 type-address">
                        <Form.Check
                            inline
                            onChange={(e) => setUserDetail({
                                ...userDetail,
                                type: e.target.checked && 'Home'
                            })}
                            defaultChecked={userDetail.type === 'Home' && true}
                            label="Nhà riêng"
                            name="group1"
                            type='radio'
                            id='home'
                        />
                        <Form.Check
                            inline
                            onChange={(e) => setUserDetail({
                                ...userDetail,
                                type: e.target.checked && 'Office'
                            })}
                            defaultChecked={userDetail.type === 'Office' && true}
                            label="Văn phòng"
                            name="group1"
                            type='radio'
                            id='office'
                        />
                    </div>
                    {
                        displayMap
                    }
                    {/* <div key={`inline-checkbox`} className="mb-3">
                        <Form.Check
                            inline
                            onChange={(e) => setUserDetail({
                                ...userDetail,
                                isDefault: e.target.checked 
                            })}
                            defaultChecked={userDetail.isDefault}
                            label="Đặt làm địa chỉ mặc định"
                            name="group1"
                            type='checkbox'
                            id='isDefault'
                        />
                    </div> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn" onClick={() => setShow(false)}>
                    Trở lại
                </Button>
                <Button 
                disabled={isHandling}
                className="btn save" onClick={() => {
                    chooseItem !== '' ? editAddress() : addNewAddress()
                }}>
                    Hoàn thành
                </Button>
            </Modal.Footer>
        </Modal>   
    );
}

export default ModalEditAddress;
