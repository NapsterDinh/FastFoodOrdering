import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";

import './searchBranch.scss'

function SearchBranch()
{
    const { formatMessage } = useIntl();
    // Retrieve data from redux store
    //const togglePanelCart = useSelector((state) => state.value);
    // const ref1 = useRef(null)
    // const ref2 = useRef(null)
    const ref3 = useRef(null)

    // const [ isChooseFirst, setIsChooseFirst ] = useState(true)

    // const onClickChoose = () => setIsChooseFirst(!isChooseFirst)
    
    let placeholder = 'Nhap dia chi cua ban'

    // useEffect(() => { 
    //     if (isChooseFirst)
    //     {
    //         ref1.current.className = "active"
    //         ref2.current.className = ""
    //         ref3.current.placeholder = 'Nhap dia chi cua ban'
    //     }
    //     else
    //     {
    //         ref1.current.className = ""
    //         ref2.current.className = "active"
    //         ref3.current.placeholder = 'Nhap cua hang'
    //     }
    // }, [isChooseFirst])

    return (
        <div className="search-container">
            {/* <div className="switch">
                <span ref={ref1} onClick={onClickChoose}>
                    Dat giao hang
                </span>
                <span ref={ref2} onClick={onClickChoose}>
                    Dat lay hang
                </span>
            </div> */}
            <div className="input-search-container">
                <input ref={ref3} type="text"></input>
            </div>
        </div>
    )
}

export default SearchBranch