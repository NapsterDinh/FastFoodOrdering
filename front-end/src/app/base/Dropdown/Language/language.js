import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, Image } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import './language.scss'

function LangDropDown() {
    
    const { formatMessage } = useIntl();

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)

    const [ isChooseFirst, setIsChooseFirst ] = useState(true)

    const onClickChoose = () => setIsChooseFirst(!isChooseFirst)
    
    let placeholder = 'Nhap dia chi cua ban'


    return (
        <div className="module left right-container">
            <Dropdown className="change-language">
                <Dropdown.Toggle variant="success" id="drop-down-language">
                    <Image src="/vi_flag.svg.png" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                        <Image  src="/vi_flag.svg.png" />
                        <h6>VIE</h6>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                        <Image src="/usa_flag.svg"  />
                        <h6>EN</h6>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default LangDropDown;
